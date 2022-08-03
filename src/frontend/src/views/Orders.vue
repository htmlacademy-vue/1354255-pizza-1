<template>
  <main class="layout">
    <div class="layout__content" v-if="isLoaded">
      <div class="layout__title">
        <h1 class="title title--big">История заказов</h1>
      </div>

      <section class="sheet order" v-if="orderList.length">
        <div v-for="order in orderList" :key="order.id">
          <div class="order__wrapper">
            <div class="order__number">
              <b>Заказ #{{ order.id }}</b>
            </div>
            <div class="order__sum">
              <span>Сумма заказа: {{ getOrderSum(order) }}&nbsp;₽ </span>
            </div>
            <div class="order__button">
              <button
                type="button"
                class="button button--border"
                @click="deleteOrder(order.id)"
              >
                Удалить
              </button>
            </div>
            <div class="order__button">
              <button type="button" class="button repeat" @click="repeatOrder(order)">
                Повторить
              </button>
            </div>
          </div>

          <ul class="order__list">
            <li
              class="order__item"
              v-for="pizza in order.orderPizzas"
              :key="pizza.id"
            >
              <div class="product">
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
                      {{ getSize(pizza.sizeId) }}, на
                      {{ getDough(pizza.doughId) }} тесте
                    </li>
                    <li>Соус: {{ getSauce(pizza.sauceId) }}</li>
                    <li>Начинка: {{ getIngredients(pizza.ingredients) }}</li>
                  </ul>
                </div>
              </div>
              <p class="order__price">{{ getPizzaPrice(pizza) }} ₽</p>
            </li>
          </ul>

          <ul class="order__additional" v-if="!!order.orderMisc">
            <li
              v-for="item in order.orderMisc"
              :key="item.miscId"
              class="order__additional-item"
              :data-quantity="`x${getMisc(item).quantity}`"
            >
              <img
                :src="getMisc(item).image"
                width="20"
                height="30"
                :alt="getMisc(item).name"
              />
              <p>
                <span>{{ getMisc(item).name }}</span>
                <b>{{ getMisc(item).price }} ₽</b>
              </p>
            </li>
          </ul>

          <p class="order__address">
            Адрес доставки:
            {{ order.orderAddress ? order.orderAddress.name : "Тест" }}
          </p>
        </div>
      </section>
    </div>

    <AppLoader v-else />
  </main>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import AppLoader from "@/common/components/AppLoader";

export default {
  components: { AppLoader },

  data() {
    return {
      isLoaded: false,
    };
  },

  computed: {
    ...mapState("Orders", ["orderList"]),
    ...mapGetters("Orders", [
      "getMisc",
      "getDough",
      "getSize",
      "getSauce",
      "getIngredients",
      "getPizzaPrice",
      "getMiscPrice",
    ]),
  },

  async created() {
    await this.$store.dispatch("Orders/loadOrders");
    await this.$store.dispatch("Common/loadAllPizzaStuff");
    this.isLoaded = true;
  },

  methods: {
    async deleteOrder(orderId) {
      await this.$api.orders.delete(orderId);
      await this.$store.dispatch("Orders/loadOrders");
    },

    repeatOrder(order) {
      order.orderPizzas.forEach((pizza) => {
        const normalizedDough = this.$store.state.Common.doughData.find(
          (item) => item.id === pizza.doughId
        );

        const normalizedSauce = this.$store.state.Common.saucesData.find(
          (item) => item.id === pizza.sauceId
        );

        const normalizedSize = this.$store.state.Common.sizesData.find(
          (item) => item.id === pizza.sizeId
        );

        const normalizedIngredients = pizza.ingredients.reduce(
          (result, item) => {
            const normalizedItem =
              this.$store.state.Common.ingredientsData.find(
                (elem) => elem.id === item.ingredientId
              );

            for (let i = 0; i < item.quantity; i++) {
              result.push(normalizedItem);
            }

            return result;
          },
          []
        );

        const normalizedPizza = {
          id: pizza.id,
          name: pizza.name,
          price: this.getPizzaPrice(pizza) / pizza.quantity,
          dough: {
            type: normalizedDough.type,
            price: normalizedDough.price,
            name: normalizedDough.name,
            id: normalizedDough.id,
          },
          sauce: {
            type: normalizedSauce.type,
            price: normalizedSauce.price,
            name: normalizedSauce.name,
            id: normalizedSauce.id,
          },
          ingredients: normalizedIngredients,
          size: {
            type: normalizedSize.type,
            multiplier: normalizedSize.multiplier,
            name: normalizedSize.name,
            id: normalizedSize.id,
          },
          amount: pizza.quantity,
        };

        this.$store.dispatch("Orders/addPizzaToCart", normalizedPizza);
      });

      const normalizedMisc = order.orderMisc.map((item) => {
        const result = this.$store.state.miscData.find(
          (elem) => elem.id === item.miscId
        );

        return { ...result, amount: item.quantity };
      });

      this.$store.dispatch("Orders/addMiscToCart", normalizedMisc);
      this.$store.dispatch("Cart/setStreet", order.orderAddress.street);
      this.$store.dispatch("Cart/setBuilding", order.orderAddress.building);
      this.$store.dispatch("Cart/setFlat", order.orderAddress.flat);
      this.$store.dispatch("Cart/setComment", order.orderAddress.comment);
      this.$store.dispatch("Cart/setSelectedOption", order.orderAddress.id);

      this.$router.push({ name: "Cart" });
    },

    getOrderSum(order) {
      return (
        this.getMiscPrice(order.orderMisc) +
        order.orderPizzas.reduce((sum, item) => {
          return sum + this.getPizzaPrice(item);
        }, 0)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.order__additional-item {
  display: flex;
  align-items: center;

  &::after {
    content: attr(data-quantity);
    margin-left: 5px;
    display: block;
    color: #777;
  }
}
</style>
