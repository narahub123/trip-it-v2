export interface ScheduleDtoInputType {
  metroId: string;
  startDate: string;
  endDate: string;
  scheduleTitle: string;
}

export interface ScheduleDetailDtoInputType {
  contentId: string;
  scheduleOrder: number;
  startTime: string;
  endTime: string;
}
