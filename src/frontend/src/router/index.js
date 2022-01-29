import Vue from "vue";
import Router from "vue-router";
import Main from "@/views/Index.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main,
    },
    {
      path: "/cart",
      name: "Cart",
      component: () =>
        import(/* webpackChunkName: "cart" */ "@/views/Cart.vue"),
    },
    {
      path: "/orders",
      name: "Orders",
      component: () =>
        import(/* webpackChunkName: "orders" */ "@/views/Orders.vue"),
    },
    {
      path: "/profile",
      name: "Profile",
      component: () =>
        import(/* webpackChunkName: "profile" */ "@/views/Profile.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () =>
        import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
    },
  ],
});
