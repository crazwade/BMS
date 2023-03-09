import type { App } from "vue";
import { createPinia } from "pinia";
import useUserStore from "./modules/users";

const store = createPinia();

export function registerStore(app: App) {
  app.use(store);
}

export { useUserStore };

export default store;
