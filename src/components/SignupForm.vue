<script setup lang="ts">
import UserForm from "./UserForm.vue";
import {NewUser} from "../users.ts";
import {useUsers} from "../stores/users.ts";
import {useModal} from "../composables/modal.ts";


const userStore = useUsers();
const modal = useModal();

async function handleSignUp(newUser: NewUser) {
  await userStore.createUser(newUser);
  modal.hideModal();
}
</script>

<template>
  <UserForm @submit="handleSignUp"/>
</template>

<style scoped>

</style>