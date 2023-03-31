import { use as useHttp } from "../request";
import type { Request } from "../util";
import { transformResponse } from "../util";

/**
 * 登出
 */
async function logout(): Request<null> {
  const response = await useHttp().post("/logout");
  return transformResponse(response);
}

export default logout;
