<template>
  <span />
</template>

<script lang="ts" setup>
  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  interface Rule {
    left: number
    right: number
  }

  let rules: Rule[] = []
  let updates: number[][] = []
  let isUpdates: boolean = false

  const isValid = (u: number[]) => {
    return !rules.some(r => {
      const iOne = u.indexOf(r.left)
      const iTwo = u.indexOf(r.right)

      if (iOne !== -1 && iTwo !== -1) {
        return iOne > iTwo
      } else {
        return false
      }
    })
  }

  const run = () => {
    if (props.input) {
      rules = []
      updates = []
      isUpdates = false

      props.input.forEach(r => {
        if (r.length < 1) {
          isUpdates = true
        } else if (isUpdates) {
          const parts = r.split(',').map(Number)
          updates.push(parts)
        } else {
          const [left, right] = r.split('|').map(Number) as number[]
          rules.push({ left, right })
        }
      })

      let pOne = 0
      let pTwo = 0

      updates.forEach(u => {
        const valid = isValid(u)

        if (valid) {
          pOne += u[Math.floor(u.length / 2)]
        } else {
          const copy = u.concat()

          // Check all pairs
          for (let i = 0; i < copy.length - 1; i++) {
            for (let j = 1; j < copy.length; j++) {
              if (!isValid([copy[j - 1], copy[j]])) {
                // If not valid according to the rules, swap them
                [copy[j - 1], copy[j]] = [copy[j], copy[j - 1]]
              }
            }
          }

          // It'll be valid by the time we get here
          pTwo += copy[Math.floor(copy.length / 2)]
        }
      })

      emit('onFinished', pOne, pTwo)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
