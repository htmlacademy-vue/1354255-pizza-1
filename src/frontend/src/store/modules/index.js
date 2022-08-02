// import Auth from "@/store/modules/auth.store";
// import Builder from "@/store/modules/builder.store";
// import Cart from "@/store/modules/cart.store";
// import Orders from "@/store/modules/orders.store";
// import Common from "@/store/modules/common.store";

// export default {
//   Auth,
//   Builder,
//   Cart,
//   Orders,
//   Common,
// };

const requireContext = require.context("@/modules/", true, /store\.js$/);

export default requireContext.keys().reduce((modules, filename) => {
  const moduleName = filename
    .split("/")[1]
    .replace(/^\w/, (c) => c.toUpperCase());

  modules[moduleName] =
    requireContext(filename).default || requireContext(filename);
  return modules;
}, {});
