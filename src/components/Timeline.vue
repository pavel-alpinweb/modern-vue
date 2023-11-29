<script setup lang="ts">
import TimelineItem from "./TimelineItem.vue";
import {usePosts} from "../stores/posts.ts";
import {periods} from "../constants.ts";

const postsStore = usePosts();

await postsStore.fetchPosts();
</script>

<template>
  <nav class="is-primary panel timeline">
    <span class="panel-tabs">
      <a
          v-for="period in periods"
          :key="period"
          :class="{ 'is-active': period === postsStore.selectedPeriod }"
          @click="postsStore.setSelectedPeriod(period)"
          href="#"
      >
        {{ period }}
      </a>
    </span>
    <TimelineItem
        v-for="post in postsStore.filteredPosts"
        :key="post.id"
        :post="post"
    >
    </TimelineItem>
  </nav>
</template>

<style scoped>

</style>