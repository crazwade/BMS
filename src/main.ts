import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { init as initHttp } from "./api/request";

import App from "./App.vue";
import router from "./router";

import "./index.css"; // 引入 tailwindcss 的樣式表

async function main() {
  initHttp({
    baseURL: "http://localhost:5174/",
    withCredentials: true,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      apiKey: "dummy_apikey",
    },

    transformRequest: [
      (data, headers) => {
        const saltedData = {
          ...data,
        };

        if (headers?.["Content-Type"] === "application/x-www-form-urlencoded") {
          const newData = new URLSearchParams(saltedData);
          return newData;
        }

        if (headers?.["Content-Type"] === "application/form-data") {
          const formData = new FormData();

          Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
          });

          return formData;
        }

        if (headers?.["Content-Type"] === "application/json") {
          const newData = JSON.stringify(data);
          return newData;
        }

        return saltedData;
      },
    ],
  });

  const app = createApp(App);

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }

  app.use(createPinia());
  app.use(router);

  app.use(ElementPlus);
  app.mount("#app");
}

main();
