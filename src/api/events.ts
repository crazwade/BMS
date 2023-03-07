import createEvents from "../helper/createEvents";

enum Events {
  /** @description 網路斷線 */
  OFFLINE = "OFFLINE",
  /** @description 請求逾時 */
  TIMEOUT = "TIMEOUT",
  /** @description  */
  HTTP_ERROR = "HTTP_ERROR",
  /** @description 回應錯誤 */
  RESPONSE_ERROR = "RESPONSE_ERROR",
  /** @description 請求中 */
  REQUESTING = "REQUESTING",
}

const { on, once, emit, dispose, extend } = createEvents(Events);

export { on, once, emit, dispose, extend, Events };
