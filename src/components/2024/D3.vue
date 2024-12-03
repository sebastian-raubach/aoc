<template>
  <span />
</template>

<script lang="ts" setup>
  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  const run = () => {
    if (props.input) {
      const joined = props.input.join('')
      const patternOne = /mul\((?<first>-?\d{1,3}),(?<second>-?\d{1,3})\)/g
      const patternTwo = /(mul\((?<first>-?\d{1,3}),(?<second>-?\d{1,3})\))|do\(\)|don't\(\)/g

      let pOne = 0
      let match
      do {
        match = patternOne.exec(joined)

        if (match && match.groups && match.groups.first && match.groups.second) {
          pOne += (+match.groups.first) * (+match.groups.second)
        }
      } while (match)

      let pTwo = 0
      let enabled = true
      do {
        match = patternTwo.exec(joined)

        if (match && match.groups) {
          if (match[0] === 'do()') {
            enabled = true
          } else if (match[0] === 'don\'t()') {
            enabled = false
          } else if (enabled) {
            pTwo += (+match.groups.first) * (+match.groups.second)
          }
        }
      } while (match)

      emit('onFinished', pOne, pTwo)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
