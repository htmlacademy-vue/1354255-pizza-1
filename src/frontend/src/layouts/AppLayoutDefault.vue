<template>
  <div class="app-layout-default">
    <app-header />
    <slot />
  </div>
</template>

<script>
import AppHeader from "@/common/components/AppHeader";

export default {
  name: "AppLayoutDefault",

  components: { AppHeader },
};
</script>
