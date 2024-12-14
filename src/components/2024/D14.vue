<template>
  <V14 v-if="finished" :robots-one="robotPositionsOne" :robots-two="robotPositionsTwo" :tree-tip="treeTip" />
</template>

<script lang="ts" setup>
  import V14 from '@/components/2024/V14.vue'
  import { mod } from '@/plugins/math'
  import { Position2d } from '@/plugins/types/Position2d'

  const props = defineProps<{
    input?: string[],
  }>()

  interface Robot {
    position: Position2d
    velocity: Position2d
  }

  const emit = defineEmits(['onFinished'])
  const finished = ref<boolean>(false)

  const width = 101
  const height = 103

  const treePos = [[0, 0], [-1, 1], [0, 1], [1, 1], [-2, 2], [-1, 2], [0, 2], [1, 2], [2, 2]]
  const robotPositionsOne: Position2d[] = []
  const robotPositionsTwo: Set<String> = new Set()
  let treeTip: Position2d

  const move = (robots: Robot[], amount: number) => {
    robots.forEach(r => {
      r.position.x = mod(r.position.x + r.velocity.x * amount, width)
      r.position.y = mod(r.position.y + r.velocity.y * amount, height)
    })
  }

  const parse = (): Robot[] => {
    return props.input?.map(i => {
      const parts = i.split(' ')

      const [px, py] = parts[0].split('=')[1].split(',').map(Number)
      const [vx, vy] = parts[1].split('=')[1].split(',').map(Number)

      return {
        position: { x: px, y: py },
        velocity: { x: vx, y: vy },
      }
    }) || []
  }

  const checkTree = (robots: Robot[]) => {
    const set = new Set()

    robots.forEach(r => set.add(`${r.position.x}|${r.position.y}`))

    for (const robot of robots) {
      if (treePos.every(tp => set.has(`${robot.position.x + tp[0]}|${robot.position.y + tp[1]}`))) {
        treeTip = robot.position

        robots.forEach(r => robotPositionsTwo.add(`${r.position.x}|${r.position.y}`))

        return true
      }
    }

    return false
  }

  const run = () => {
    if (props.input) {
      let robots: Robot[] = parse()

      move(robots, 100)

      const quadCount: number[] = [0, 0, 0, 0]
      const w1 = Math.floor(width / 2)
      const w2 = Math.ceil(width / 2)
      const h1 = Math.floor(height / 2)
      const h2 = Math.ceil(height / 2)

      robots.forEach(m => {
        if (m.position.x < w1 && m.position.y < h1) {
          robotPositionsOne.push({ x: m.position.x, y: m.position.y })
          quadCount[0]++
        } else if (m.position.x >= w2 && m.position.y < h1) {
          robotPositionsOne.push({ x: m.position.x, y: m.position.y })
          quadCount[1]++
        } else if (m.position.x < w1 && m.position.y >= h2) {
          robotPositionsOne.push({ x: m.position.x, y: m.position.y })
          quadCount[2]++
        } else if (m.position.x >= w2 && m.position.y >= h2) {
          robotPositionsOne.push({ x: m.position.x, y: m.position.y })
          quadCount[3]++
        }
      })

      const pOne = quadCount[0] * quadCount[1] * quadCount[2] * quadCount[3]

      robots = parse()

      let pTwo = 0
      while (true) {
        move(robots, 1)
        pTwo++

        if (checkTree(robots)) {
          break
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
