<template>
  <span />
</template>

<script lang="ts" setup>
  import { mod } from '@/plugins/math'

  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  const mix = (value: number, secret: number) => value ^ secret
  const prune = (secret: number) => mod(secret, 16777216)

  const run = () => {
    if (props.input) {
      const pOne = props.input.map(Number).map(r => {
        let result = r
        for (let i = 0; i < 2000; i++) {
          result = prune(mix(result * 64, result))
          result = prune(mix(Math.floor(result / 32), result))
          result = prune(mix(result * 2048, result))
        }
        return result
      }).reduce((a: number, b: number) => a + b, 0)

      emit('onFinished', pOne, null)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
