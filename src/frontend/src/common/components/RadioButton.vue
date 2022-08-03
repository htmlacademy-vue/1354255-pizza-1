<template>
  <label :class="labelClasses">
    <input
      :checked="checked"
      :name="inputName"
      :value="inputValue"
      type="radio"
      class="visually-hidden"
      @change="$emit('change', $event.target.value)"
    />
    <slot></slot>
    <span>{{ description }}</span>
  </label>
</template>

<script>
export default {
  props: {
    labelClasses: {
      type: Array,
      required: true,
    },

    inputValue: {
      type: String,
      required: true,
    },

    inputName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    checked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
