<script setup lang="ts">
import { ref, computed } from "vue";
import { TimelinePost, today, thisWeek, thisMonth } from "../posts.ts";
import {DateTime} from "luxon";
import TimelineItem from "./TimelineItem.vue";

const periods = ["Today", "This Week", "This Month"] as const;

type Period = typeof periods[number];

const selectedPeriod = ref<Period>("Today");

function selectPeriod (period: Period) {
  selectedPeriod.value = period;
}

const posts = computed<TimelinePost[]>(() => {
  return [
    today,
    thisWeek,
    thisMonth,
  ].map(post => {
    return {
      ...post,
      created: DateTime.fromISO(post.created)
    };
  }).filter(post => {
    if (selectedPeriod.value === "Today") {
      return post.created >= DateTime.now().minus({ day: 1 });
    }

    if (selectedPeriod.value === "This Week") {
      return post.created >= DateTime.now().minus({ week: 1 });
    }

    if (selectedPeriod.value === "This Month") {
      return post.created >= DateTime.now().minus({ week: 4 });
    }

    return post;
  });
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
    <TimelineItem
        v-for="post in posts"
        :key="period"
        :post="post"
    >
    </TimelineItem>
  </nav>
</template>

<style scoped>

</style>