<script setup lang="ts">
import {useRoute} from "vue-router";
import {usePosts} from "../stores/posts.ts";
import {Post} from "../posts.ts";
import {useUsers} from "../stores/users.ts";
import {computed} from "vue";

const route = useRoute();
const postsStore = usePosts();
const usersStore = useUsers();
const id = route.params.id as string;

const post: Post | undefined = postsStore.all.get(id);
if (!post) {
  throw Error(`Post with id ${id} was not found`);
}

const canEdit = computed(() => {
  if (!usersStore.currentUserId) {
    return false;
  }
  if (usersStore.currentUserId !== post.authorId) {
    return false;
  }

  return true;
});
</script>

<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-two-thirds">
      <RouterLink
          v-if="canEdit"
          class="is-link button is-rounded"
          :to="`/posts/${post.id}/edit`"
      >
        Edit Post
      </RouterLink>
      <h1>{{ post.title }}</h1>
      <div v-html="post.html"></div>
    </div>
    <div class="column"></div>
  </div>
</template>

<style scoped>

</style>