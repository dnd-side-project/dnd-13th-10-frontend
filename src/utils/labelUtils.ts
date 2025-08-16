import {
  MEMOIR_TYPE_LABELS,
  INTERVIEW_FORMAT_LABELS,
  INTERVIEW_LEVEL_LABELS,
  INTERVIEW_METHOD_LABELS,
  INTERVIEW_MOOD_LABELS,
  INTERVIEW_STATUS_LABELS,
  INTERVIEW_STEP_LABELS,
  POSITION_LABELS,
  QUESTION_TYPE_LABELS,
  SATISFACTION_NOTE_LABELS,
} from '@/constants/labels';
import type {
  MemoirType,
  InterviewFormat,
  InterviewLevel,
  InterviewMethod,
  InterviewMood,
  InterviewStatus,
  InterviewStep,
  Position,
  QuestionType,
  SatisfactionNote,
} from '@/types/memoirTypes';

export const getMemoirTypeLabel = (code: MemoirType): string =>
  MEMOIR_TYPE_LABELS[code] || code;

export const getInterviewFormatLabel = (code: InterviewFormat): string =>
  INTERVIEW_FORMAT_LABELS[code] || code;

export const getInterviewLevelLabel = (code: InterviewLevel): string =>
  INTERVIEW_LEVEL_LABELS[code] || code;

export const getInterviewMethodLabel = (code: InterviewMethod): string =>
  INTERVIEW_METHOD_LABELS[code] || code;

export const getInterviewMoodLabel = (code: InterviewMood): string =>
  INTERVIEW_MOOD_LABELS[code] || code;

export const getInterviewStatusLabel = (code: InterviewStatus): string =>
  INTERVIEW_STATUS_LABELS[code] || code;

export const getInterviewStepLabel = (code: InterviewStep): string =>
  INTERVIEW_STEP_LABELS[code] || code;

export const getPositionLabel = (code: Position): string =>
  POSITION_LABELS[code] || code;

export const getQuestionTypeLabel = (code: QuestionType): string =>
  QUESTION_TYPE_LABELS[code] || code;

export const getSatisfactionNoteLabel = (code: SatisfactionNote): string =>
  SATISFACTION_NOTE_LABELS[code] || code;
