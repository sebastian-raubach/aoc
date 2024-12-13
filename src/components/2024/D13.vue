<template>
  <span />
</template>

<script lang="ts" setup>
  import { Position2d } from '@/plugins/types/Position2d'

  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  interface Config {
    a: Position2d
    b: Position2d
    prize: Position2d
  }

  const solveOne = (configs: Config[]) => {
    return configs.map(c => {
      // Maximum number of A presses is either 100 or however often we can fully fit A's x or y into the prize
      const maxA = Math.min(100, Math.min(Math.floor(c.prize.x / c.a.x), Math.floor(c.prize.y / c.a.y)))

      let min = Number.MAX_SAFE_INTEGER

      for (let i = maxA; i >= 0; i--) {
        const remX = c.prize.x - i * c.a.x
        const remY = c.prize.y - i * c.a.y

        const remainingBy = remY / c.b.y
        const remainingBx = remX / c.b.x
        if (remX % c.b.x === 0 && remY % c.b.y === 0 && remainingBy === remainingBx && remainingBy <= 100) {
          min = Math.min(min, i * 3 + remainingBy)
        }
      }

      return min === Number.MAX_SAFE_INTEGER ? 0 : min
    }).reduce((a, b) => a + b)
  }

  const solveTwo = (configs: Config[]) => {
    return configs.map(c => {
      // Maths away!
      const lhs = c.b.y * c.a.x - c.b.x * c.a.y
      const rhs = c.b.y * c.prize.x - c.b.x * c.prize.y

      // Calculate A if possible
      const remA = rhs % lhs
      if (remA !== 0) {
        return 0
      }
      const a = Math.floor(rhs / lhs)

      // Calculate B if possible
      const bxb = c.prize.x - c.a.x * a
      const remB = bxb % c.b.x
      if (remB !== 0) {
        return 0
      }
      const b = Math.floor(bxb / c.b.x)

      // Return token costs
      return a * 3 + b
    }).reduce((a, b) => a + b)
  }

  const run = () => {
    if (props.input) {
      const configs: Config[] = []

      let a: Position2d | undefined
      let b: Position2d | undefined
      let prize: Position2d | undefined

      const pattern = /.+:\sX(\+|=)(?<x>\d+),\sY(\+|=)(?<y>\d+)/
      props.input.forEach((r: String, i: number) => {
        const row = i % 4
        if (row === 0) {
          const res = r.match(pattern)?.groups
          if (res) {
            a = { x: +res.x, y: +res.y }
          }
        } else if (row === 1) {
          const res = r.match(pattern)?.groups
          if (res) {
            b = { x: +res.x, y: +res.y }
          }
        } else if (row === 2) {
          const res = r.match(pattern)?.groups
          if (res) {
            prize = { x: +res.x, y: +res.y }
          }
        } else if (row === 3 && a && b && prize) {
          configs.push({ a, b, prize })
        }
      })

      if (a && b && prize) {
        configs.push({ a, b, prize })
      }

      const pOne = solveOne(configs)
      configs.forEach(c => {
        c.prize.x += 10000000000000
        c.prize.y += 10000000000000
      })
      const pTwo = solveTwo(configs)

      emit('onFinished', pOne, pTwo)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
