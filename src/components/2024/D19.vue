<template>
  <span />
</template>

<script lang="ts" setup>
  import memoize from 'micro-memoize'

  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  let towels: string[] = []

  let memoizeMatches: Function
  let memoizeEnumerate: Function

  const matches = (design: string): boolean => {
    if (design === '') {
      return true
    }

    for (let i = 0; i < towels.length; i++) {
      if (design.startsWith(towels[i])) {
        const part = design.slice(towels[i].length)
        const valid = memoizeMatches(part)
        if (valid) {
          return true
        }
      }
    }

    return false
  }

  const enumerate = (design: string): number => {
    if (design === '') {
      return 1
    }

    let total = 0
    for (let i = 0; i < towels.length; i++) {
      if (design.startsWith(towels[i])) {
        const part = design.slice(towels[i].length)

        const count = memoizeEnumerate(part)
        total += count
      }
    }

    return total
  }

  memoizeMatches = memoize(matches, { maxSize: Number.MAX_VALUE })
  memoizeEnumerate = memoize(enumerate, { maxSize: Number.MAX_VALUE })

  const run = () => {
    if (props.input) {
      towels = props.input[0].split(', ')
      const designs = props.input.slice(2)

      let pOne = 0
      let pTwo = 0
      designs.filter(d => {
        if (memoizeMatches(d)) {
          // Part 1 count valid designs
          pOne++
          return true
        }
        return false
      }).forEach(d => {
        // Part 2 for each valid design, get enumeration
        pTwo += memoizeEnumerate(d)
      })

      emit('onFinished', pOne, pTwo)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
