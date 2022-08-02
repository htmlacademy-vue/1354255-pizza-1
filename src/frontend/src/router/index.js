import Vue from "vue";
import Router from "vue-router";
// import Main from "@/views/Index.vue";
import store from "@/store";
import routes from "@/router/routes";

Vue.use(Router);

export default Promise.all(routes).then((routes) => {
  const router = new Router({
    mode: "history",
    routes,
  });

  router.beforeEach((to, from, next) => {
    if (!to.meta.middlewares) {
      return next();
    }
    const middlewares = to.meta.middlewares;
    Object.keys(middlewares).forEach((middleware) => {
      middlewares[middleware]({ to, from, next, store });
    });
    return next();
  });

  return router;
});

// export default new Router({
//   mode: "history",
//   routes: [
//     {
//       path: "/",
//       name: "Main",
//       component: Main,
//     },
//     {
//       path: "/cart",
//       name: "Cart",
//       component: () =>
//         import(/* webpackChunkName: "cart" */ "@/views/Cart.vue"),
//     },
//     {
//       path: "/orders",
//       name: "Orders",
//       component: () =>
//         import(/* webpackChunkName: "orders" */ "@/views/Orders.vue"),
//       meta: { layout: () => import("@/layouts/AppLayoutSidebar.vue") },
//     },
//     {
//       path: "/profile",
//       name: "Profile",
//       component: () =>
//         import(/* webpackChunkName: "profile" */ "@/views/Profile.vue"),
//       meta: { layout: () => import("@/layouts/AppLayoutSidebar.vue") },
//     },
//     {
//       path: "/login",
//       name: "Login",
//       component: () =>
//         import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
//     },
//   ],
// });
