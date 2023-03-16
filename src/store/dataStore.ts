import { defineStore } from "pinia";
import type { StatusInterface } from "../type/statusMap.Interface";

const useStatusStore = defineStore({
  id: "dataStore",
  state: (): StatusInterface => ({}),
  actions: {
    async SET_ALL_STATUS() {},
  },
});

export default useStatusStore;
