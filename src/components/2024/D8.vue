<template>
  <V8
    :antennas="antennas"
    :antinodes-one="antinodesOne"
    :antinodes-two="antinodesTwo"
    :height="height"
    :width="width"
  />
</template>

<script lang="ts" setup>
  import { Position2d } from '@/plugins/types/Position2d'
  import V8 from '@/components/2024/V8.vue'

  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  let width: number
  let height: number
  // Antennas mapped from symbol to positions
  const antennas: Map<string, Position2d[]> = new Map()
  // Antinode positions
  const antinodes: Set<string> = new Set()
  // Keep track for plotting
  const antinodesOne: Map<string, Set<string>> = new Map()
  const antinodesTwo: Map<string, Set<string>> = new Map()

  const solve = (points: Position2d[], key: string, depth: number) => {
    // Pairwise comparison of antennas
    for (let i = 0; i < points.length; i++) {
      for (let j = 1; j < points.length; j++) {
        if (i === j) {
          // Skip self comparison
          continue
        }

        // Get antennas, calculate delta per dimension
        const a = points[i]
        const b = points[j]
        const deltaX = Math.abs(a.x - b.x)
        const deltaY = Math.abs(a.y - b.y)

        // Iterate up until a certain depth (how many repeats)
        for (let k = depth > 1 ? 0 : 1; k <= depth; k++) {
          // Copy of antennas
          const ta = { x: a.x, y: a.y }
          const tb = { x: b.x, y: b.y }

          // Substract/add delta to smaller/larger antenna based on x
          if (ta.x < tb.x) {
            ta.x -= deltaX * k
            tb.x += deltaX * k
          } else if (ta.x > tb.x) {
            ta.x += deltaX * k
            tb.x -= deltaX * k
          }
          // Substract/add delta to smaller/larger antenna based on y
          if (ta.y < tb.y) {
            ta.y -= deltaY * k
            tb.y += deltaY * k
          } else if (ta.y > tb.y) {
            ta.y += deltaY * k
            tb.y -= deltaY * k
          }

          // If within bounds, remember
          if (ta.x >= 0 && ta.x < width && ta.y >= 0 && ta.y < height) {
            antinodes.add(`${ta.x}|${ta.y}`)

            // Visualization stuff
            antinodesTwo.get(key)?.add(`${ta.x}|${ta.y}`)
            if (depth === 1) {
              antinodesOne.get(key)?.add(`${ta.x}|${ta.y}`)
            }
          }

          // If within bounds, remember
          if (tb.x >= 0 && tb.x < width && tb.y >= 0 && tb.y < height) {
            antinodes.add(`${tb.x}|${tb.y}`)

            // Visualization stuff
            antinodesTwo.get(key)?.add(`${tb.x}|${tb.y}`)
            if (depth === 1) {
              antinodesOne.get(key)?.add(`${tb.x}|${tb.y}`)
            }
          }
        }
      }
    }
  }

  const run = () => {
    if (props.input) {
      height = props.input.length
      props.input.map((r: string, y: number) => {
        const parts = r.split('')
        width = parts.length

        // For each antenna
        parts.forEach((c: string, x: number) => {
          if (c !== '.') {
            // Check if an array already exists for this symbol
            const a = antennas.get(c) || []
            // Add
            a.push({ x, y })
            antennas.set(c, a)

            // Visualization stuff
            antinodesOne.set(c, new Set<string>())
            antinodesTwo.set(c, new Set<string>())
          }
        })

        return parts
      })

      // Part 1: Solve for distance of 1 ("outside" of the pair of antennas)
      antennas.forEach((value: Position2d[], key: string) => solve(value, key, 1))
      const pOne = antinodes.size
      // Part 2: Extend distance to max of width and height.
      // This could massively be optimised by only calculating up to a level based on the position and delta between the two points
      antennas.forEach((value: Position2d[], key: string) => solve(value, key, Math.max(width, height)))
      const pTwo = antinodes.size

      emit('onFinished', pOne, pTwo)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
