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

      <app-loader v-else />
    </form>
  </main>
</template>

<script>
import AppLayoutDefault from "@/layouts/AppLayoutDefault";
import BuilderPizzaView from "@/modules/builder/BuilderPizzaView";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector";
import BuilderSizeSelector from "@/modules/builder/BuilderSizeSelector";
import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector";
import AppLoader from "@/common/components/AppLoader";
import { mapState } from "vuex";

export default {
  name: "Main",

  components: {
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
    AppLoader,
  },

  layout: AppLayoutDefault,

  data() {
    return {
      isLoaded: false,
    };
  },

  computed: {
    ...mapState("Builder", ["selectedDough", "selectedSize", "selectedSauce"]),
  },

  async created() {
    await this.$store.dispatch("Common/loadAllPizzaStuff");

    if (Object.keys(this.selectedDough).length === 0) {
      this.$store.dispatch(
        "Builder/selectDough",
        this.$store.state.Common.doughData[0]
      );
    }

    if (Object.keys(this.selectedSize).length === 0) {
      this.$store.dispatch(
        "Builder/selectSize",
        this.$store.state.Common.sizesData[0]
      );
    }

    if (Object.keys(this.selectedSauce).length === 0) {
      this.$store.dispatch(
        "Builder/selectSauce",
        this.$store.state.Common.saucesData[0]
      );
    }

    this.isLoaded = true;
  },
};
</script>
