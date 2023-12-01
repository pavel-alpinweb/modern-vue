<script setup lang="ts">
import PostWriter from "../components/PostWriter.vue";
import {TimelinePost} from "../posts.ts";
import {DateTime} from "luxon";

const post: TimelinePost = {
  id: "-1",
  title: "Post title",
  created: DateTime.now(),
  markdown: '## Title',
  html: '<h2>Title</h2>',
};
</script>

<template>
  New Post
  <PostWriter :post="post"/>
</template>

<style scoped>

</style>