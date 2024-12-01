<template>
  <v-container>
    <v-btn class="mb-3" to="/" variant="tonal"><v-icon><IBiChevronDoubleLeft /></v-icon> Back</v-btn>

    <h1 class="text-h4">Year {{ year }}</h1>
    <v-divider class="my-4" />

    <v-row>
      <v-col
        v-for="(day, index) in daysForYear"
        :key="`day-${index}`"
        :cols=12
        :md=3
        :sm=6
      >
        <v-card class="h-100 d-flex justify-space-between flex-column" :subtitle="day.title" variant="tonal">
          <template #title>
            <div class="d-flex justify-space-between align-center">
              <span>Day {{ index + 1 }}</span>
              <span>
                <IBiStarFill v-if="day.partOne" class="ms-1 text-star" />
                <IBiStar v-else class="ms-1 text-disabled" />
                <IBiStarFill v-if="day.partTwo" class="ms-1 text-star" />
                <IBiStar v-else class="ms-1 text-disabled" />
              </span>
            </div>
          </template>
          <v-card-text>
            <v-tooltip
              v-if="day.isVisual"
              open-on-click
              open-on-focus
              text="This task has a visual representation of the result."
            >
              <template #activator="{ props }">
                <IBiEasel2Fill class="me-2" v-bind="props" />
              </template>
            </v-tooltip>
            <template v-if="day.warnings">
              <v-tooltip
                v-for="(warning, wIndex) in day.warnings"
                :key="`warning-${wIndex}`"
                open-on-click
                open-on-focus
                :text="warning"
              >
                <template #activator="{ props }">
                  <IBiExclamationTriangleFill class="me-2 text-warning" v-bind="props" />
                </template>
              </v-tooltip>
            </template>
          </v-card-text>
          <v-card-actions class="d-flex justify-space-between">
            <v-btn :to="`${year}/${index + 1}`">View</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router'
  import { Day, solvedDays } from '@/plugins/days'

  const route = useRoute()
  // @ts-ignore
  const year = ref<string>(route.params.year || '')

  const daysForYear: ComputedRef<Day[] | undefined> = computed(() => {
    if (year.value) {
      return solvedDays.get(+year.value)
    } else {
      return undefined
    }
  })
</script>

<style>
</style>
