<template>
  <div class="layout__content" v-if="user">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <div class="user">
      <picture>
        <img :src="user.avatar" :alt="user.name" width="72" height="72" />
      </picture>
      <div class="user__name">
        <span>{{ user.name }}</span>
      </div>
      <p class="user__phone">
        Контактный телефон: <span>{{ user.phone }}</span>
      </p>
    </div>

    <div class="layout__address" v-if="addressList.length">
      <div
        class="sheet address-form"
        v-for="address in addressList"
        :key="address.id"
      >
        <div class="address-form__header">
          <b>{{ address.name }}</b>
          <div class="address-form__edit">
            <button type="button" class="icon" @click="editAddress(address.id)">
              <span class="visually-hidden">Изменить адрес</span>
            </button>
          </div>
        </div>
        <p>
          {{ address.street }}, д. {{ address.building }}, кв.
          {{ address.flat }}
        </p>
        <small>{{ address.comment }}</small>
      </div>
    </div>

    <div class="layout__address">
      <address-form
        v-if="isFormShown"
        :addressToEdit="addressToEdit"
        @deleteAddress="deleteAddress"
      />
    </div>

    <div class="layout__button">
      <button type="button" class="button button--border" @click="addAddress">
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AddressForm from "@/modules/profile/AddressForm";

export default {
  components: { AddressForm },

  data() {
    return {
      addressList: [],
      isFormShown: false,
      addressToEdit: null,
    };
  },

  computed: {
    ...mapState("Auth", ["user"]),
  },

  async created() {
    this.addressList = await this.$api.addresses.query();
  },

  methods: {
    addAddress() {
      this.isFormShown = true;
    },
    editAddress(addressId) {
      this.addressToEdit = this.addressList.find(
        (item) => item.id === addressId
      );
      this.isFormShown = true;
    },
    deleteAddress() {
      this.isFormShown = false;
      this.$router.go(0);
    },
  },
};
</script>

<style lang="scss">
.user__phone {
  margin-left: 15px;
}
button.icon {
  cursor: pointer;
}
</style>
