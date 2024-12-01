<template>
  <v-app class="main-application">
    <v-main>
      <v-app-bar color="transparent" :elevation="0">
        <v-app-bar-title style="cursor: pointer" @click="router.push('/')">Advent of Code</v-app-bar-title>
        <v-spacer></v-spacer>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-icon>
                <IBiMoonStars v-if="store.theme === 'dark'" />
                <IBiSunFill v-else-if="store.theme === 'light'" />
                <IBiCircleHalf v-else />
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-subheader class="text-high-emphasis text-uppercase font-weight-black">Theme</v-list-subheader>
            <v-list-item @click="store.setTheme('light')" :active="store.theme === 'light'">
              <template #prepend>
                <v-icon><IBiSunFill /></v-icon>
              </template>
              <v-list-item-title>Light</v-list-item-title>
            </v-list-item>
            <v-list-item @click="store.setTheme('dark')" :active="store.theme === 'dark'">
              <template #prepend>
                <v-icon><IBiMoonStars /></v-icon>
              </template>
              <v-list-item-title>Dark</v-list-item-title>
            </v-list-item>
            <v-list-item @click="store.setTheme('system')" :active="store.theme === 'system'">
              <template #prepend>
                <v-icon><IBiCircleHalf /></v-icon>
              </template>
              <v-list-item-title>System</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <router-view class="h-100" />

      <v-footer>
        <v-container class="py-0 d-flex">
          <v-btn
            class="ms-auto"
            :href="store.githubRepo"
            size="small"
            variant="plain"
          ><v-icon><IBiGithub /></v-icon></v-btn>
        </v-container>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import { coreStore } from '@/stores/app'
  import { useTheme } from 'vuetify'
  const theme = useTheme()
  const store = coreStore()
  const router = useRouter()
  const systemTheme = ref('dark')

  // Listen for theme changes in the store
  let media: MediaQueryList
  watch(() => store.theme, (value: string) => {
    if (value === 'system') {
      // If currently system, get prefered scheme and listen to changes
      media = window.matchMedia('(prefers-color-scheme: dark)')
      media.addEventListener('change', onThemeChange)
      onThemeChange()
    } else if (media) {
      // Else, remove listener
      media.removeEventListener('change', onThemeChange)
    }
  }, { immediate: true })
  function onThemeChange () {
    systemTheme.value = media!.matches ? 'dark' : 'light'
  }

  // Listen for changes to the theme and update Vuetify global theme
  watchEffect(() => {
    theme.global.name.value = store.theme === 'system' ? systemTheme.value : store.theme
  })
</script>

<style scoped>
.main-application {
  background-repeat: repeat;
}

.main-application.v-theme--dark {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23b33771' fill-opacity='0.25' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
}

.main-application.v-theme--light {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%236d214f' fill-opacity='0.25' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
}
</style>
