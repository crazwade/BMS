import { showMessage } from "./common/common";
import router from "./router";
import { useUserStore } from "./store/store";
// import getCurrentUserData from './api/getCurrentUserData/getCurrentUserData';
// import { getRolePermissions } from './api/permission/getPermissions';

const whiteList = ["/login"];

router.beforeEach(async (to, from, next): Promise<void> => {
  const userStore = useUserStore();

  userStore.GET_LOCAL_TOKEN();
  const hasToken = userStore.token;

  if (hasToken && hasToken !== "") {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      try {
        if (userStore.isInit) {
          // 初始化過就跳過
          next();
          return;
        }

        // 初始化 使用者資訊
        const initUserSuccess = await userStore.INIT_USER();

        if (!initUserSuccess) {
          next("/login");
          return;
        }

        // TODO 取得permision route
        // const { success } = await permissionStore.INIT_PERMISSION(
        //   userStore.role
        // );

        // if (!success) {
        //   next("/login");
        //   return;
        // }

        next();
      } catch (error) {
        await userStore.RESET_INFO();
        next("/login");
      }
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    next();
  } else {
    next("/login");
  }
});
