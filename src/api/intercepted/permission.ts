import type { AxiosRequestConfig } from 'axios';
import { apiErrorCode, ApiError } from '../apiErrorCode';
import { use as useRequest } from '../request';
import { usePermissionStore } from '../../store/store';

function specialCheck(path: string, permissions: string[]) {
  const permissionFilter = permissions.filter((permission) =>
    permission.includes(':')
  );
  for (let i = 0; i < permissionFilter.length; i += 1) {
    const permission = permissionFilter[i];

    const permissionSplit = permission.split('/');
    const pathSplit = path.split('/');

    if (permissionSplit.length === pathSplit.length) {
      let isSame = true;
      permissionSplit.forEach((e, index) => {
        if (!e.includes(':') && e !== pathSplit[index]) {
          isSame = false;
        }
      });

      if (isSame) {
        return true;
      }
    }
  }

  return false;
}

// 權限檢查
// 由前端寫死的權限(登入/登出)
// 加上從API permissions 拿到的權限來做比對(權限)
function checkPath(path: string) {
  const permissionStore = usePermissionStore();
  const whiteList: string[] = ['CREATE/login', 'CREATE/logout'];

  if (
    whiteList.includes(path) ||
    permissionStore.permission.includes(path) ||
    specialCheck(path, whiteList) ||
    specialCheck(path, permissionStore.permission)
  ) {
    return true;
  }

  return false;
}

function mapHttpMethodToPermission(method: string): string {
  switch (method.toUpperCase()) {
    case 'GET':
      return 'READ';
    case 'POST':
      return 'CREATE';
    case 'PATCH':
    case 'PUT':
      return 'UPDATE';
    case 'DELETE':
      return 'DELETE';
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
}

export default function interceptedPermission() {
  const request = useRequest();
  // @ts-ignore
  request.interceptors.request.use((config: AxiosRequestConfig) => {
    if (config.url === undefined || config.method === undefined) {
      return Promise.reject(new ApiError(apiErrorCode.錯誤請求));
    }
    const transformMethod = mapHttpMethodToPermission(config.method);
    // POST/members CRUD + PATH
    const checkURL = `${transformMethod.toUpperCase()}${config.url}`;
    if (!checkPath(checkURL)) {
      console.log(`block: ${checkURL}`);
      return Promise.reject(new ApiError(apiErrorCode.沒有權限));
    }
    return config;
  });
}
