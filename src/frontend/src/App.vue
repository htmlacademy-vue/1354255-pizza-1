<template>
  <div id="app">
    <AppLayout :isLoggedIn="isLoggedIn">
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: { AppLayout },

  computed: {
    ...mapGetters("Auth", {
      isLoggedIn: "getAuthStatus",
    }),
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
