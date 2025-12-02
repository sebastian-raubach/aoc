<template>
  <span />
</template>

<script lang="ts" setup>
  import { mod } from '@/plugins/math'

  const props = defineProps<{
    input?: string[],
  }>()

  interface Range {
    start: string
    end: string
  }

  const emit = defineEmits(['onFinished'])

  const run = () => {
    if (props.input) {
      const ranges: Range[] = props.input.map((s: string) => {
        // Split the input into individual ranges
        return s.split(',').map(r => {
          // Then split each range into start and end
          const parts = r.split('-')
          return {
            start: parts[0],
            end: parts[1],
          }
        })
      })[0]

      let pOne = 0
      let pTwo = 0

      ranges.forEach(r => {
        const start = +r.start
        const end = +r.end
        // For each number within the range
        for (let n = start; n <= end; n++) {
          const nn = `${n}`

          // Check number has an even length and check if the first half equals the second half
          if (mod(nn.length, 2) === 0 && nn.slice(0, nn.length / 2) === nn.slice(-(nn.length / 2))) {
            pOne += n
          }

          if (nn.length > 1) {
            // For each valid length up to at most half the string length
            outer: for (let l = 1; l <= Math.ceil(nn.length / 2); l++) {
              if (mod(nn.length, l) !== 0) {
                // Total length isn't cleanly divisible by this sub-length -> cannot be multiples
                continue
              }

              // Get the sequence to compare
              const seq = nn.slice(0, l)

              // Then step through the string with length `l` and compare each sequence section
              for (let i = 0; i <= nn.length - l; i += l) {
                const oseq = nn.slice(i, i + l)
                if (oseq !== seq) {
                  // Found one that doesn't match? Can't be invalid
                  continue outer
                }
              }

              // We get here IFF it's invalid
              pTwo += n
              break
            }
          }
        }
      })

      emit('onFinished', pOne, pTwo)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
