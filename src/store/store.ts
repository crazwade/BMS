import type { App } from "vue";
import { createPinia } from "pinia";
import useUserStore from "./modules/users";
import usePermissionStore from "./modules/permissions";

const store = createPinia();

export function registerStore(app: App) {
  app.use(store);
}

export { useUserStore, usePermissionStore };

export default store;
