import type { FormItemRule } from 'element-plus';

export const passwordRules: FormItemRule[] = [
  {
    min: 6,
    max: 16,
    trigger: 'blur',
    message: '限制長度6~16位',
  },
  {
    pattern: /^[A-Za-z0-9]+$/,
    trigger: 'blur',
    message: '請輸入英數字',
  },
];

export const accountRules: FormItemRule[] = [
  {
    min: 4,
    max: 20,
    trigger: 'blur',
    message: '限制長度4~20位',
  },
  {
    pattern: /^[A-Za-z0-9]+$/,
    trigger: 'blur',
    message: '請輸入英數字',
  },
];
