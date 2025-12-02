<template>
  <span />
</template>

<script lang="ts" setup>
  import { mod } from '@/plugins/math'

  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  const run = () => {
    if (props.input) {
      let pOne = 0
      let pTwo = 0
      const deltas = props.input.map((s: string) => {
        // Determine sign based on L or R
        const sign = s.slice(0, 1) === 'L' ? -1 : +1
        // Get the number from the input
        const number = +(s.slice(1, s.length))

        // Calculate the total delta
        return sign * number
      })

      deltas.reduce((a, b) => {
        // Calculate new value
        const result = a + b

        // Modulo it by 100 to get within range
        const modulated = mod(result, 100)
        if (modulated === 0) {
          // If the remainder is 0, we're currently pointing at 0
          pOne++
        }

        // For part 2, calculate the number of passed by 0. Add 1 if rotating L and passing 0.
        const count = Math.floor(Math.abs(result) / 100) + (result <= 0 && a !== 0 ? 1 : 0)

        pTwo += count

        return modulated
      }, 50)

      emit('onFinished', pOne, pTwo)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
