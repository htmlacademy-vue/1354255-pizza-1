<template>
  <div id="app">
    <AppLayout :isLoggedIn="isLoggedIn">
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";
import EventBus from "@/eventBus";

export default {
  name: "App",
  components: { AppLayout },

  data() {
    return {
      isLoggedIn: false,
    };
  },

  mounted() {
    EventBus.$on("login", this.login);
    EventBus.$on("logout", this.logout);
  },

  methods: {
    login() {
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
