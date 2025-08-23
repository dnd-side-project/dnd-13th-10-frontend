import { mockScheduleDetailResponse } from '@/app/(fullscreen)/schedule/[slug]/mocks/mockScheduleDetailResponse';
import type { ScheduleDetailResponse } from '@/types/scheduleTypes';

export async function getScheduleDetail(
  _id: string,
): Promise<ScheduleDetailResponse> {
  // const response = await axios.get(`/schedules/${id}`);
  // return response.data

  return mockScheduleDetailResponse;
}
