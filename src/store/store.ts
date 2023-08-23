import { createPinia, defineStore } from 'pinia';
import useUserStore from './modules/users';
import usePermissionStore from './modules/permissions';
import type { MemberType } from '@/type/member.interface';
import type { EventDataType } from '@/type/event.interface';

export type EventDataTypeWithSelect = EventDataType & {
  isSelect: boolean;
};

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

export const useEventStore = defineStore({
  id: 'event',
  state: () => ({
    eventData: [] as EventDataTypeWithSelect[],
  }),
  actions: {
    setEventData(data: EventDataType[]) {
      this.eventData = data.map((item) => {
        return { ...item, isSelect: false };
      });
    },
    getEventData() {
      return this.eventData;
    },
    selectEvent(index: number) {
      this.eventData = this.eventData.map((item) => {
        return { ...item, isSelect: false };
      });

      this.eventData[index].isSelect = true;
    },
  },
});

export { useUserStore, usePermissionStore };

export default store;
