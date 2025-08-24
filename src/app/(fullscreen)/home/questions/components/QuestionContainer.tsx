'use client';

import { useState, useMemo } from 'react';

import { Header } from '@/components/ui/Header';
import { Input } from '@/components/ui/Input';
import SearchIcon from '@/assets/icon/search_icon.svg';
import type { Question } from '@/types/memoirTypes';

import QuestionList from './QuestionList';
import RecentSearch from './RecentSearch';
import { EmptyState } from '@/components/ui/Empty';

interface Props {
  initialQuestions: Question[];
  title: string;
}

export default function QuestionContainer({ initialQuestions, title }: Props) {
  const [isSearching, setIsSearching] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [submittedTerm, setSubmittedTerm] = useState('');

  const filteredQuestions = useMemo(() => {
    if (!submittedTerm.trim()) {
      return [];
    }
    return initialQuestions.filter(
      question =>
        question.content.toLowerCase().includes(submittedTerm.toLowerCase()) ||
        (question.answer &&
          question.answer.toLowerCase().includes(submittedTerm.toLowerCase())),
    );
  }, [submittedTerm, initialQuestions]);

  const handleStartSearch = () => {
    setIsSearching(true);
  };

  const handleCancelSearch = () => {
    setIsSearching(false);
    setInputValue('');
    setSubmittedTerm('');
  };

  const handleSubmitSearch = () => {
    setSubmittedTerm(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmitSearch();
    }
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <Header
        onBackClick={isSearching ? handleCancelSearch : undefined}
        title={
          isSearching ? (
            <Input
              type="text"
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

      <section className="flex flex-1 flex-col px-5">
        {isSearching ? (
          submittedTerm ? (
            filteredQuestions.length > 0 ? (
              <QuestionList questions={filteredQuestions} />
            ) : (
              <EmptyState
                text={`'${submittedTerm}'에 대한 검색 결과가 없어요.`}
              />
            )
          ) : (
            <RecentSearch />
          )
        ) : (
          <QuestionList questions={initialQuestions} />
        )}
      </section>
    </div>
  );
}
