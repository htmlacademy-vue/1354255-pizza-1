<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <radio-button
          v-for="element in dough"
          :key="element.id"
          :labelClasses="['dough__input', `dough__input--${element.type}`]"
          :description="element.description"
          :inputValue="element.type"
          inputName="dough"
          @change="
            $emit('selectDough', { type: element.type, price: element.price })
          "
        >
          <b>{{ element.name }}</b>
        </radio-button>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

export default {
  components: { RadioButton },

  props: {
    dough: {
      type: Array,
      required: true,
    },
  },
};
</script>
