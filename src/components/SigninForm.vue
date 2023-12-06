<script setup lang="ts">
import UserForm from "./UserForm.vue";
import {NewUser} from "../users.ts";
import {useUsers} from "../stores/users.ts";
import {useModal} from "../composables/modal.ts";


const userStore = useUsers();
const modal = useModal();

async function handleSignUp(newUser: NewUser) {
  const res = await userStore.login(newUser);
  if (res) {
    modal.hideModal();
  }
}
</script>

<template>
  <UserForm @submit="handleSignUp" :error="userStore.error"/>
</template>

<style scoped>

</style>