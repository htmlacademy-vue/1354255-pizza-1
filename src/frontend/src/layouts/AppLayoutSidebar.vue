<template>
  <div class="app-layout-default">
    <app-header />

    <main class="layout">
      <aside class="layout__sidebar sidebar">
        <router-link :to="{ name: 'Main' }" class="logo layout__logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </router-link>

        <router-link
          class="layout__link"
          active-class="layout__link--active"
          :to="{ name: 'Orders' }"
          >История заказов</router-link
        >
        <router-link
          class="layout__link"
          active-class="layout__link--active"
          :to="{ name: 'Profile' }"
          >Мои данные</router-link
        >
      </aside>

      <slot />
    </main>
  </div>
</template>

<script>
import AppHeader from "@/common/components/AppHeader";

export default {
  name: "AppLayoutSidebar",
  components: { AppHeader },
};
</script>
