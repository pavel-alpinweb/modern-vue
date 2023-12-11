<script setup lang="ts">
import {Status} from "../validation.ts";

defineProps<{
  name: string;
  modelValue: string;
  status: Status;
  type: string;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>();

function handleInput(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  emit('update:modelValue', value);
}
</script>

<template>
  <div class="field" :data-testid="name">
    <label :for="name" class="label">{{ name }}</label>
    <div class="control">
      <input :id="name" class="input" :value="modelValue" :type="type" @input="handleInput"/>
    </div>

    <p v-if="!status.valid && status.message" class="is-danger help">
      {{ status.message }}
    </p>
  </div>
</template>

<style scoped>

</style>