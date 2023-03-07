export type Response<T = any> = {
  /** 是否呼叫成功 */
  success: boolean;
  /** `code` = 0001表示成功，反之則為後端回傳錯誤碼 */
  errorCode?: string;
  /** 後端返回的訊息 */
  message?: string;
  /** 後端返回的內容 */
  data: T;
};

export type Request<T = any> = Promise<Response<T>>;

/** 轉換後端回傳的格式 */
export function transformResponse(response: any): Response {
  const newResponse: Response = {
    success: response.code === "0001",
    data: null,
  };

  if (!newResponse.success) {
    newResponse.message = response.msg;
    newResponse.errorCode = response.code;
  }

  if (response?.data) {
    newResponse.data = response.data;
  }

  return newResponse;
}
