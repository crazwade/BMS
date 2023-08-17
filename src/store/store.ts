import { createPinia, defineStore } from "pinia";
import useUserStore from "./modules/users";
import usePermissionStore from "./modules/permissions";

const store = createPinia();

export const useMemberStore = defineStore({
  id: "member",
  state: () => ({
    memberTypeMap: new Map([
      ["normalMember", "一般會員"],
      ["seniorMember", "高級會員"],
      ["honoraryMember", "尊榮會員"],
    ]),
  }),
});

export { useUserStore, usePermissionStore };

export default store;
