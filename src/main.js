import Vue from "vue";
import App from "./App.vue";
import dateFilter from "@/filters/date.filter";
import localizeFilter from "@/filters/localize.filter";
import router from "./router";
import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.filter("date", dateFilter);
Vue.filter("localize", localizeFilter);

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
