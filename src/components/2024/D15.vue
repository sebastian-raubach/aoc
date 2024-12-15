<template>
  <V15
    v-if="finished"
    :height="height"
    :part-one="pOneGrids"
    :part-two="pTwoGrids"
    :width="width"
  />
</template>

<script lang="ts" setup>
  import V15 from '@/components/2024/V15.vue'
  import { Position2d } from '@/plugins/types/Position2d'

  const props = defineProps<{
    input?: string[],
  }>()

  interface Box {
    parts: Position2d[]
  }

  interface Boxes {
    [key: string]: Box
  }

  interface DirMap {
    [key: string]: number[]
  }

  export interface Config {
    boxes: Set<string>
    walls: Set<string>
    robot: string
  }

  const finished = ref<boolean>(false)

  const dirs: DirMap = {
    '>': [1, 0],
    '<': [-1, 0],
    '^': [0, -1],
    v: [0, 1],
  }

  const emit = defineEmits(['onFinished'])

  // Stuff for plotting
  const pOneGrids: Config[] = []
  const pTwoGrids: Config[] = []

  let width = 0
  let height = 0
  let boxes: Boxes = {}
  let walls: Set<string> = new Set()

  const instructions: string[] = []
  const robot: Position2d = { x: 0, y: 0 }

  const push = (next: Position2d, dir: number[], key: string) => {
    const toMove: Box[] = []
    const handled = new Set<string>()
    // There's another box
    toMove.push(boxes[key])
    boxes[key].parts.forEach(p => handled.add(`${p.x}|${p.y}`))
    const queue: Position2d[] = [boxes[key].parts[0], boxes[key].parts[1]]
    while (queue.length > 0) {
      const curr = queue.pop()
      if (curr) {
        next.x = curr.x + dir[0]
        next.y = curr.y + dir[1]
        key = `${next.x}|${next.y}`
        if (walls.has(key)) {
          // Do nothing, one of the boxes has a part that's hitting a wall
          return
        } else if (boxes[key]) {
          // There's another box
          boxes[key].parts.forEach((p, i) => {
            // Check if we've handled this part yet
            if (!handled.has(`${p.x}|${p.y}`)) {
              handled.add(`${p.x}|${p.y}`)
              if (i === 0) {
                toMove.push(boxes[key])
              }

              if (!queue.some(q => q.x === p.x && q.y === p.y)) {
                // Add the new part to the queue if it's not already on there
                queue.push({ x: p.x, y: p.y })
              }
            }
          })
        }
      }
    }

    // None of the parts has hit a wall, so we can push all boxes
    toMove.forEach(b => {
      b.parts.forEach(p => {
        delete boxes[`${p.x}|${p.y}`]
      })
    })
    toMove.forEach(b => {
      b.parts.forEach(p => {
        p.x += dir[0]
        p.y += dir[1]
      })

      b.parts.forEach(p => {
        boxes[`${p.x}|${p.y}`] = b
      })
    })
    // Move the robot
    robot.x += dir[0]
    robot.y += dir[1]
  }

  const parse = (pTwo: boolean) => {
    boxes = {}
    walls = new Set()
    let isGrid = true
    const factor = pTwo ? 2 : 1
    height = 0
    if (props.input) {
      props.input.forEach((s: string) => {
        if (s.length < 1) {
          isGrid = false
        } else if (isGrid) {
          const parts = s.split('')
          parts.forEach((c: string, x: number) => {
            if (c === '@') {
              robot.x = x * factor
              robot.y = height
            } else if (c === 'O') {
              const box = { parts: pTwo ? [{ x: x * factor, y: height }, { x: x * factor + 1, y: height }] : [{ x: x * factor, y: height }] }

              boxes[`${x * factor}|${height}`] = box
              if (pTwo) {
                // Double up the box
                boxes[`${x * factor + 1}|${height}`] = box
              }
            } else if (c === '#') {
              walls.add(`${x * factor}|${height}`)

              if (pTwo) {
                // Double up the wall
                walls.add(`${x * factor + 1}|${height}`)
              }
            }
          })

          width = parts.length * factor
          height++
        } else {
          s.split('').forEach(c => instructions.push(c))
        }
      })
    }
  }

  const runPart = (pTwo: boolean) => {
    parse(pTwo)

    instructions.forEach((inst: string, index: number) => {
      const dir = dirs[inst]
      const next = { x: robot.x + dir[0], y: robot.y + dir[1] }
      const key = `${next.x}|${next.y}`

      if (walls.has(key)) {
        // Do nothing, there's a wall
      } else if (boxes[key]) {
        push(next, dir, key)
      } else {
        // Free space, move robot
        robot.x += dir[0]
        robot.y += dir[1]
      }

      if (index % 10 === 0 || index === instructions.length - 1) {
        const w = new Set<string>()
        const b = new Set<string>()
        const r = `${robot.x}|${robot.y}`

        walls.forEach(wall => {
          w.add(wall)
        })

        Object.keys(boxes).forEach(s => {
          const box: Box = boxes[s]

          box.parts.forEach(p => {
            b.add(`${p.x}|${p.y}`)
          })
        })

        if (pTwo) {
          pTwoGrids.push({
            robot: r,
            walls: w,
            boxes: b,
          })
        } else {
          pOneGrids.push({
            robot: r,
            walls: w,
            boxes: b,
          })
        }
      }
    })

    let result = 0

    const distinct: Set<string> = new Set()
    Object.keys(boxes).forEach(s => {
      distinct.add(`${boxes[s].parts[0].x}|${boxes[s].parts[0].y}`)
    })

    distinct.forEach(d => {
      const [x, y] = d.split('|').map(Number)
      result += y * 100 + x
    })

    return result
  }

  const run = () => {
    if (props.input) {
      const pOne = runPart(false)
      const pTwo = runPart(true)

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
