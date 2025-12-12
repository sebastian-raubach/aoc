<template>
  <span />
</template>

<script lang="ts" setup>
  const props = defineProps<{
    input?: string[],
  }>()

  interface PuzzlePiece {
    shape: boolean[][]
    area: number
  }
  interface Region {
    width: number
    height: number
    pieces: number[]
  }

  const emit = defineEmits(['onFinished'])

  const run = () => {
    if (props.input) {
      let pOne = 0
      let pTwo = 0

      const pieces: PuzzlePiece[] = []
      const regions: Region[] = []
      let piece: PuzzlePiece | undefined
      props.input.forEach((s: string) => {
        if (s === '' && piece) {
          piece.area = piece.shape.map(r => r.filter(c => c === true).length).reduce((a, b) => a + b)
          pieces.push(piece)
          piece = undefined
        } else {
          if (piece) {
            piece.shape.push(s.split('').map(c => c === '#'))
          } else {
            const [left, right] = s.split(':')

            if (right === '') {
              piece = {
                shape: [],
                area: 0,
              }
            } else {
              const [width, height] = left.split('x').map(Number)
              regions.push({
                width,
                height,
                pieces: right.trim().split(' ').map(Number),
              })
            }
          }
        }
      })

      pOne = regions.filter(r => {
        const requestedArea = r.pieces.map((p, i) => pieces[i].area * p).reduce((a, b) => a + b)
        const availableArea = r.height * r.width

        console.log(requestedArea, availableArea)

        return requestedArea <= availableArea
      }).length

      emit('onFinished', pOne, pTwo)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
