<script setup lang="ts">
import PostWriter from "../components/PostWriter.vue";
import {TimelinePost} from "../posts.ts";
import {DateTime} from "luxon";
import {useUsers} from "../stores/users.ts";
import {usePosts} from "../stores/posts.ts";
import {useRouter} from "vue-router";
import {Post} from "../posts.ts";

const usersStore = useUsers();
const postsStore = usePosts();
const router = useRouter();

if (!usersStore.currentUserId) {
  throw Error(`User was not found`);
}

const post: TimelinePost = {
  id: "-1",
  title: "Post title",
  authorId: usersStore.currentUserId,
  created: DateTime.now(),
  markdown: '## Title',
  html: '<h2>Title</h2>',
};

async function handleSubmit(post: Post) {
  await postsStore.createPost(post);
  router.push("/");
}
</script>

<template>
  New Post
  <PostWriter :post="post" @submit="handleSubmit"/>
</template>

<style scoped>

</style>