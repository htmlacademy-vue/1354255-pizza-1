<template>
  <form
    class="address-form address-form--opened sheet"
    @submit.prevent="submitAddress"
  >
    <div class="address-form__header">
      <b>{{ name }}</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <label class="input">
          <span>Название адреса*</span>
          <input
            type="text"
            name="addr-name"
            placeholder="Введите название адреса"
            required
            v-model.trim="name"
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <label class="input">
          <span>Улица*</span>
          <input
            type="text"
            name="addr-street"
            placeholder="Введите название улицы"
            required
            v-model.trim="street"
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Дом*</span>
          <input
            type="text"
            name="addr-house"
            placeholder="Введите номер дома"
            required
            v-model.trim="building"
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Квартира</span>
          <input
            type="text"
            name="addr-apartment"
            placeholder="Введите № квартиры"
            v-model.trim="flat"
          />
        </label>
      </div>
      <div class="address-form__input">
        <label class="input">
          <span>Комментарий</span>
          <input
            type="text"
            name="addr-comment"
            placeholder="Введите комментарий"
            v-model.trim="comment"
          />
        </label>
      </div>
    </div>

    <div class="address-form__buttons">
      <button
        type="reset"
        class="button button--transparent"
        v-if="addressToEdit"
        @click="deleteAddress"
      >
        Удалить
      </button>
      <button type="submit" class="button">Сохранить</button>
    </div>
  </form>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    addressToEdit: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      name: "",
      street: "",
      building: "",
      flat: "",
      comment: "",
    };
  },

  computed: {
    ...mapGetters("Auth", {
      userId: "getUserAttribute",
    }),
  },

  created() {
    this.name = this.addressToEdit?.name || "";
    this.street = this.addressToEdit?.street || "";
    this.building = this.addressToEdit?.building || "";
    this.flat = this.addressToEdit?.flat || "";
    this.comment = this.addressToEdit?.comment || "";
  },

  methods: {
    submitAddress(e) {
      if (this.addressToEdit) {
        this.$api.addresses.put({
          id: this.addressToEdit.id,
          name: this.name,
          userId: this.userId("id"),
          street: this.street,
          building: this.building,
          flat: this.flat,
          comment: this.comment,
        });
      } else {
        this.$api.addresses.post({
          name: this.name,
          userId: this.userId("id"),
          street: this.street,
          building: this.building,
          flat: this.flat,
          comment: this.comment,
        });
      }

      e.target.reset();
      this.$emit("submit");
    },

    deleteAddress() {
      this.$api.addresses.delete(this.addressToEdit.id);
      this.$emit("deleteAddress");
    },
  },
};
</script>
