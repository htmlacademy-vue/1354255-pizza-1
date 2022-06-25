<template>
  <div class="sign-form">
    <button href="#" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </button>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form method="post" @submit.prevent="authorize">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            type="email"
            v-model.trim="email"
            name="email"
            placeholder="example@mail.ru"
          />
        </label>
        <span class="error" v-if="!isEmailValid"
          >Поле обязательно для заполнения и должно соответствовать настоящему
          email-адресу.</span
        >
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            type="password"
            v-model.trim="password"
            name="pass"
            placeholder="***********"
          />
        </label>
        <span class="error" v-if="!isPasswordValid"
          >Поле обязательно для заполнения</span
        >
      </div>

      <button type="submit" class="button">Авторизоваться</button>
    </form>

    <span class="error" v-if="postError">{{ postError }}</span>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      postError: "",
    };
  },

  computed: {
    isPasswordValid() {
      return this.password.length > 0;
    },
    isEmailValid() {
      const emailReg = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      return this.email.length > 0 && this.email.match(emailReg);
    },
  },

  methods: {
    ...mapActions("Auth", ["login"]),
    authorize() {
      this.login({ email: this.email, password: this.password })
        .then(() => {
          this.$router.push({ name: "Main" });
        })
        .catch((e) => {
          this.postError = e;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.close {
  border: none;
  background: transparent;
}
.error {
  color: red;
}
</style>
