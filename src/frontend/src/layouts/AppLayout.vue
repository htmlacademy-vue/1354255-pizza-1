<template>
  <component :is="layout" :isLoggedIn="isLoggedIn">
    <slot></slot>
  </component>
</template>

<script>
const defaultLayout = "AppLayoutDefault";

export default {
  name: "AppLayout",

  props: {
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
