<template>
  <component :is="layout">
    <slot></slot>
  </component>
</template>

<script>
const defaultLayout = () => import("@/layouts/AppLayoutDefault.vue");

export default {
  name: "AppLayout",

  computed: {
    layout() {
      return this.$route.meta.layout || defaultLayout;
    },
  },
};
</script>
