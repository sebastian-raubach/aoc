<template>
  <V12 v-if="finished" :areas="areas" :grid="grid" />
</template>

<script lang="ts" setup>
  import { Position2d } from '@/plugins/types/Position2d'
  import V12 from '@/components/2024/V12.vue'

  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  export interface Fence {
    x: number
    y: number
    outside: number
    orientation: string
  }

  export interface Area {
    coords: Position2d[]
    fences: Fence[]
    sideCount: number
  }

  // x, y, orientation, outside
  const dirs: Fence[] = [
    { x: -1, y: 0, outside: -1, orientation: 'v' },
    { x: 1, y: 0, outside: 1, orientation: 'v' },
    { x: 0, y: -1, outside: -1, orientation: 'h' },
    { x: 0, y: 1, outside: 1, orientation: 'h' },
  ]

  const finished = ref<boolean>(false)
  const visited = new Set<String>()
  let grid: string[][]
  const areas: Area[] = []

  const bfs = (start: Position2d, letter: string): Area => {
    const area = new Set<String>()
    area.add(`${start.x}|${start.y}`)
    let queue = [start]
    const fenceSet = new Set<String>()

    while (queue.length > 0) {
      const next: Position2d[] = []
      // Iterate through queue
      queue.forEach(curr => {
        // Mark visited
        visited.add(`${curr.x}|${curr.y}`)
        // Check all neighbors
        dirs.forEach(d => {
          const p = { x: curr.x + d.x, y: curr.y + d.y }

          if (p.x < 0 || p.y < 0 || p.x >= grid[0].length || p.y >= grid.length) {
            // We're at the edge
            fenceSet.add(`${curr.x + d.x * 0.5}|${curr.y + d.y * 0.5}|${d.orientation}|${d.outside}`)
          } else if (grid[p.y][p.x] === letter) {
            // We found a neighbor that belongs to the same type
            if (!visited.has(`${p.x}|${p.y}`) && !next.some(q => q.x === p.x && q.y === p.y)) {
              next.push(p)
              area.add(`${p.x}|${p.y}`)
            }
          } else {
            // We've got a neighbor who isn't the same plant
            fenceSet.add(`${curr.x + d.x * 0.5}|${curr.y + d.y * 0.5}|${d.orientation}|${d.outside}`)
          }
        })
      })

      queue = next
    }

    const fences: Fence[] = [...fenceSet].map(f => {
      const parts = f.split('|')

      return {
        x: +parts[0],
        y: +parts[1],
        orientation: parts[2],
        outside: +parts[3],
      }
    })

    // First, check vertical fences, sort by x, then y
    const vertical = fences.concat().filter(f => f.orientation === 'v').sort((a, b) => (a.x - b.x) || (a.y - b.y))
    let count = 1
    for (let i = 1; i < vertical.length; i++) {
      if (vertical[i].x === vertical[i - 1].x) {
        // Same column, check distance and outside
        if (Math.abs(vertical[i].y - vertical[i - 1].y) !== 1 || vertical[i].outside !== vertical[i - 1].outside) {
          count++
        }
      } else {
        // Different column, not same fence
        count++
      }
    }

    // Then, check horizontal fences, sort by y, then x
    const horizontal = fences.concat().filter(f => f.orientation === 'h').sort((a, b) => (a.y - b.y) || (a.x - b.x))
    count++
    for (let i = 1; i < horizontal.length; i++) {
      if (horizontal[i].y === horizontal[i - 1].y) {
        // Same column, check distance and outside
        if (Math.abs(horizontal[i].x - horizontal[i - 1].x) !== 1 || horizontal[i].outside !== horizontal[i - 1].outside) {
          count++
        }
      } else {
        // Different column, not same fence
        count++
      }
    }

    return {
      coords: [...area].map(a => {
        const [x, y] = a.split('|').map(Number)
        return { x, y }
      }),
      fences,
      sideCount: count,
    }
  }

  const run = () => {
    if (props.input) {
      grid = props.input.map(r => r.split(''))

      let pOne = 0
      let pTwo = 0
      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
          if (!visited.has(`${x}|${y}`)) {
            const area: Area = bfs({ x, y }, grid[y][x])
            pOne += area.coords.length * area.fences.length
            pTwo += area.coords.length * area.sideCount
            areas.push(area)
          }
        }
      }

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
