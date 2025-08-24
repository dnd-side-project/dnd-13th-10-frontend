import { mockScheduleDetailResponse } from '@/app/(fullscreen)/schedule/[slug]/mocks/mockScheduleDetailResponse';
import { ApiResponse, http } from '@/lib/axios';
import type {
  Schedule,
  ScheduleCreate,
  ScheduleDetailData,
  ScheduleDetailResponse,
} from '@/types/scheduleTypes';

export async function getScheduleDetail(
  _id: string,
): Promise<ScheduleDetailResponse> {
  // const response = await axios.get(`/schedules/${id}`);
  // return response.data

  return mockScheduleDetailResponse;
}

// 면접 일정 단건 조회 API
export const getScheduleDetails = async ({
  scheduleId,
}: {
  scheduleId: string;
}): Promise<ApiResponse<ScheduleDetailData>> => {
  const response = await http.get(`/api/schedules/${scheduleId}`);

  return response.data;
};

// 면접 일정 수정 API
export const updateSchedule = async ({
  scheduleId,
  data,
}: {
  scheduleId: string;
  data: Partial<ScheduleDetailData>;
}): Promise<ApiResponse<ScheduleDetailData>> => {
  const { interviewDate, ...restData } = data;

  const requestData = {
    ...restData,
    interviewTime: interviewDate,
  };

  const response = await http.put(`/api/schedules/${scheduleId}`, requestData);

  return response.data;
};

// 면접 일정 삭제 API
export const deleteSchedule = async ({
  scheduleId,
}: {
  scheduleId: string;
}): Promise<ApiResponse<void>> => {
  const response = await http.delete(`/api/schedules/${scheduleId}`);

  return response.data;
};

// 모든 면접 일정 조회 API
export const getAllSchedules = async (): Promise<ApiResponse<Schedule[]>> => {
  const response = await http.get('/api/schedules');

  return response.data;
};

// 면접 일정 생성 API
export const createSchedule = async (
  data: ScheduleCreate,
): Promise<ApiResponse<ScheduleCreate>> => {
  const response = await http.post('/api/schedules', data);

  return response.data;
};
