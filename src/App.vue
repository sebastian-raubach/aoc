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

.markdown strong, .markdown b {
  font-weight: 500;
}

.v-theme--light strong, .v-theme--light b {
  font-weight: 400;
}

.v-theme--dark .markdown strong, .markdown b {
  text-shadow: 0 0 3px #ccc;
}

.v-theme--light .markdown strong, .markdown b {
  text-shadow: 0 0 2px #333;
}

.markdown pre strong, .markdown pre b {
  text-shadow: 0 0 3px #FD7272;
}

.v-theme--dark .markdown strong code, .v-theme--dark .markdown b code {
  font-weight: 800;
}

a {
  color: rgba(var(--v-theme-primary), var(--v-high-emphasis-opacity));
}
</style>
