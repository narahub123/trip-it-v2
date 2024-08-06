export interface ScheduleDtoInputType {
  metroId: string;
  startDate: string;
  endDate: string;
  scheduleTitle: string;
}

export interface ScheduleDetailDtoInputType {
  contentId: string;
  scheduleOrder: string;
  startTime: string;
  endTime: string;
}
