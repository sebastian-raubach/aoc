<template>
  <V20
    v-if="finished"
    :height="height"
    :path="path"
    :s-one="shortcutsOne"
    :walls="walls"
    :width="width"
  />
</template>

<script lang="ts" setup>
  import V20 from '@/components/2024/V20.vue'
  import { Position2d } from '@/plugins/types/Position2d'

  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  export interface Shortcut {
    path: Position2d[]
  }

  const finished = ref<boolean>(false)

  let width = 0
  let height = 0
  const path: Position2d[] = []
  const shortcutsOne: Shortcut[] = []
  let shortcutsTwo: number = 0
  const start: Position2d = { x: 0, y: 0 }
  const end: Position2d = { x: 0, y: 0 }
  const walls: Set<string> = new Set()
  const dirOne = [[-1, 0], [1, 0], [0, 1], [0, -1]]
  const dirTwo = [[-2, 0], [2, 0], [0, 2], [0, -2]]

  const findPath = () => {
    const visited: Set<string> = new Set()

    let current: Position2d = start
    while (current.x !== end.x || current.y !== end.y) {
      path.push(current)
      visited.add(`${current.x}|${current.y}`)
      const next = dirOne.map(d => { return { x: current.x + d[0], y: current.y + d[1] } })
        .find(d => d.x >= 0 && d.x < width && d.y >= 0 && d.y < height && !walls.has(`${d.x}|${d.y}`) && !visited.has(`${d.x}|${d.y}`))

      if (next) {
        current = next
      }
    }

    path.push(end)

    return path
  }

  const findShortcutsOne = (minDelta: number) => {
    const pathStrings = path.map(p => `${p.x}|${p.y}`)

    path.forEach((p, i) => {
      dirTwo.forEach(d => {
        const key = `${p.x + d[0]}|${p.y + d[1]}`
        const hasToBeWall = `${p.x + d[0] / 2}|${p.y + d[1] / 2}`
        const index = pathStrings.indexOf(key)

        if (index > i && (index - i - 2) >= minDelta && walls.has(hasToBeWall)) {
          shortcutsOne.push({
            path: [p, { x: p.x + d[0], y: p.y + d[1] }],
          })
        }
      })
    })
  }

  const findShortcutsTwoManhattan = (minDelta: number, maxLength: number) => {
    const pathStrings = path.map(p => `${p.x}|${p.y}`)
    const pathSet = new Set(pathStrings)

    path.forEach((p, i) => {
      for (let y = -maxLength; y <= maxLength; y++) {
        for (let x = -maxLength + Math.abs(y); x <= maxLength - Math.abs(y); x++) {
          const key = `${p.x + x}|${p.y + y}`
          if (pathSet.has(key)) {
            const index = pathStrings.indexOf(key)
            // This is the distance we have to move
            const manhattan = Math.abs(x) + Math.abs(y)
            // This is how much we're saving
            const savings = index - i - manhattan

            if (manhattan <= maxLength && index > i) {
              if (savings >= minDelta) {
                shortcutsTwo++
              }
            }
          }
        }
      }
    })
  }

  const run = () => {
    if (props.input) {
      height = props.input.length
      props.input.forEach((r, y) => {
        if (width === 0) {
          width = r.length
        }

        r.split('').forEach((c, x) => {
          if (c === '#') {
            walls.add(`${x}|${y}`)
          } else if (c === 'S') {
            start.x = x
            start.y = y
          } else if (c === 'E') {
            end.x = x
            end.y = y
          }
        })
      })

      // Keep path for plotting
      findPath()
      findShortcutsOne(100)
      findShortcutsTwoManhattan(100, 20)
      const pOne = shortcutsOne.length
      const pTwo = shortcutsTwo

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
