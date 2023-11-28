<script setup lang="ts">
import {ref} from "vue";

const periods = ["Today", "This Week", "This Month"] as const;

type Period = typeof periods[number];

const selectedPeriod = ref<Period>("Today");

function selectPeriod (period: Period) {
  selectedPeriod.value = period;
}
</script>

<template>
  <nav class="is-primary panel">
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
  </nav>
</template>

<style scoped>

</style>