<template>
  <V6
    :grid="grid"
    :height="height"
    :obstacles="obstacles"
    :path="path"
    :start="start"
    :width="width"
  />
</template>

<script lang="ts" setup>
  import { Position2d } from '@/plugins/types/Position2d'
  import V6 from '@/components/2024/V6.vue'

  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  const grid: Set<string> = new Set()
  const visited: Set<string> = new Set()
  const path: Position2d[] = []
  const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]]
  const obstacles: Position2d[] = []

  let width: number
  let height: number
  let curDir = 0
  let start: Position2d
  let current: Position2d

  const findPath = () => {
    while (current.x >= 0 && current.x < width && current.y >= 0 && current.y < height) {
      visited.add(`${current.x}|${current.y}`)
      path.push(current)

      for (let i = 0; i < 3; i++) {
        // Find the next position.
        const next = { x: current.x + dirs[curDir][0], y: current.y + dirs[curDir][1] }

        if (grid.has(`${next.x}|${next.y}`)) {
          curDir = (curDir + 1) % dirs.length
        } else {
          current = next
          break
        }
      }
    }

    return visited.size
  }

  const findLoop = () => {
    current = start
    curDir = 0
    const loopPath: Set<string> = new Set()

    while (current.x >= 0 && current.x < width && current.y >= 0 && current.y < height) {
      if (loopPath.has(`${current.x}|${current.y}|${curDir}`)) {
        // We've been here before facing the same way => loop
        return true
      }

      // Remember we've been here facing a certain way
      loopPath.add(`${current.x}|${current.y}|${curDir}`)

      for (let i = 0; i < 3; i++) {
        // Find the next position.
        const next = { x: current.x + dirs[curDir][0], y: current.y + dirs[curDir][1] }

        // If there is an obstacle
        if (grid.has(`${next.x}|${next.y}`)) {
          curDir = (curDir + 1) % dirs.length
        } else {
          current = next

          break
        }
      }
    }

    return false
  }

  const getObstacles = () => {
    const os: Set<string> = new Set()

    for (let i = 1; i < path.length; i++) {
      const newObstacle = path[i]

      if (newObstacle.x === start.x && newObstacle.y === start.y) {
        continue
      }

      grid.add(`${newObstacle.x}|${newObstacle.y}`)

      const hasLoop = findLoop()

      grid.delete(`${newObstacle.x}|${newObstacle.y}`)

      if (hasLoop) {
        os.add(`${path[i].x}|${path[i].y}`)
      }
    }

    os.forEach(s => {
      const [x, y] = s.split('|').map(Number) as number[]
      obstacles.push({ x, y })
    })

    return os
  }

  const run = () => {
    if (props.input) {
      height = props.input.length
      width = props.input[0].length
      props.input.forEach((r: string, y: number) => {
        r.split('').forEach((c: string, x: number) => {
          if (c === '^') {
            start = { x, y }
            current = { x, y }
          } else if (c === '#') {
            grid.add(`${x}|${y}`)
          }
        })
      })

      const pOne = findPath()
      const pTwo = getObstacles()

      emit('onFinished', pOne, pTwo.size)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
