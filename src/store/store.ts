import { createPinia, defineStore } from "pinia";
import useUserStore from "./modules/users";
import usePermissionStore from "./modules/permissions";
import type { MemberType } from "@/type/member.interface";

const store = createPinia();

export const useMemberStore = defineStore({
  id: "member",
  state: () => ({
    memberTypeMap: new Map([
      ["normalMember", "一般會員"],
      ["seniorMember", "高級會員"],
      ["honoraryMember", "尊榮會員"],
    ]),
    memberData: [] as MemberType[],
  }),
  actions: {
    setMemberData(data: MemberType[]) {
      this.memberData = data;
    },
    getMemberData(): MemberType[] {
      return this.memberData;
    },
  },
});

export { useUserStore, usePermissionStore };

export default store;
