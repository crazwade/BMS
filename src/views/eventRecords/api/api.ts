import type { Response } from '../../../api/util';
import fetchEventData from './getEventData';

type EventDataType = {
  date: string;
  join: number;
  totalJoin: number;
  imgData: string[];
}[];

export async function getEventData(): Promise<Response<EventDataType>> {
  const apiResp = await fetchEventData();

  return apiResp;
}
