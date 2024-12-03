<template>
  <V16
    v-if="finished"
    :grid="grid"
    :height="height"
    :path="path"
    :width="width"
  />
</template>

<script lang="ts" setup>
  import { Position2d } from '@/plugins/types/Position2d'
  import V16 from '@/components/2023/V16.vue'

  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  interface DirectionMap {
    [key: string]: Function
  }

  export interface GridMap {
    [key: string]: string
  }

  export interface Location {
    pos: Position2d
    delta: Position2d
  }

  const height = ref<number>(0)
  const width = ref<number>(0)
  const grid = ref<GridMap>({})
  const path = ref<Location[][]>([])
  const finished = ref<boolean>(false)

  const directions: DirectionMap = {
    '.': (curr: Location) => {
      return [{
        pos: { x: curr.pos.x + curr.delta.x, y: curr.pos.y + curr.delta.y },
        delta: curr.delta,
      }]
    },
    '/': (curr: Location) => {
      const delta = { x: -curr.delta.y, y: -curr.delta.x }

      return [{
        pos: { x: curr.pos.x + delta.x, y: curr.pos.y + delta.y },
        delta,
      }]
    },
    '\\': (curr: Location) => {
      const delta = { x: curr.delta.y, y: curr.delta.x }

      return [{
        pos: { x: curr.pos.x + delta.x, y: curr.pos.y + delta.y },
        delta,
      }]
    },
    '-': (curr: Location) => {
      if (curr.delta.x !== 0) {
        return [{
          pos: { x: curr.pos.x + curr.delta.x, y: curr.pos.y + curr.delta.y },
          delta: curr.delta,
        }]
      } else {
        return [{
          pos: { x: curr.pos.x - 1, y: curr.pos.y },
          delta: { x: -1, y: 0 },
        }, {
          pos: { x: curr.pos.x + 1, y: curr.pos.y },
          delta: { x: 1, y: 0 },
        }]
      }
    },
    '|': (curr: Location) => {
      if (curr.delta.y !== 0) {
        return [{
          pos: { x: curr.pos.x + curr.delta.x, y: curr.pos.y + curr.delta.y },
          delta: curr.delta,
        }]
      } else {
        return [{
          pos: { x: curr.pos.x, y: curr.pos.y - 1 },
          delta: { x: 0, y: -1 },
        }, {
          pos: { x: curr.pos.x, y: curr.pos.y + 1 },
          delta: { x: 0, y: 1 },
        }]
      }
    },
  }

  const solve = (start: Position2d, delta: Position2d, recordPath = false) => {
    let queue: Location[] = [{
      pos: start,
      delta,
    }]
    const visited = new Set()
    const energized = new Set()
    const tempPath: Location[][] = []

    while (queue.length > 0) {
      if (recordPath) {
        tempPath.push(queue.concat())
      }
      const nextSteps: Location[] = []

      queue.forEach(q => {
        const cell = grid.value[`${q.pos.x}|${q.pos.y}`]

        visited.add(`${q.pos.x}|${q.pos.y}|${q.delta.x}|${q.delta.y}`)
        energized.add(`${q.pos.x}|${q.pos.y}`)

        const next = directions[cell](q).filter((n: Location) => n.pos.x >= 0 && n.pos.x < width.value && n.pos.y >= 0 && n.pos.y < height.value && !visited.has(`${n.pos.x}|${n.pos.y}|${n.delta.x}|${n.delta.y}`))

        nextSteps.push(...next)
      })

      queue = nextSteps
    }

    if (recordPath) {
      path.value = tempPath
    }

    return energized.size
  }

  const run = () => {
    if (props.input) {
      const map: GridMap = {}
      height.value = props.input.length
      width.value = 0

      props.input.forEach((i, y) => {
        const parts = i.split('')

        if (!width.value) {
          width.value = parts.length
        }

        parts.forEach((c, x) => {
          map[`${x}|${y}`] = c
        })
      })

      grid.value = map

      const pOne = solve({ x: 0, y: 0 }, { x: 1, y: 0 }, true)

      let max = 0

      for (let x = 1; x < width.value - 1; x++) {
        // Top row down
        max = Math.max(max, solve({ x, y: 0 }, { x: 0, y: 1 }))
        // Bottom row up
        max = Math.max(max, solve({ x, y: height.value - 1 }, { x: 0, y: -1 }))
      }
      for (let y = 1; y < height.value - 1; y++) {
        // Left column right
        max = Math.max(max, solve({ x: 0, y }, { x: 1, y: 0 }))
        // Right column left
        max = Math.max(max, solve({ x: 0, y: width.value - 1 }, { x: -1, y: 0 }))
      }

      // Top left corner
      max = Math.max(max, solve({ x: 0, y: 0 }, { x: 0, y: 1 }))
      max = Math.max(max, solve({ x: 0, y: 0 }, { x: 1, y: 0 }))

      // Top right corner
      max = Math.max(max, solve({ x: width.value - 1, y: 0 }, { x: 0, y: 1 }))
      max = Math.max(max, solve({ x: width.value - 1, y: 0 }, { x: -1, y: 0 }))

      // Bottom left corner
      max = Math.max(max, solve({ x: 0, y: height.value - 1 }, { x: 0, y: -1 }))
      max = Math.max(max, solve({ x: 0, y: height.value - 1 }, { x: 1, y: 0 }))

      // Bottom right corner
      max = Math.max(max, solve({ x: width.value - 1, y: height.value - 1 }, { x: 0, y: -1 }))
      max = Math.max(max, solve({ x: width.value - 1, y: height.value - 1 }, { x: -1, y: 0 }))

      const pTwo = max

      emit('onFinished', pOne, pTwo)

      finished.value = true
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
