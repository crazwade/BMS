import type { Response } from "../../../api/util";
import callLoginApi from "./login";

interface LoginPayload {
  account: string;
  password: string;
}

export async function login(payload: LoginPayload): Promise<Response<null>> {
  const apiResp = await callLoginApi(payload);

  return apiResp;
}
