'use client';

import { useState } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import SearchIcon from '@/assets/icon/search_icon.svg';
import { Header } from '@/components/ui/Header';
import { Input } from '@/components/ui/Input';
import { Chip } from '@/components/ui/Chip';
import { EmptyState } from '@/components/ui/Empty';
import { generalQueries } from '@/queries/generalOptions';
import { userKeys } from '@/queries/queryKeys';
import { MEMOIR_TYPES } from '@/constants/code';
import type { MemoirType, Question, QuestionType } from '@/types/memoirTypes';

import QuestionList from './QuestionList';
import RecentSearch from './RecentSearch';

interface Props {
  initialQuestions: Question[];
  title: string;
  questionType: QuestionType | string;
}

export default function QuestionContainer({
  initialQuestions,
  title,
  questionType,
}: Props) {
  const [isSearching, setIsSearching] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [submittedTerm, setSubmittedTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<MemoirType>(
    MEMOIR_TYPES.QUICK,
  );
  const queryClient = useQueryClient();
  const isFilterQueryEnabled = selectedFilter !== MEMOIR_TYPES.QUICK;
  const isSearchQueryEnabled = isSearching && submittedTerm.trim().length > 0;

  const { data: clientFetchedData, isPending } = useQuery({
    ...generalQueries.questionCategories({
      searchReq: {
        type: questionType,
        memoirType: selectedFilter,
        condition: submittedTerm,
      },
    }),
    enabled: isSearchQueryEnabled || isFilterQueryEnabled,
  });

  const handleStartSearch = () => {
    setIsSearching(true);
  };

  const handleCancelSearch = () => {
    setIsSearching(false);
    setInputValue('');
    setSubmittedTerm('');
  };

  const handleSubmitSearch = () => {
    if (!inputValue.trim()) return;
    setSubmittedTerm(inputValue);

    queryClient.invalidateQueries({ queryKey: userKeys.history() });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmitSearch();
    }
  };

  const renderContent = () => {
    if (isSearching) {
      if (!submittedTerm.trim()) {
        return <RecentSearch />;
      }
      if (isPending) {
        return <QuestionListSkeleton />;
      }
      const searchedQuestions = clientFetchedData?.data.result || [];
      if (searchedQuestions.length === 0) {
        return (
          <EmptyState text={`'${submittedTerm}'에 대한 검색 결과가 없어요.`} />
        );
      }
      return <QuestionList questions={searchedQuestions} />;
    }

    if (isFilterQueryEnabled && isPending) {
      return <QuestionListSkeleton />;
    }

    let questions = isFilterQueryEnabled
      ? clientFetchedData?.data.result || []
      : initialQuestions;

    if (selectedFilter === MEMOIR_TYPES.QUICK) {
      questions = questions.filter(question => !question.answer);
    } else if (selectedFilter === MEMOIR_TYPES.GENERAL) {
      questions = questions.filter(question => !!question.answer);
    }

    if (questions.length === 0) {
      return <EmptyState text="아직 등록된 질문이 없어요." />;
    }
    return <QuestionList questions={questions} />;
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <Header
        onBackClick={isSearching ? handleCancelSearch : undefined}
        title={
          isSearching ? (
            <Input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="검색어를 입력하세요."
              onClear={() => setInputValue('')}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            title
          )
        }
        rightContent={<SearchIcon />}
        onRightClick={isSearching ? handleSubmitSearch : handleStartSearch}
      />
      <header className="flex gap-2 px-5 py-8">
        <Chip
          text="퀵회고"
          isSelected={selectedFilter === MEMOIR_TYPES.QUICK}
          onClick={() => setSelectedFilter(MEMOIR_TYPES.QUICK)}
        />
        <Chip
          text="일반회고"
          isSelected={selectedFilter === MEMOIR_TYPES.GENERAL}
          onClick={() => setSelectedFilter(MEMOIR_TYPES.GENERAL)}
        />
      </header>
      <section className="flex flex-1 flex-col px-5">{renderContent()}</section>
    </div>
  );
}

function QuestionListSkeleton() {
  return (
    <div className="space-y-4 py-8">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="bg-foundation-box animate-pulse rounded-xl px-5 py-3"
        >
          <div className="bg-foundation-bg h-5 w-3/4 rounded" />
          <div className="bg-foundation-bg mt-2 h-4 w-1/2 rounded" />
        </div>
      ))}
    </div>
  );
}
