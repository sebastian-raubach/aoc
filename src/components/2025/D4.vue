<template>
  <V4
    v-if="solutionTwo.length > 0"
    :grid="initialGrid"
    :height="height"
    :p-one="solutionOne"
    :p-two="solutionTwo"
    :width="width"
  />
</template>

<script lang="ts" setup>
  import V4 from '@/components/2025/V4.vue'
  import { difference } from '@/plugins/set'

  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])
  const height = ref(0)
  const width = ref(0)
  const initialGrid = ref<string[]>([])
  const solutionOne = ref<string[]>([])
  const solutionTwo = ref<string[][]>([])

  // All neighbors
  const dirs: number[][] = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]

  const run = () => {
    if (props.input) {
      let pOne = 0
      let pTwo = 0

      const grid = new Set<string>()

      // Parse the input into a `row|column` string set, only remember the "@" symbols
      props.input.forEach((s: string, row: number) => {
        const parts = s.split('')
        height.value = Math.max(height.value, row)

        return parts.forEach((p, column) => {
          width.value = Math.max(width.value, column)
          if (p === '@') {
            grid.add(`${row}|${column}`)
          }
        })
      })

      // Calculate solution for part one and remember for drawing
      initialGrid.value = [...grid]
      const pOneGrid = new Set<string>(grid)
      pOne = reduce(pOneGrid)
      solutionOne.value = [...difference<string>(new Set<string>(initialGrid.value), pOneGrid)]

      // Part two is just the same thing repeated until no cell gets removed anymore
      const states: string[][] = [[...grid]]
      let count = 0
      do {
        count = reduce(grid)
        pTwo += count

        solutionTwo.value.push([...difference<string>(new Set<string>(states[states.length - 1]), grid)])
        states.push([...grid])
      } while (count > 0)

      emit('onFinished', pOne, pTwo)
    }
  }

  function reduce (grid: Set<string>) {
    // Take a copy of the current state
    const reference = new Set<string>(grid)
    let count = 0
    grid.forEach(g => {
      const [r, c] = g.split('|').map(Number)
      // Check the neighbor count
      const neighbors = dirs.map(d => reference.has(`${r + d[0]}|${c + d[1]}`)).filter(Boolean).length

      if (neighbors < 4) {
        // If less than 4, remove from grid and increment counter
        count++
        grid.delete(g)
      }
    })

    return count
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
