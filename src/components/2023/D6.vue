<template>
  <span />
</template>

<script lang="ts" setup>
  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  const solve = (time: number[], dist: number[]) => {
    // Map each time to the count of wait/speed combinations that win
    return time.map((t, i) => {
      // Determine the minimal time and maximal time to wait
      let min = 1
      let max = t

      // Search for the min from the start
      for (let j = 1; j < t; j++) {
        if (j * (t - j) > dist[i]) {
          // Once we find a winning combination, remember and break
          min = j
          break
        }
      }

      // Search for the max from the end
      for (let j = t - 1; j > 0; j--) {
        if (j * (t - j) > dist[i]) {
          // Once we find a winning combination, remember and break
          max = j
          break
        }
      }

      // Return the size of the range
      return max - min + 1
    })
  }

  if (props.input) {
    // Parse the input
    const time: number[] = props.input[0].split(/\s+/).slice(1).map(Number)
    const dist: number[] = props.input[1].split(/\s+/).slice(1).map(Number)

    // Solve part one by multiplying the number of options together
    const pOne = solve(time, dist).reduce((a, b) => a * b, 1)
    // Solve part two by counting the number of options for the concatenated numbers
    const pTwo = solve([+time.join('')], [+dist.join('')])[0]

    emit('onFinished', pOne, pTwo)
  }
</script>

<style>

</style>
