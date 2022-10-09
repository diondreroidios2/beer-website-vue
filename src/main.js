import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import BeerDetail from "./components/BeerDetail.vue";
import AllBeers from "./components/AllBeers.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: AllBeers },
    { path: "/:id", component: BeerDetail },
  ],
});

const app = createApp(App);

app.use(router);

app.mount("#app");
