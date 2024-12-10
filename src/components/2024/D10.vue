<template>
  <V10 v-if="finished" :grid="grid" :paths="trailPaths" />
</template>

<script lang="ts" setup>
  import V10 from '@/components/2024/V10.vue'
  import { Position2d } from '@/plugins/types/Position2d'

  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  const finished = ref<boolean>(false)

  // The number grid
  let grid: number[][]
  // All possible directions to check
  const neighbors = [[-1, 0], [1, 0], [0, -1], [0, 1]]
  // Remember goals reached from trail heads
  const trailheadMap: Map<string, Set<string>> = new Map()
  // Remember distinct paths reaching goals from trail heads
  const trailPaths: Map<string, Set<string>> = new Map()

  const dfs = (curr: Position2d, path: string, key: string) => {
    if (grid[curr.y][curr.x] === 9) {
      // We found a valid path, remember goal and path
      trailheadMap.get(key)?.add(`${curr.x}|${curr.y}`)
      trailPaths.get(key)?.add(path += `${curr.x}|${curr.y}_`)
      return
    }

    neighbors.forEach(n => {
      // Check neighbors
      const next = { x: curr.x + n[0], y: curr.y + n[1] }

      // If valid
      if (next.x >= 0 && next.x < grid[0].length && next.y >= 0 && next.y < grid.length && (grid[next.y][next.x] - grid[curr.y][curr.x]) === 1) {
        dfs(next, path + `${curr.x}|${curr.y}_`, key)
      }
    })
  }

  const run = () => {
    if (props.input) {
      grid = props.input.map(r => r.split('').map(Number))

      // Find all trail heads
      const trailheads: Position2d[] = []
      grid.forEach((r, y) => r.forEach((c, x) => c === 0 ? trailheads.push({ x, y }) : null))

      let pOne = 0
      let pTwo = 0

      // Starting from each trail head
      trailheads.forEach(t => {
        // Init
        const key = `${t.x}|${t.y}`
        trailheadMap.set(key, new Set())
        trailPaths.set(key, new Set())

        // Search using DFS
        dfs(t, '', key)

        // Increment results
        pOne += trailheadMap.get(key)?.size || 0
        pTwo += trailPaths.get(key)?.size || 0

        console.log(trailPaths)
      })

      emit('onFinished', pOne, pTwo)

      nextTick(() => {
        finished.value = true
      })
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
