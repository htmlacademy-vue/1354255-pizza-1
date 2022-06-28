<template>
  <div id="app">
    <AppLayout>
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
      <!-- <router-view v-slot="{ Component }">
        <transition name="slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view> -->
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

.slide-enter-active {
  transition: all 1.4s;
}
.slide-enter {
  opacity: 0;
  margin-left: 90px;
}
.slide-leave-active {
  transition: all 1.4s;
  opacity: 0;
  margin-left: -100px;
}
</style>
