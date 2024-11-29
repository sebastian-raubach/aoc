<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  //
</script>

<style>
ul {
  margin-left: 2em;
}
p {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

pre {
  color: #FD7272;
  margin-top: 0;
  margin-bottom: 1rem;
  overflow: auto;
  -ms-overflow-style: scrollbar;
}

a {
  color: rgba(var(--v-theme-primary), var(--v-high-emphasis-opacity));
}
</style>
