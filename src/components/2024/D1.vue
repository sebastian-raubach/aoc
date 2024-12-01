<template>
  <span />
</template>

<script lang="ts" setup>
  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  interface Map {
    [key: string]: number
  }

  const left: number[] = []
  const right: number[] = []
  const rCount: Map = {}

  if (props.input) {
    props.input.forEach((s: string) => {
      if (s.length < 1) {
        return
      }

      const parts = s.split('   ').map(Number)

      left.push(parts[0])
      right.push(parts[1])

      rCount[parts[1]] = (rCount[parts[1]] || 0) + 1
    })

    left.sort((a: number, b: number) => a - b)
    right.sort((a: number, b: number) => a - b)

    const pOne = left.map((l: number, i: number) => Math.abs(l - right[i])).reduce((a: number, b: number) => a + b)
    const pTwo = left.map((l: number) => l * (rCount[l] || 0)).reduce((a: number, b: number) => a + b)

    emit('onFinished', pOne, pTwo)
  }
</script>

<style>

</style>
