<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="pizza.name"
      />
      <div class="product__text">
        <h2>{{ pizza.name }}</h2>
        <ul>
          <li>
            {{ pizza.size }} см, на {{ doughDeclension(pizza.dough) }} тесте
          </li>
          <li>Соус: {{ pizza.sauce }}</li>
          <li>Начинка: {{ pizza.ingredients }}</li>
        </ul>
      </div>
    </div>

    <div class="counter cart-list__counter">
      <button type="button" class="counter__button counter__button--minus">
        <span class="visually-hidden">Меньше</span>
      </button>
      <input type="text" name="counter" class="counter__input" value="1" />
      <button
        type="button"
        class="counter__button counter__button--plus counter__button--orange"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div class="cart-list__price">
      <b>{{ item.price }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit">Изменить</button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },

  methods: {
    doughDeclension(dough) {
      if (dough.toLowerCase === "тонкое") {
        return "тонком";
      } else {
        return "толстом";
      }
    },

    filling(ingredients) {
      return ingredients.join(", ");
    },
  },
};
</script>
