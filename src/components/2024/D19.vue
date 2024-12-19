<template>
  <span />
</template>

<script lang="ts" setup>
  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  let towels: string[] = []
  const pOneCache: Map<string, boolean> = new Map()
  const pTwoCache: Map<string, number> = new Map()

  const matches = (design: string): boolean => {
    const cache = pOneCache.get(design)
    if (design === '' || cache) {
      return true
    } else if (cache === false) {
      return false
    }

    for (let i = 0; i < towels.length; i++) {
      if (design.startsWith(towels[i])) {
        const part = design.slice(towels[i].length)
        const valid = pOneCache.get(part) || matches(part)
        pOneCache.set(part, valid)
        if (valid) {
          pOneCache.set(design, true)
          return true
        }
      }
    }

    pOneCache.set(design, false)
    return false
  }

  const enumerate = (design: string): number => {
    const cache = pTwoCache.get(design)
    if (design === '') {
      return 1
    } else if (cache) {
      return cache
    }

    let total = 0
    for (let i = 0; i < towels.length; i++) {
      if (design.startsWith(towels[i])) {
        const part = design.slice(towels[i].length)

        const count = pTwoCache.get(part) || enumerate(part)
        pTwoCache.set(part, count)
        total += count
      }
    }

    pTwoCache.set(design, total)
    return total
  }

  const run = () => {
    if (props.input) {
      towels = props.input[0].split(', ')
      const designs = props.input.slice(2)

      let pOne = 0
      let pTwo = 0
      designs.filter(d => {
        if (matches(d)) {
          // Part 1 count valid designs
          pOne++
          return true
        }
        return false
      }).forEach(d => {
        // Part 2 for each valid design, get enumeration
        pTwo += enumerate(d)
      })

      emit('onFinished', pOne, pTwo)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
