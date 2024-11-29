<template>
  <span />
</template>

<script lang="ts" setup>
  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  const mapping: string[][] = [
    ['one', '1'],
    ['two', '2'],
    ['three', '3'],
    ['four', '4'],
    ['five', '5'],
    ['six', '6'],
    ['seven', '7'],
    ['eight', '8'],
    ['nine', '9'],
  ]

  if (props.input) {
    const pOne = props.input.concat().map((i: string) => {
      // Remove any non-numbers
      const numbers = i.replace(/\D/g, '').split('')

      if (numbers.length > 0) {
        // If there's at least one, concatenate first and last
        return +(numbers[0] + numbers[numbers.length - 1])
      } else {
        // Else return 0
        return 0
      }
    }).reduce((a: number, b: number) => a + b, 0)// Then sum up

    const pTwo = props.input.concat().map((i: string) => {
      // Collect all numbers
      const numbers = []

      // Go through string
      for (let p = 0; p < i.length; p++) {
        const char = i.charAt(p)
        if (char >= '0' && char <= '9') {
          // If it's an actual number, add
          numbers.push(i[p])
        } else {
          // Else, check for each mapping
          for (let m = 0; m < mapping.length; m++) {
            // If it starts here
            if (i.substring(p).indexOf(mapping[m][0]) === 0) {
              // Then add and break
              numbers.push(mapping[m][1])
              break
            }
          }
        }
      }

      if (numbers.length > 0) {
        return +(numbers[0] + numbers[numbers.length - 1])
      } else {
        return 0
      }
    }).reduce((a: number, b: number) => a + b, 0)// Then sum up

    emit('onFinished', pOne, pTwo)
  }
</script>

<style>

</style>
