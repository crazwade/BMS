import { use as useHttp } from "../../../api/request";
import type { Request } from "../../../api/util";
import { transformResponse } from "../../../api/util";

interface Payload {
  /** 帳號 */
  account: string;
  /** 密碼 */
  password: string;
}

/**
 * 登入
 */
async function login(payload: Payload): Request<null> {
  // 檢查帳號是否符合格式
  // 檢查密碼是否符合格式

  const response = await useHttp().post("/login", payload);
  return transformResponse(response);
}

export default login;
