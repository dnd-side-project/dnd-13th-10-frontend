export const memoirKeys = {
  all: ['memoirs'] as const,
  lists: () => [...memoirKeys.all, 'list'] as const,
  hot: () => [...memoirKeys.lists(), 'hot'] as const,
  mine: (searchType: string) =>
    [...memoirKeys.lists(), 'mine', searchType] as const,
  tmp: () => [...memoirKeys.lists(), 'mine', 'tmp'] as const,
  liked: (filters: object) =>
    [...memoirKeys.lists(), 'liked', filters] as const,
  commented: (filters: object) =>
    [...memoirKeys.lists(), 'commented', filters] as const,
  bookmarked: (filters: object) =>
    [...memoirKeys.lists(), 'bookmarked', filters] as const,
  detail: (id: number) => [...memoirKeys.all, 'detail', id] as const,
  comments: (id: number) => [...memoirKeys.detail(id), 'comments'] as const,
};

export const scheduleKeys = {
  all: ['schedules'] as const,
  lists: () => [...scheduleKeys.all, 'list'] as const,
  detail: (id: string) => [...scheduleKeys.all, 'detail', id] as const,
};

export const userKeys = {
  all: ['user'] as const,
  history: () => [...userKeys.all, 'history'] as const,
  profile: () => [...userKeys.all, 'profile'] as const,
  logout: () => [...userKeys.all, 'logout'] as const,
  withdraw: () => [...userKeys.all, 'withdraw'] as const,
};

export const generalKeys = {
  all: ['general'] as const,
  company: (keyword: string) =>
    [...generalKeys.all, 'company', keyword] as const,
  questionCategories: (filters: object) =>
    [...generalKeys.all, 'questionCategories', filters] as const,
};

export const alarmKeys = {
  all: ['alarms'] as const,
  lists: () => [...alarmKeys.all, 'list'] as const,
};
