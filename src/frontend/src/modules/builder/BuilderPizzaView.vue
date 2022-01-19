<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
      />
    </label>

    <div class="content__constructor"></div>

    <builder-price-counter></builder-price-counter>
  </div>
</template>

<script>
import BuilderPriceCounter from "@/modules/builder/BuilderPriceCounter";

export default {
  components: { BuilderPriceCounter },
};
</script>
