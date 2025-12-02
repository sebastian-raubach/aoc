<template>
  <span />
</template>

<script lang="ts" setup>
import { mod } from '@/plugins/math';

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
        return s.split(',').map(r => {
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

          if (mod(nn.length, 2) === 0 && nn.slice(0, nn.length / 2) === nn.slice(-(nn.length / 2))) {
            pOne += n
          }

          if (nn.length > 1) {
            // For each valid length up to at most half the string length
            outer: for (let l = 1; l <= Math.ceil(nn.length / 2); l++) {
              if (mod(nn.length, l) !== 0) {
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
