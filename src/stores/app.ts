// Utilities
import { defineStore } from 'pinia'

export const coreStore = defineStore('app', {
  state: () => ({
    githubRepo: 'https://github.com/sebastian-raubach/aoc/',
    theme: 'system' as string,
  }),
  actions: {
    setTheme (newTheme: string) {
      this.theme = newTheme
    },
  },
  persist: {
    key: 'aoc',
  },
})
