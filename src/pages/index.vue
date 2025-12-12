<template>
  <v-container>
    <v-responsive class="align-centerfill-height mx-auto" max-width="min(100%, 900px)">
      <v-img class="mb-4" height="300" src="@/assets/logo.svg" />

      <div class="text-center">
        <h1 class="text-h2 title">ADVENT OF CODE</h1>
      </div>

      <div class="py-4" />
    </v-responsive>

    <h1 class="text-h4">Years</h1>
    <v-divider class="my-4" />

    <v-row>
      <v-col
        v-for="[year, yearConfig] in solvedDays"
        :key="`year-${year}`"
        :cols="12"
        :md="3"
        :sm="6"
      >
        <v-card class="text-center" no variant="tonal">
          <v-card-title class="text-h3 my-0 py-0">{{ year }}</v-card-title>
          <v-progress-linear class="christmas-gradient" :max="yearConfig.totalStars" :model-value="yearConfig.days.reduce((prev: number, day: Day) => prev + (day.stars || 0), 0)" stream />
          <v-card-actions class="d-flex justify-space-between">
            <v-btn :to="`${year}`">View</v-btn>
            <v-btn disabled>{{ yearConfig.days.reduce((prev: number, day: Day) => prev + (day.stars || 0), 0) }}/{{ yearConfig.totalStars }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="my-4" />

    <p class="my-5 text-center">Welcome to the page where I host my solutions to the <a href="https://adventofcode.com/">Advent of Code</a>. Please note that this is not the official Advent of Code page, it's just one of my side-projects.</p>
  </v-container>
</template>

<script lang="ts" setup>
  import { Day, solvedDays, Year } from '@/plugins/days'

  solvedDays.forEach((yearConfig: Year, year: number) => {
    yearConfig.days.forEach((d: Day) => {
      d.stars = (d.partOne ? 1 : 0) + (d.partTwo ? 1 : 0)
    })
  })
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Doto:wght@100..900&display=swap');

.title {
  font-family: "Doto", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: "ROND" 0;
}

.christmas-gradient .v-progress-linear__determinate {
  background: rgb(249,127,81);
  background: linear-gradient(270deg, rgba(249,127,81,1) 0%, rgba(109,33,79,1) 100%);
}
.christmas-gradient.v-progress-linear--active .v-progress-linear__stream {
  animation-play-state: paused;
}
.v-theme--light .christmas-gradient .v-progress-linear__determinate {
  background: rgb(109,33,79,1);
  background: linear-gradient(90deg, rgba(249,127,81,1) 0%, rgba(109,33,79,1) 100%);
}
</style>
