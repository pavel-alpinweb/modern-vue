<script setup lang="ts">
import {computed, ref} from "vue";
import {length, required, Status, validate} from "../validation.ts";
import FormInput from "./FormInput.vue";
import {NewUser} from "../users.ts";
import {useUsers} from "../stores/users.ts";
import {useModal} from "../composables/modal.ts";

const username = ref('');
const usernameStatus = computed(() => {
  return validate(username.value, [required, length({min: 5, max: 10})]);
});

const password = ref('');
const passwordStatus = computed<Status>(() => {
  return validate(password.value, [required, length({min: 10, max: 40})]);
});

const isInvalid = computed(() => {
  return !usernameStatus.value.valid || !passwordStatus.value.valid;
});

const usersStore = useUsers();

const modal = useModal();

defineProps<{
  error?: string;
}>();

const emit = defineEmits<{
  (event: 'submit', payload: NewUser): void
}>();

async function handleSubmit() {
  if (isInvalid.value) return;

  const newUser: NewUser = {
    username: username.value,
    password: password.value,
  };

  try {
    emit('submit', newUser);
  } catch (e) {
    console.info(e);
  }
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <FormInput name="Username" v-model="username" :status="usernameStatus" type="text"/>
    <FormInput name="Password" v-model="password" :status="passwordStatus" type="password"/>
    <div v-if="error?.length > 0 && error" class="is-danger help">
      {{ error }}
    </div>
    <button class="button" :disabled="isInvalid">Submit</button>
  </form>

</template>

<style scoped>
.form {
  background: white;
  padding: 30px;
  margin-top: 50px;
}
</style>