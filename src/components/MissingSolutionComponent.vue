<template>
  <v-card
    title="Solution not found"
  >
    <template #subtitle>
      <span class="text-wrap">This solution has not been converted to Vue3 + TypeScript + Vite yet but exists in the <a :href="`https://sebastian-raubach.github.io/advent-of-code/#/${props.year}/${props.day}`">old version</a>.</span>
    </template>
  </v-card>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    year: string,
    day: string
  }>()
</script>

<style>

</style>
