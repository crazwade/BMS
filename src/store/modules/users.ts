import { defineStore } from "pinia";

interface UserType {
  token: string;
  account: string;
  isInit: boolean;
}

const useUserStore = defineStore({
  id: "users",
  state: (): UserType => ({
    token: "",
    account: "",
    isInit: false,
  }),
  actions: {
    // 初始化使用者
    INIT_USER(respData: { account: string }) {
      this.token = "FAKE_TOKEN";
      this.account = respData.account;
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
      }
    },
    // 清空所有資料
    RESET_INFO() {
      return new Promise<void>((resolve) => {
        this.isInit = false;
        this.account = "";
        this.SET_TOKEN("");
        resolve();
      });
    },
  },
});

export default useUserStore;
