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
