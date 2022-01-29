<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <builder-dough-selector></builder-dough-selector>

        <builder-size-selector></builder-size-selector>

        <builder-ingredients-selector></builder-ingredients-selector>

        <builder-pizza-view></builder-pizza-view>
      </div>
    </form>
  </main>
</template>

<script>
import BuilderPizzaView from "@/modules/builder/BuilderPizzaView";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector";
import BuilderSizeSelector from "@/modules/builder/BuilderSizeSelector";
import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector";

export default {
  components: {
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
  },
};
</script>
