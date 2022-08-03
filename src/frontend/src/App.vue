<template>
  <div id="app">
    <AppLayout>
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";
import { setAuth } from "@/common/helpers";

export default {
  name: "App",
  components: { AppLayout },

  created() {
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>

<style lang="scss" scoped>
.slide-enter-active {
  transition: all 0.4s;
}
.slide-enter {
  opacity: 0;
  margin-left: 90px;
}
.slide-leave-active {
  transition: all 0.4s;
  opacity: 0;
  margin-left: -100px;
}
</style>
