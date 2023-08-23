import { use as useHttp } from '../../../api/request';
import type { Request } from '../../../api/util';
import { transformResponse } from '../../../api/util';

type EventDataType = {
  date: string;
  join: number;
  totalJoin: number;
  imgData: string[];
}[];

/**
 * 取得活動紀錄資料
 */
async function getEventData(): Request<EventDataType> {
  const response = await useHttp().get('/get_events');
  return transformResponse(response);
}

export default getEventData;
