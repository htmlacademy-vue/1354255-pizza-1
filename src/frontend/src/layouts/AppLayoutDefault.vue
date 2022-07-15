<template>
  <div class="app-layout-default">
    <app-header />
    <slot></slot>
  </div>
</template>

<script>
import AppHeader from "@/common/components/AppHeader";

export default {
  name: "AppLayoutDefault",
  components: { AppHeader },
};
</script>

<style lang="scss">
// .app-layout-default {
//   &.slide-leave-active,
//   &.slide-enter,
//   &.slide-enter-to {
//     .header,
//     .footer {
//       opacity: 1;
//       margin-left: 0;
//     }
//   }
// }
</style>
