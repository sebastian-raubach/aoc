<template>
  <V9 :p-one="pOneFs" :p-two="pTwoFs" />
</template>

<script lang="ts" setup>
  import V9 from '@/components/2024/V9.vue'

  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  export interface Block {
    id?: number
    index: number
    length: number
  }

  let pOneFs: Block[] = []
  let pTwoFs: Block[] = []

  const solvePartOne = (gaps: Block[], files: Block[]) => {
    const dealtWith: Block[] = []

    let i = files.length - 1
    while (gaps.length > 0) {
      const file = files[i]
      const gap = gaps[0]

      if (file.index < gap.index) {
        break
      }

      if (gap.length >= file.length) {
        // Easy case, file fits completely into the gap. Move it
        file.index = gap.index
        dealtWith.push(file)
        files.pop()

        // Now reduce the size of the gap
        gap.length -= file.length
        gap.index += file.length

        // Remove the gap if it's empty
        if (gap.length < 1) {
          gaps.shift()
        }
        // Move to the next file
        i--
      } else {
        // Split out the part that fits
        const part = {
          id: file.id,
          index: gap.index,
          length: gap.length,
        }
        // Remove the gap
        gap.length = 0
        gaps.shift()
        // Push the fitting part on the final array
        dealtWith.push(part)
        // Remove the size of the current one accordingly
        file.length -= part.length
      }
    }

    files.forEach(f => dealtWith.push(f))

    let result = 0
    dealtWith.sort((a: Block, b: Block) => a.index - b.index)
    dealtWith.forEach((b: Block) => {
      for (let j = 0; j < b.length; j++) {
        result += (b.index + j) * (b.id || 0)
      }
    })

    pOneFs = JSON.parse(JSON.stringify(dealtWith))

    return result
  }

  const solvePartTwo = (gaps: Block[], files: Block[]) => {
    for (let f = files.length - 1; f >= 0; f--) {
      const file: Block = files[f]

      // No gaps left or the current file is further "left" than the first available gap
      if (gaps.length < 1 || file.index < gaps[0].length) {
        break
      }

      inner: for (let g = 0; g < gaps.length; g++) {
        const gap = gaps[g]

        if (gap.index >= file.index) {
          // If we've moved past the file, stop looking
          break inner
        }

        if (gap.length >= file.length) {
          // Move the file
          file.index = gap.index
          // Shrink gap
          gap.length -= file.length
          gap.index += file.length

          // Remove empty gaps
          if (gap.length < 1) {
            gaps.splice(g, 1)
          }

          // We don't need to keep going
          break inner
        }
      }
    }

    let result = 0
    files.sort((a: Block, b: Block) => a.index - b.index)
    files.forEach((b: Block) => {
      for (let j = 0; j < b.length; j++) {
        result += (b.index + j) * (b.id || 0)
      }
    })

    pTwoFs = JSON.parse(JSON.stringify(files))

    return result
  }

  const run = () => {
    if (props.input) {
      const num = props.input[0].split('').map(Number)

      const gaps: Block[] = []
      const files: Block[] = []

      let index = 0
      let count = 0
      num.forEach((n: number, i: number) => {
        if (i % 2 === 0) {
          files.push({
            id: count++,
            index,
            length: n,
          })
        } else {
          if (n > 0) {
            gaps.push({
              id: undefined,
              index,
              length: n,
            })
          }
        }

        index += n
      })

      const pOne = solvePartOne(JSON.parse(JSON.stringify(gaps)), JSON.parse(JSON.stringify(files)))
      const pTwo = solvePartTwo(JSON.parse(JSON.stringify(gaps)), JSON.parse(JSON.stringify(files)))

      emit('onFinished', pOne, pTwo)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
