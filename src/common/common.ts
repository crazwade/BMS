import type { messageType } from "element-plus";
import { ElMessage, messageTypes, ElMessageBox } from "element-plus";

/**
 * @param msg 提示訊息
 * @param type 訊息框種類 0: info， 1: success，2: warring，3: error
 * @param time 持續時間(秒)
 */
export function showMessage(
  msg: string,
  type: messageType = messageTypes[1],
  time = 3
): void {
  ElMessage({
    message: msg,
    type,
    duration: time * 1000,
  });
}

export function showMsgBox(
  success: () => void,
  cancel?: () => void,
  msg = "確定要執行嗎?"
): void {
  ElMessageBox.confirm(msg, "Warning", {
    confirmButtonText: "確定",
    cancelButtonText: "取消",
    type: "warning",
    center: true,
  })
    .then(() => {
      success();
    })
    .catch(() => {
      if (cancel) {
        cancel();
      }
    });
}

/**
 * 物件轉換成Map
 * @param data [key: number]: string || [key: string]: string;
 * @returns Map
 */
export const convertObjToMap = (
  arr: { [key: string]: string }[]
): Map<string, string> => {
  const map = new Map<string, string>();
  map.set("all", "全部");
  arr.forEach((obj) => {
    const [key, value] = Object.entries(obj)[0];
    map.set(key, value);
  });
  return map;
};

/**
 * 字串第一個字轉成小寫
 * @param str 字串
 * @returns 字串
 */
export const toCamelCase = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toLowerCase() + str.slice(1);
};
