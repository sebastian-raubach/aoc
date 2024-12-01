<template>
  <span />
</template>

<script lang="ts" setup>
  const props = defineProps<{
    input?: string[],
  }>()

  interface ColorCount {
    color: string
    count: number
  }

  interface Map {
    [key: string]: number
  }

  const limits: Map = {
    red: 12,
    green: 13,
    blue: 14,
  }

  const emit = defineEmits(['onFinished'])

  const run = () => {
    if (props.input) {
      const pattern = /Game (?<game>\d+): (?<dice>.+)/
      let p1 = 0
      let p2 = 0
      props.input.forEach((i: string) => {
        const res = i.match(pattern)?.groups

        if (res) {
          const game = +res?.game
          const sets: ColorCount[][] = res.dice.split('; ').map(t => t.split(', ').map(d => {
            const parts = d.split(' ')
            return {
              color: parts[1],
              count: +parts[0],
            }
          }))

          if (!sets.some((s: ColorCount[]) => s.some((d: ColorCount) => d.count > limits[d.color]))) {
            p1 += game
          }

          const maxs: Map = {
            red: 0,
            green: 0,
            blue: 0,
          }

          sets.forEach(s => {
            s.forEach(d => {
              maxs[d.color] = Math.max(maxs[d.color], d.count)
            })
          })

          p2 += maxs.red * maxs.green * maxs.blue
        }
      })

      emit('onFinished', p1, p2)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
