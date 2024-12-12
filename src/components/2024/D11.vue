<template>
  <span />
</template>

<script lang="ts" setup>
  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  const cache = new Map<string, number>()

  const solve = (number: number, iterations: number): number => {
    if (iterations === 0) {
      // Base case
      return 1
    }

    // Check the cache
    const cached = cache.get(`${number}|${iterations}`)
    if (cached) {
      return cached
    }

    const str = `${number}`

    let result
    // Calculate value
    if (number === 0) {
      result = solve(1, iterations - 1)
    } else if (str.length % 2 === 0) {
      const one = +str.substring(0, str.length / 2)
      const two = +str.substring(str.length / 2)

      result = solve(one, iterations - 1) + solve(two, iterations - 1)
    } else {
      result = solve(number * 2024, iterations - 1)
    }

    // Add to cache
    cache.set(`${number}|${iterations}`, result)

    return result
  }

  const run = () => {
    if (props.input) {
      const numbers = props.input[0].split(' ').map(Number)

      let pOne = 0
      let pTwo = 0
      numbers.forEach(n => {
        pOne += solve(n, 25)
        pTwo += solve(n, 75)
      })

      emit('onFinished', pOne, pTwo)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
