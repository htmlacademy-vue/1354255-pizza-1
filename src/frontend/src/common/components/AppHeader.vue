<template>
  <header class="header">
    <div class="header__logo">
      <router-link :to="{ name: 'Main' }" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>

    <div class="header__cart">
      <router-link :to="{ name: 'Cart' }">{{ totalPrice }} ₽</router-link>
    </div>

    <div class="header__user" v-if="isAuthorized">
      <router-link :to="{ name: 'Profile' }">
        <picture>
          <source
            type="image/webp"
            srcset="
              @/assets/img/users/user5.webp    1x,
              @/assets/img/users/user5@2x.webp 2x
            "
          />
          <img
            src="@/assets/img/users/user5.jpg"
            srcset="img/users/user5@2x.jpg"
            :alt="username"
            width="32"
            height="32"
          />
        </picture>
        <span>{{ username }}</span>
      </router-link>
      <button class="header__logout" @click="logoutHandler">
        <span>Выйти</span>
      </button>
    </div>

    <div class="header__user" v-else>
      <button class="header__login" @click="loginHandler">
        <span>Войти</span>
      </button>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      username: "Василий Ложкин",
    };
  },

  computed: {
    ...mapGetters("Cart", {
      totalPrice: "getTotalPrice",
    }),
    ...mapState("Auth", ["isAuthorized"]),
  },

  methods: {
    loginHandler() {
      this.$store.dispatch("Auth/login");
      this.$router.push({ name: "Login" });
    },
    logoutHandler() {
      this.$store.dispatch("Auth/logout");
      this.$router.push({ name: "Main" });
    },
  },
};
</script>

<style lang="scss" scoped>
.header__user {
  display: flex;
}

.header__logout,
.header__login {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
</style>
