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
  nickname: string;
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
    INIT_USER(respData: { account: string }) {
      this.token = "FAKE_TOKEN";
      this.nickname = respData.account;
    },
    // 設定Token
    SET_TOKEN(token: string = "") {
      this.SET_LOCAL_TOKEN(token);
      this.token = token;
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
