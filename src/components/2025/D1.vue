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
      const numbers = props.input.map((s: string) => {
        const delta = s.slice(0, 1) === 'L' ? -1 : +1
        const number = +(s.slice(1, s.length))

        return delta * number
      })

      numbers.reduce((a, b) => {
        const result = a + b

        const modulated = mod(result, 100)
        const count = Math.floor(Math.abs(result) / 100) + (result <= 0 && a !== 0 ? 1 : 0)

        if (modulated === 0) {
          pOne++
        }

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
