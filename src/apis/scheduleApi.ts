import { mockScheduleDetailResponse } from '@/app/(fullscreen)/schedule/[slug]/mocks/mockScheduleDetailResponse';
import { ApiResponse, http } from '@/lib/axios';
import type {
  ScheduleCreate,
  ScheduleData,
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
  cookie,
}: {
  scheduleId: number;
  cookie?: string;
}): Promise<ApiResponse<ScheduleDetailData>> => {
  const response = await http.get(`/schedules/${scheduleId}`, {
    headers: {
      Cookie: cookie,
    },
  });

  return response.data;
};

// 면접 일정 수정 API
export const updateSchedule = async ({
  scheduleId,
  data,
}: {
  scheduleId: number;
  data: Partial<ScheduleDetailData>;
}): Promise<ApiResponse<ScheduleDetailData>> => {
  const { interviewDateTime, ...restData } = data;

  const requestData = {
    ...restData,
    interviewDateTime,
  };

  const response = await http.put(`/schedules/${scheduleId}`, requestData);

  return response.data;
};

// 면접 일정 삭제 API
export const deleteSchedule = async ({
  scheduleId,
}: {
  scheduleId: number;
}): Promise<ApiResponse<void>> => {
  const response = await http.delete(`/schedules/${scheduleId}`);

  return response.data;
};

// 모든 면접 일정 조회 API
export const getAllSchedules = async (): Promise<ApiResponse<ScheduleData>> => {
  const response = await http.get('/schedules');

  return response.data;
};

// 면접 일정 생성 API
export const createSchedule = async (
  data: ScheduleCreate,
): Promise<ApiResponse<ScheduleCreate>> => {
  const response = await http.post('/schedules', data);

  return response.data;
};
