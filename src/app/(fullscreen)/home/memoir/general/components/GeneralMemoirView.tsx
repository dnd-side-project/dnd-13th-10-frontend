'use client';

import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { memoirMutations } from '@/queries/memoirOptions';
import { MemoirsRequest } from '@/types/memoirTypes';
import { MEMOIR_TYPES } from '@/constants/code';
import { PATH } from '@/constants/path';
import { formatDateToYYYYMMDD, formatTime24 } from '@/utils/date';

import InterviewInfo from './InterviewInfo';
import QnA from './QnA';
import InterviewReview from './InterviewReview';
import ReferenceLink from './ReferenceLink';
import { useGeneralMemoirFormStore } from '../store/generalMemoirFormStore';
import { isGeneralMemoirFormValid } from '../utils/generalMemoirValidation';

interface Props {
  mode?: 'create' | 'edit';
  memoirId?: number;
}

export default function GeneralMemoirView({
  mode = 'create',
  memoirId,
}: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const formData = useGeneralMemoirFormStore(state => state.formData);
  const resetForm = useGeneralMemoirFormStore(state => state.resetForm);
  const isSaveButtonEnabled = isGeneralMemoirFormValid(formData);

  const { mutate: createMemoir, isPending: isCreatePending } = useMutation(
    memoirMutations.create(queryClient),
  );
  const { mutate: updateMemoir, isPending: isUpdatePending } = useMutation(
    memoirMutations.update(queryClient),
  );
  const isPending = isCreatePending || isUpdatePending;

  const handleSubmit = (isDraft: boolean) => {
    if (!isDraft && !isSaveButtonEnabled) return;

    const payload: Omit<MemoirsRequest, 'id'> = {
      type: MEMOIR_TYPES.GENERAL,
      ...formData.interviewInfo,
      ...formData.interviewReview,
      interviewDate: formatDateToYYYYMMDD(formData.interviewInfo.interviewDate),
      interviewTime: formatTime24(formData.interviewInfo.interviewTime),
      url: formData.references.url,
      questions: formData.questions.map((q, index) => ({
        questionType: q.questionType,
        title: q.title,
        answer: q.answer,
        order: index + 1,
      })),
      isTmp: isDraft,
    };

    const handleSuccess = (message: string, redirectPath: string) => {
      alert(message);
      resetForm();
      router.push(redirectPath);
    };

    if (mode === 'edit' && memoirId) {
      updateMemoir(
        { ...payload, id: memoirId },
        {
          onSuccess: () => {
            const message = `회고가 성공적으로 ${isDraft ? '임시저장' : '수정'}되었습니다!`;
            const path = isDraft
              ? PATH.MY_PAGE.TEMP_SAVED.path
              : PATH.MEMOIR.DETAIL.path.replace('[id]', String(memoirId));
            handleSuccess(message, path);
          },
          onError: () =>
            alert(`회고 ${isDraft ? '임시저장' : '수정'}에 실패했습니다.`),
        },
      );
    } else {
      createMemoir(payload, {
        onSuccess: response => {
          const newMemoirId = response.data.id;
          if (newMemoirId) {
            const message = `회고가 성공적으로 ${isDraft ? '임시저장' : '저장'}되었습니다!`;
            const path = isDraft
              ? PATH.MY_PAGE.MEMOIRS.path
              : PATH.MEMOIR.DETAIL.path.replace('[id]', String(newMemoirId));
            handleSuccess(message, path);
          } else {
            handleSuccess(
              '회고가 저장되었지만, 홈으로 이동합니다.',
              PATH.HOME.path,
            );
          }
        },
        onError: () =>
          alert(`회고 ${isDraft ? '임시저장' : '저장'}에 실패했습니다.`),
      });
    }
  };

  const handleSave = () => handleSubmit(false);
  const handleSaveDraft = () => handleSubmit(true);

  return (
    <div className="flex h-screen flex-col">
      <Header title={mode === 'edit' ? '일반회고 수정' : '일반회고'} />

      <main className="no-scrollbar flex flex-1 flex-col gap-8 overflow-y-auto px-5 pt-6 pb-6">
        <InterviewInfo />
        <QnA />
        <InterviewReview />
        <ReferenceLink />
      </main>

      <footer className="px-5 pt-4 pb-6">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="small"
            onClick={handleSaveDraft}
            disabled={isPending}
          >
            임시저장
          </Button>
          <Button
            size="large"
            className="flex-1"
            onClick={handleSave}
            disabled={!isSaveButtonEnabled || isPending}
          >
            {isPending ? '저장 중...' : mode === 'edit' ? '수정' : '저장'}
          </Button>
        </div>
      </footer>
    </div>
  );
}
