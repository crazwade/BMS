import { createPinia, defineStore } from 'pinia';
import useUserStore from './modules/users';
import usePermissionStore from './modules/permissions';
import type { MemberType } from '@/type/member.interface';

const store = createPinia();

export const useMemberStore = defineStore({
  id: 'member',
  state: () => ({
    memberTypeMap: new Map([
      ['normalMember', '一般會員'],
      ['seniorMember', '高級會員'],
      ['honoraryMember', '尊榮會員'],
    ]),
    memberData: [] as MemberType[],
  }),
  actions: {
    setMemberData(data: MemberType[]) {
      this.memberData = data;
    },
    getAllMemberData(): MemberType[] {
      return this.memberData;
    },
    getMemberData(uid: number): MemberType | undefined {
      return this.memberData.find((item) => item.uid === uid);
    },
    updateMember(uid: number, data: MemberType) {
      const getIndex = this.memberData.findIndex((item) => item.uid === uid);
      Object.assign(this.memberData[getIndex], data);
    },
  },
});

export { useUserStore, usePermissionStore };

export default store;
