import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

createApp(App)
  .use(router)
  .use(Toast, {
    position: "top-center",
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false,
    transition: "Vue-Toastification__slideBlurred",
    maxToasts: 20,
    newestOnTop: true,
    dangerouslyHTMLString: true,
  })
  .mount("#app");
