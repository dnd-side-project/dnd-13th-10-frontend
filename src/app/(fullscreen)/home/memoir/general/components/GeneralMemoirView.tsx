'use client';

import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';

import InterviewInfo from './InterviewInfo';
import QnA from './QnA';
import InterviewReview from './InterviewReview';
import ReferenceLink from './ReferenceLink';

import { useGeneralMemoirFormStore } from '../store/generalMemoirFormStore';
import { isGeneralMemoirFormValid } from '../utils/generalMemoirValidation';

export default function GeneralMemoirView() {
  const formData = useGeneralMemoirFormStore(state => state.formData);
  const isSaveButtonEnabled = isGeneralMemoirFormValid(formData);

  const handleSave = () => {
    if (!isSaveButtonEnabled) return;

    console.log('✅ 최종 저장 데이터:', formData);
    // TO-DO: 이 곳에서 서버로 데이터를 전송하는 API를 호출
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
