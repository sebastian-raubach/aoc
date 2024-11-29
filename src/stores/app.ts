// Utilities
import { defineStore } from 'pinia'

export const coreStore = defineStore('app', {
  state: () => ({
    currentDay: new Map([
      [2015, 18],
      [2016, 7],
      [2017, 25],
      [2018, 23],
      [2020, 25],
      [2021, 25],
      [2022, 23],
      [2023, 23],
    ]) as Map<number, number>,
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
