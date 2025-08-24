import { ApiResponse, http } from '@/lib/axios';
import type { Alarm, CreateAlarmRequest } from '@/types/alarmTypes';

// 알람 API
export const getAlarmList = async (): Promise<ApiResponse<Alarm[]>> => {
  const response = await http.get('/api/notification');

  return response.data;
};

// 알람 요청 API
export const createAlarm = async (
  alarm: CreateAlarmRequest,
): Promise<ApiResponse<Alarm>> => {
  const response = await http.post('/api/notification', alarm);

  return response.data;
};
