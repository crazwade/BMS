/* eslint-disable no-useless-constructor */
/**
 * @Description: axios封装
 * @Author: 灰是小灰灰的灰
 * @Email: 454539387@qq.com
 * @Date: 2021-07-06 11:49:40
 * @LastEditors: 灰是小灰灰的灰
 * @LastEditTime: 2021-07-06 11:49:40
 */

import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";
import axios from "axios";
import { apiErrorCode, ApiError } from "./apiErrorCode";
import { Events, emit } from "./events";

// import { getEnvs } from './envs';
// import cookies from '/@/utils/cookies';
// import router from '/@/router';
// import { useUserStore } from '/@/store';

// import { TOKEN, WHITE_CODE_LIST, LOGIN_ERROR_CODE, GLOBAL_DATA } from '/@/config/constant';
// import { TOKEN, GLOBAL_DATA } from '/@/config/constant';
// import qs from 'qs';

// type optionsType = {
//   url: string
//   method: string
//   data?: any
// }

function checkStatus(status: number) {
  const errMessage = apiErrorCode[status] || apiErrorCode.未知錯誤;
  return errMessage;
}

let instance: AxiosInstance;

export function init(config: AxiosRequestConfig) {
  instance = axios.create(config);

  instance.interceptors.request.use((config: AxiosRequestConfig) => {
    if (!navigator.onLine) {
      return Promise.reject(new Error("offline"));
    }

    // const token = cookies.get(TOKEN);
    // if (token) {
    //   config.headers!.Authorization = token;
    // }
    return config;
  });

  instance.interceptors.response.use(
    (res: AxiosResponse) => {
      const result = res;
      // const type = Object.prototype.toString.call(result.data);
      // // 如果是文件流 直接返回
      // if (type === '[object Blob]' || type === '[object ArrayBuffer]') {
      //   return result;
      // }

      return result.data;
    },
    (error) => {
      // 網路斷線
      const isOffline = error.message.includes("offline");
      if (isOffline) {
        emit(Events.OFFLINE);
        return Promise.reject(new ApiError(apiErrorCode.未連線));
      }

      // 請求逾時
      const isTimeout = error.message.includes("timeout");
      if (isTimeout) {
        emit(Events.TIMEOUT);
        return Promise.reject(new ApiError(apiErrorCode.請求逾時));
      }

      // http error
      const isHttpError = error && error.response;
      if (isHttpError) {
        const errorMessage = checkStatus(error.response.status);

        emit(Events.HTTP_ERROR, {
          msg: errorMessage,
          code: error.response.status,
        });
        return Promise.reject(new ApiError(error.response.status));
      }

      // 未知錯誤
      return Promise.reject(new ApiError(apiErrorCode.未知錯誤));
    }
  );

  return instance;
}

export function use(): AxiosInstance {
  return instance;
}
