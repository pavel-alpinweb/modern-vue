<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import {useModal} from './composables/modal';
import {computed} from "vue";
import {useUsers} from "./stores/users.ts";

const modal = useModal();
const modalStyle = computed(() => {
  return {
    display: modal.show.value ? 'block' : 'none',
  };
});

const usersStore = useUsers();
usersStore.authenticate();
</script>

<template>
  <div class="modal" style="color: white;" :style="modalStyle">
    <div class="modal-background" @click.self="modal.hideModal()">
      <div class="modal-content">
        <div id="modal"></div>
      </div>
    </div>
    <button class="modal-close is-large" @click="modal.hideModal()"></button>
  </div>
  <div class="section">
    <div class="container">
      <Navbar/>
      <router-view/>
    </div>
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
@import "highlight.js/styles/atom-one-dark.css";

ul {
  list-style: revert !important;
  list-style-position: inside !important;
}

h1, h2, h3, h4, h5, h6 {
  font-size: revert !important;
  margin: 10px 0 !important;
}

pre {
  margin: 10px 0 !important;
}

p {
  margin: 10px 0 !important;
}
</style>
