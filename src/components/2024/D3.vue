<template>
  <V3 v-if="finished" :input="joinedInput" :matches-one="matchesOne" :matches-two="matchesTwo" />
</template>

<script lang="ts" setup>
  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  export interface Match {
    index: number
    length: number
    active: boolean
  }

  const matchesOne = ref<Match[]>([])
  const matchesTwo = ref<Match[]>([])
  const joinedInput = ref<string>('')
  const finished = ref<boolean>(false)

  const run = () => {
    if (props.input) {
      joinedInput.value = props.input.join('')
      const patternOne = /mul\((?<first>-?\d{1,3}),(?<second>-?\d{1,3})\)/g
      const patternTwo = /(mul\((?<first>-?\d{1,3}),(?<second>-?\d{1,3})\))|do\(\)|don't\(\)/g

      let pOne = 0
      let match
      do {
        match = patternOne.exec(joinedInput.value)

        if (match && match.groups && match.groups.first && match.groups.second) {
          pOne += (+match.groups.first) * (+match.groups.second)
          matchesOne.value.push({ index: match.index, length: match[0].length, active: true })
        }
      } while (match)

      let pTwo = 0
      let enabled = true
      do {
        match = patternTwo.exec(joinedInput.value)

        if (match && match.groups) {
          if (match[0] === 'do()') {
            enabled = true
          } else if (match[0] === 'don\'t()') {
            enabled = false
          } else {
            if (enabled) {
              pTwo += (+match.groups.first) * (+match.groups.second)
              matchesTwo.value.push({ index: match.index, length: match[0].length, active: true })
            } else {
              matchesTwo.value.push({ index: match.index, length: match[0].length, active: false })
            }
          }
        }
      } while (match)

      emit('onFinished', pOne, pTwo)
      finished.value = true
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
