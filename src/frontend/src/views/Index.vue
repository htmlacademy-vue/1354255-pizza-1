<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper" v-if="isLoaded">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <builder-dough-selector />
        <builder-size-selector />
        <builder-ingredients-selector />
        <builder-pizza-view />
      </div>

      <AppLoader v-else></AppLoader>
    </form>
  </main>
</template>

<script>
import BuilderPizzaView from "@/modules/builder/BuilderPizzaView";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector";
import BuilderSizeSelector from "@/modules/builder/BuilderSizeSelector";
import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector";
import AppLoader from "@/common/components/AppLoader";

export default {
  components: {
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
    AppLoader,
  },

  data() {
    return {
      isLoaded: false,
    };
  },

  async created() {
    await this.$store.dispatch("loadAllPizzaStuff");
    this.$store.dispatch("Builder/selectDough", this.$store.state.doughData[0]);
    this.$store.dispatch("Builder/selectSize", this.$store.state.sizesData[0]);
    this.$store.dispatch(
      "Builder/selectSauce",
      this.$store.state.saucesData[0]
    );

    this.isLoaded = true;
  },
};
</script>
