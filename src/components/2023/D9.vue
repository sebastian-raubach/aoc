<template>
  <span />
</template>

<script lang="ts" setup>
  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  const solve = (arr: number[]) => {
    const dist = []

    for (let i = 1; i < arr.length; i++) {
      dist.push(arr[i] - arr[i - 1])
    }

    if (dist.every(d => d === 0)) {
      return [0, 0]
    } else {
      const temp: number[] = solve(dist)
      return [dist[0] - temp[0], dist[dist.length - 1] + temp[1]]
    }
  }

  if (props.input) {
    const result = [0, 0]
    props.input.forEach(i => {
      const numbers = i.split(' ').map(Number)
      const temp = solve(numbers)

      result[0] += numbers[0] - temp[0]
      result[1] += numbers[numbers.length - 1] + temp[1]
    })

    emit('onFinished', result[1], result[0])
  }
</script>

<style scoped>
</style>
