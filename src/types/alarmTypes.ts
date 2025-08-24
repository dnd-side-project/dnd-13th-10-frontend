// 알람
export interface Alarm {
  notificationCategory: string;
  content: string;
  createdAt: string;
}

// 알람 요청
export interface CreateAlarmRequest {
  userId: number;
  notificationCategory: string;
  content: string;
}
