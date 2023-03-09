import { defineStore } from "pinia";

interface UserType {
  token: string;
  uid: number;
  account: string;
  nickname: string;
  isDisabled: boolean;
  lastLoginTime: string;
  role: string;
  onlineStatus: boolean;
  createdAt: string;
  updatedAt: string;
  updatedByAdmin: number;
  isInit: boolean;
}

interface Admin {
  token: string;
  uid: number;
  account: string;
  nickname: string;
  isDisabled: boolean;
  lastLoginTime: string;
  role: string;
  onlineStatus: boolean;
  createdAt: string;
  updatedAt: string;
  updatedByAdmin: number;
}

const useUserStore = defineStore({
  id: "users",
  state: (): UserType => ({
    token: "",
    uid: 0,
    account: "",
    nickname: "",
    isDisabled: false,
    lastLoginTime: "",
    role: "",
    onlineStatus: false,
    createdAt: "",
    updatedAt: "",
    updatedByAdmin: 0,
    isInit: false,
  }),
  actions: {
    // 初始化使用者
    async INIT_USER(): Promise<boolean> {
      try {
        const userStore = useUserStore();
        // TODO API 取得使用者資訊
        // const userResp = await getCurrentUserData();
        const userResp = {
          success: true,
          data: {
            token: "FAKE_TOKEN",
            uid: 0,
            account: "Jacky0309",
            nickname: "Jacky Wu",
            isDisabled: false,
            lastLoginTime: "2023/03/09 00:00:00",
            role: "Admin",
            onlineStatus: true,
            createdAt: "2023/03/08 00:00:00",
            updatedAt: "2023/03/09 00:00:01",
            updatedByAdmin: 0,
          },
        };
        if (!userResp.success || !userResp.data) {
          return false;
        }

        userStore.SET_USER_DATE(userResp.data);
        this.isInit = true;

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    // 設定Token
    SET_TOKEN(token = "") {
      this.SET_LOCAL_TOKEN(token);
      this.token = token;
    },
    // 設定使用者資訊
    SET_USER_DATE(data: Admin) {
      Object.assign(this, data);
    },
    // 取得本地Token
    GET_LOCAL_TOKEN() {
      const token = localStorage.getItem("token");
      this.token = token ?? "";
    },
    // 設定本地token
    SET_LOCAL_TOKEN(token: string) {
      localStorage.setItem("token", token);
    },
    async LOGIN_OUT(isForce: boolean) {
      try {
        if (!isForce) {
          // TODO 登出
          // await logout();
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.RESET_INFO();
        // TODO 返回登入頁
        // const permissionStore = usePermissionStore();

        // permissionStore.router?.push({
        //   name: "Login",
        // });
      }
    },
    // 清空所有登录信息
    RESET_INFO() {
      return new Promise<void>((resolve) => {
        this.isInit = false;
        this.SET_TOKEN("");
        resolve();
      });
    },
  },
});

export default useUserStore;
