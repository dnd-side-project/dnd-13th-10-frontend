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

export default function GeneralMemoirView() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const formData = useGeneralMemoirFormStore(state => state.formData);
  const resetForm = useGeneralMemoirFormStore(state => state.resetForm);
  const isSaveButtonEnabled = isGeneralMemoirFormValid(formData);

  const { mutate: createMemoir } = useMutation(
    memoirMutations.create(queryClient),
  );

  const handleSave = () => {
    if (!isSaveButtonEnabled) return;

    const payload: MemoirsRequest = {
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
      isTmp: false,
    };

    createMemoir(payload, {
      onSuccess: response => {
        const newMemoirId = response.data;
        if (newMemoirId) {
          alert('회고가 성공적으로 저장되었습니다!');
          resetForm();
          const detailPath = PATH.MEMOIR.DETAIL.path.replace(
            '[id]',
            String(newMemoirId),
          );
          router.push(detailPath);
        } else {
          alert('회고가 저장되었지만, 홈으로 이동합니다.');
          router.push(PATH.HOME.path);
        }
      },
      onError: () => {
        alert('회고 저장에 실패했습니다. 다시 시도해주세요.');
      },
    });
  };

  return (
    <div className="flex h-screen flex-col">
      <Header title="일반회고" />

      <main className="no-scrollbar flex flex-1 flex-col gap-8 overflow-y-auto px-5 pt-6 pb-6">
        <InterviewInfo />
        <QnA />
        <InterviewReview />
        <ReferenceLink />
      </main>

      <footer className="px-5 pt-4 pb-6">
        <div className="flex gap-2">
          <Button variant="outline" size="small">
            임시저장
          </Button>
          <Button
            size="large"
            className="flex-1"
            onClick={handleSave}
            disabled={!isSaveButtonEnabled}
          >
            저장
          </Button>
        </div>
      </footer>
    </div>
  );
}
