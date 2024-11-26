<!-- CampoTexto.vue -->
<template>
  <div>
    <label :for="name">{{ label }}</label>
    <input :type="type" :name="name" :placeholder="placeholder" v-model="valor" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CampoTexto',
  props: {
    label: String,
    type: {
      type: String,
      default: 'text'
    },
    name: String,
    placeholder: String,
    modelValue: String
  },
  data() {
    return {
      valor: this.modelValue
    }
  },
  watch: {
    valor(newValue) {
      this.$emit('update:modelValue', newValue)
    }
  }
})
</script>
