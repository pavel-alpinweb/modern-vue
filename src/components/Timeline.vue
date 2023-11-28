<script setup lang="ts">
import { ref } from "vue";
import { Post, today, thisWeek, thisMonth } from "../posts.ts";
import {DateTime} from "luxon";

const periods = ["Today", "This Week", "This Month"] as const;

type Period = typeof periods[number];

const selectedPeriod = ref<Period>("Today");

function selectPeriod (period: Period) {
  selectedPeriod.value = period;
}

const posts =[
    today,
    thisWeek,
    thisMonth,
].map(post => {
  return {
    ...post,
    created: DateTime.fromISO(post.created)
  };
});
</script>

<template>
  <nav class="is-primary panel timeline">
    <span class="panel-tabs">
      <a
          v-for="period in periods"
          :key="period"
          :class="{ 'is-active': period === selectedPeriod }"
          @click="selectPeriod(period)"
          href="#"
      >
        {{ period }}
      </a>
    </span>

    <a v-for="post of posts" :key="post.id" class="panel-block">
      <a>{{ post.title }}</a>
      <div>{{ post.created.toFormat("d MMM") }}</div>
    </a>
  </nav>
</template>

<style scoped>

</style>