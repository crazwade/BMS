import type { messageType } from 'element-plus';
import { ElMessage, messageTypes, ElMessageBox } from 'element-plus';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { useClipboard } from '@vueuse/core';
import { format } from 'date-fns';
import type { SelectOption } from '../components/FormTypes';
import type { Response } from '../api/util';

/**
 * @param msg 提示訊息
 * @param type 訊息框種類 0: info， 1: success，2: warring，3: error
 * @param time 持續時間(秒)
 */
export function showMessage (msg: string, type: messageType = messageTypes[1], time = 3): void {
  ElMessage({
    message: msg,
    type,
    duration: time * 1000,
  });
}

export function showMsgBox (success: () => void, cancel?: () => void, msg = '確定要執行嗎?'): void {
  ElMessageBox.confirm(
    msg,
    'Warning',
    {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true,
    },
  )
    .then(() => {
      success();
    })
    .catch(() => {
      if (cancel) {
        cancel();
      }
    });
}

export function multipleRouteCheck (
  v: RouteLocationNormalizedLoaded,
  view: RouteLocationNormalizedLoaded,
) {
  if (v.path !== view.path) {
    return false;
  }

  if (v.meta.isMultiple && view.meta.isMultiple) {
    return v.query.id === view.query.id;
  }

  return true;
}

/**
 * @param value 要編譯的字串
 * @param tpye 類型， default: 保留頭尾3碼 email: 顯示帳號前3碼 '@'後保留
 * @returns ex: 123***789、 aaa*******@gmail.com
 */

export function encodeFormat (value: string, tpye: 'email' | 'default' = 'default') {
  let resoult = '';

  if (tpye === 'email') {
    const emailArray = value.split('@');
    const letterArray = [...emailArray[0]];
    letterArray.forEach((letter, index) => {
      if (index <= 2) {
        resoult += letter;
      } else {
        resoult += '*';
      }
    });
    resoult += `@${emailArray[1]}`;
    return resoult;
  }

  const splitArray = [...value];

  splitArray.forEach((letter, index) => {
    if (index <= 2 || index >= splitArray.length - 3) {
      resoult += letter;
    } else {
      resoult += '*';
    }
  });

  return resoult;
}

export function clipboardText (copyText: string) {
  const {
    isSupported, copy,
  } = useClipboard({ source: copyText });

  if (isSupported) {
    copy();
    showMessage('複製成功', 'success');
    return;
  }

  showMessage('複製失敗', 'error');
}

/**
 *
 * @param options 種類表
 * @param value 值
 * @returns 對應的label
 */
export function statusFormater (statusOptions:SelectOption[], value: string | number) {
  let resoult = '';

  statusOptions.forEach((option) => {
    if (option.value === value) {
      resoult = option.label;
    }
  });

  return resoult;
}

/**
 * @param value 需要轉換的數字
 * @param digit 小數點後位數
 * @param type floor: 無條件捨去、 ceil: 無條件進位、 round: 四捨五入
 * @param isPadEnd 是否小數點後補0
 * @returns number
 */
export function numberFormater (value: number, digit: number, type: 'floor' | 'ceil' | 'round' = 'floor', isPadEnd = false) {
  let resoult = value;
  const num = value * (10 ** digit);
  switch (type) {
    case 'ceil':
    {
      const ceilNum = Math.ceil(num);
      resoult = ceilNum / (10 ** digit);
      break;
    }
    case 'floor':
    {
      const floorNum = Math.floor(num);
      resoult = floorNum / (10 ** digit);
      break;
    }
    case 'round':
    {
      const roundNum = Math.round(num);
      resoult = roundNum / (10 ** digit);
      break;
    }
    default:
      return resoult;
  }

  if (!isPadEnd) {
    return resoult;
  }

  const splitArray = resoult.toString().split('.');
  const padString = (splitArray[1] ?? '').padEnd(8, '0');
  return `${splitArray[0]}.${padString}`;
}

/**
 * 檢查輸入格式(大小寫英文&數字) - 不接受空白
 * @param input 要檢查的字串
 * @param minLength 最少字串長度
 * @param maxLength 最多字串長度
 * @param allowSpecialChars 是否接受特殊字
 * @returns result boolean 檢驗結果
 * @returns error ?string 失敗原因
 */
export function checkStringValidity (
  input: string,
  minLength = 6,
  maxLength = 20,
  allowSpecialChars = false,
): { result: boolean, error?: string } {
  // 檢查長度是否合格
  if (input.length < minLength || input.length > maxLength) {
    return { error: `長度不符合規定 (${minLength} - ${maxLength})`, result: false };
  }
  // 檢查是否包含特殊字
  if (!allowSpecialChars) {
    const regex = /^[A-Za-z0-9]+$/;
    if (!regex.test(input)) {
      return { error: '不可包含特殊字', result: false };
    }
  }
  // 檢查是否包含空白
  const regex = /\s/;
  if (regex.test(input)) {
    return { error: '不可包含空白', result: false };
  }
  // 如果沒有任何問題，則返回 true
  return { result: true };
}

export function deepCopy (obj: any): any {
  const stringData: string = JSON.stringify(obj);
  const jsonData: any = JSON.parse(stringData);
  return jsonData;
}

export function dateFormater (date: string): string {
  const dateFormat = format(new Date(date), 'yyyy/MM/dd HH:mm:ss');

  return dateFormat;
}

export function checkEditSuccess (resp: Response) {
  if (!resp.success) {
    showMessage(`操作失敗, ${resp.errorCode}`, 'error');
    return false;
  }

  showMessage('操作成功', 'success');

  return true;
}

export function checkGetSuccess (resp: Response) {
  if (!resp.success) {
    showMessage(`查詢失敗, ${resp.errorCode}`, 'error');
    return false;
  }

  return true;
}
