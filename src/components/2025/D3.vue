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
      let pOne = 0
      let pTwo = 0

      props.input.forEach(r => {
        // For part 1 we naively search for the largest digit that exists and isn't in the last position
        for (let i = 9; i >= 0; i--) {
          const left = r.indexOf(`${i}`)

          if (left !== -1 && left !== r.length - 1) {
            // Then starting from there we search for the largest digit again and stick them both together
            for (let j = 9; j >= 0; j--) {
              const right = r.indexOf(`${j}`, left + 1)

              if (right !== -1) {
                pOne += +`${r[left]}${r[right]}`
                return
              }
            }
          }
        }
      })

      // For part two we use a monotonic stack and sum up the results for each row
      pTwo = props.input.map(r => monotonicStack(r, 12)).reduce((a, b) => a + b)

      emit('onFinished', pOne, pTwo)
    }
  }

  function monotonicStack (seq: string, length: number) {
    // Keep track of the currently best solution
    const stack: number[] = []
    // How many times can we discard a currently stored digit for a better one?
    let canRemoveCount = seq.length - length

    // Iterate through the input
    for (let i = 0; i < seq.length; i++) {
      // Convert to number
      const num = +seq[i]
      // Now we check whether we are still allowed to swap && if there is something to swap for
      // && if the currently last digit is smaller than what we are looking at right now
      while (canRemoveCount > 0 && stack.length > 0 && stack[stack.length - 1] < num) {
        // If so, discard the last digit
        stack.pop()
        // Decrement the number of times we can swap
        canRemoveCount--
      }
      // We get here when we want to place the new digit into the stack
      stack.push(num)
    }

    // To get the result we only need the first `length` entries
    return +stack.slice(0, length).join('')
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
