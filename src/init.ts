import { showMessage } from "./common/common";
import router from "./router";
import { useUserStore, usePermissionStore } from "./store/store";

const whiteList = ["/login"];

router.beforeEach(async (to, from, next): Promise<void> => {
  const userStore = useUserStore();
  const permissionStore = usePermissionStore();

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

        // 初始化 權限以及路由資訊
        const initPermissionSuccess = await permissionStore.INIT_PERMISSION();

        if (!initPermissionSuccess) {
          next("/login");
          return;
        }

        if (!permissionStore.flatRoute.includes(String(to.name))) {
          if (to.name === "") {
            return;
          }
          showMessage("權限不足or頁面不存在", "warning");
          next("/404");
        }

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
