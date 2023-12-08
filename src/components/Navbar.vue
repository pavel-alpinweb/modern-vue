<script setup lang="ts">
import {useModal} from '../composables/modal';
import {useUsers} from "../stores/users.ts";
import {useRouter} from "vue-router";

const modal = useModal();
const usersStore = useUsers();


const router = useRouter();

async function logout() {
  await usersStore.logout();
  await router.push({path: '/'});
}
</script>

<template>
  <div class="navbar">
    <div class="navbar-end">
      <div v-if="usersStore.currentUserId" class="buttons">
        <button class="button" @click="logout">Sign Out</button>
        <RouterLink to="/posts/new" class="button">New Post</RouterLink>
      </div>
      <div v-else class="buttons">
        <button id="sign-up" class="button" @click="modal.showModal('signUp')">Sign Up</button>
        <button data-testid="sign-in" class="button" @click="modal.showModal('signIn')">Sign In</button>
      </div>
    </div>
  </div>

  <Teleport to="#modal">
    <component :is="modal.component.value"/>
  </Teleport>
</template>

<style scoped>

</style>