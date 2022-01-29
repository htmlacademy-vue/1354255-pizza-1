<template>
  <div class="app-layout-default">
    <app-header :isLoggedIn="isLoggedIn"></app-header>
    <slot></slot>
  </div>
</template>

<script>
import AppHeader from "@/common/components/AppHeader";

export default {
  name: "AppLayoutDefault",
  components: { AppHeader },

  props: {
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
