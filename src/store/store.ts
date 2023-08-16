import { createPinia } from "pinia";
import useUserStore from "./modules/users";
import usePermissionStore from "./modules/permissions";

const store = createPinia();

export { useUserStore, usePermissionStore };

export default store;
