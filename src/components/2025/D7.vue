<template>
  <V7
    v-if="vizProps"
    v-bind="vizProps"
  />
</template>

<script lang="ts" setup>
  import { Position2d } from '@/plugins/types/Position2d'
  import memoize from 'micro-memoize'
  import { VizProps } from './V7.vue'

  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  let memo: (x: number, y: number, splitters: Set<string>, height: number) => number

  const vizProps = ref<VizProps>()

  const run = () => {
    if (props.input) {
      let pOne = 0
      let pTwo = 0

      // Remember starting position
      const start: Position2d = { x: 0, y: 0 }
      // Remember where splitters are located
      const splitters = new Set<string>()
      // Height of the grid
      const height = props.input.length

      props.input.forEach((s: string, y: number) => {
        // Split row into characters
        s.split('').forEach((c: string, x: number) => {
          if (c === 'S') {
            // Remember start
            start.x = x
            start.y = y
          } else if (c === '^') {
            // Add splitter
            splitters.add(`${x}|${y}`)
          }
        })
      })

      const result = solvePartOne(start, splitters, height)
      pOne = result.splittersHit.size

      // Use memoization for part two
      memo = memoize(quantum, { maxSize: Number.MAX_VALUE })
      pTwo = memo(start.x, start.y + 1, splitters, height)

      emit('onFinished', pOne, pTwo)

      vizProps.value = {
        height,
        width: props.input[0].length,
        splitters,
        visitedSplitters: result.splittersHit,
        start,
        visited: result.total,
      }
    }
  }

  function solvePartOne (start: Position2d, splitters: Set<string>, height: number) {
    // Remember all cells visited for visualization
    const total = new Set<string>()
    // All splitters that have been hit
    const splittersHit = new Set<string>()
    // Currently active cells
    let active = new Set<string>()
    active.add(`${start.x}|${start.y + 1}`)

    // While we still have active cells to process
    while (active.size > 0) {
      const next = new Set<string>()
      active.forEach(a => {
        // Mark as visited
        total.add(a)

        const [x, y] = a.split('|').map(Number)

        if (splitters.has(a)) {
          // If it's a splitter, remember it was visited and add the cell to the left and right to the active cells
          splittersHit.add(a)
          next.add(`${x - 1}|${y}`)
          next.add(`${x + 1}|${y}`)
        } else if (y < height) {
          // If no splitter, just add the one below
          next.add(`${x}|${y + 1}`)
        }
      })

      // Set new active cells
      active = next
    }

    // Return the number of splitters that have been visited
    return { splittersHit, total }
  }

  function quantum (x: number, y: number, splitters: Set<string>, height: number) {
    if (y === height) {
      // If we reached the bottom, this is a valid path, so return 1
      return 1
    }
    if (splitters.has(`${x}|${y + 1}`)) {
      // If it's a splitter, sum up the number of possible paths from each of the neighbor cells
      return memo(x - 1, y + 1, splitters, height) + memo(x + 1, y + 1, splitters, height)
    } else {
      // Else, just keep searching
      return memo(x, y + 1, splitters, height)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
