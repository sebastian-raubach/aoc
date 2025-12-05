<template>
  <span />
</template>

<script lang="ts" setup>
  import { getId } from '@/plugins/id'

  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  interface Range {
    start: number
    end: number
    id: string
  }

  const run = () => {
    if (props.input) {
      let isIngredients = false
      // Remember the ranges (start-end) and the ingredient ids
      let ranges: Range[] = []
      const ingredients: number[] = []

      props.input.forEach((s: string) => {
        // Encounter an empty row => swap to ingredients
        if (s === '') {
          isIngredients = true
        } else {
          if (isIngredients) {
            ingredients.push(+s)
          } else {
            const [start, end] = s.split('-').map(Number)
            ranges.push({
              start,
              end,
              // Assign a unique ID. This makes identifying ranges easier in the end
              id: getId(),
            })
          }
        }
      })

      // Part one is easy, just filter down to ingredients that are in ANY/SOME of the ranges
      const pOne = ingredients.filter(i => ranges.some(r => r.start <= i && r.end >= i)).length

      // For part 2, we will incrementally grow/merge overlapping regions until there are no more overlaps
      // Then we can calculate the number of valid ids in those regions
      let changed = true
      while (changed) {
        // Delete ranges that have been merged into others
        const toDelete = new Set<string>()
        ranges.forEach(r1 => {
          // If this one has been marked for deletion, skip
          if (toDelete.has(r1.id)) {
            return
          }
          // Find overlapping ranges (that aren't the same range)
          ranges.filter(r2 => r1.id !== r2.id && !(r1.end < r2.start || r2.end < r1.start))
            .forEach(r2 => {
              // Extend the first range
              r1.start = Math.min(r1.start, r2.start)
              r1.end = Math.max(r1.end, r2.end)
              // Mark the second for deletion
              toDelete.add(r2.id)
            })
        })

        // Update valid ranges
        ranges = ranges.filter(r => !toDelete.has(r.id))
        // Check if we need to keep going
        changed = toDelete.size > 0
      }

      // Part 2 is the sum of all range lengths
      const pTwo = ranges.map(r => r.end - r.start + 1).reduce((a, b) => a + b, 0)

      emit('onFinished', pOne, pTwo)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
