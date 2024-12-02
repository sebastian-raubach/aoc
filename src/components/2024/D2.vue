<template>
  <v-row>
    <v-col cols="12" md="6">
      <div class="canvas-holder mb-5">
        <canvas id="partOne" class="canvas" height="500" width="500" />
      </div>
    </v-col>
    <v-col cols="12" md="6">
      <div class="canvas-holder mb-5">
        <canvas id="partTwo" class="canvas" height="500" width="500" />
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
  import { createMultiColorGradient, VIRIDIS } from '@/plugins/color'

  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  interface Report {
    sequence: number[]
    validPartOne: boolean
    validPartTwo: boolean
    reducedSequence: (number | null)[]
  }

  const drawOne = (reports: Report[]) => {
    // Initialise the canvas
    const canvas: HTMLCanvasElement = document.getElementById('partOne') as HTMLCanvasElement

    if (canvas) {
      const ctx = canvas.getContext('2d')

      if (ctx) {
        ctx.translate(0.5, 0.5)
        const factor = 5
        ctx.strokeStyle = '#ff0000'

        const maxSeqLength = Math.max.apply(null, reports.map(r => r.sequence.length)) - 1
        const validCount = reports.filter(r => r.validPartOne).length
        const gradient = createMultiColorGradient(VIRIDIS, validCount)

        let counter = 0
        const drawLine = (r: Report) => {
          if (r.validPartOne) {
            ctx.lineWidth = 1.5
            ctx.strokeStyle = gradient[counter++]
          } else {
            ctx.lineWidth = 1
            ctx.strokeStyle = '#777777'
          }
          ctx.beginPath()
          r.sequence.forEach((s, i) => {
            ctx.lineTo(i * (100 / maxSeqLength) * factor, (100 - s) * factor)
          })
          ctx.stroke()
        }

        reports.filter(r => !r.validPartOne).forEach(drawLine)
        reports.filter(r => r.validPartOne).forEach(drawLine)
      }
    }
  }

  const drawTwo = (reports: Report[]) => {
    // Initialise the canvas
    const canvas: HTMLCanvasElement = document.getElementById('partTwo') as HTMLCanvasElement

    if (canvas) {
      const ctx = canvas.getContext('2d')

      if (ctx) {
        ctx.translate(0.5, 0.5)
        const factor = 5
        ctx.strokeStyle = '#ff0000'

        const maxSeqLength = Math.max.apply(null, reports.map(r => r.reducedSequence.length)) - 1
        const validCount = reports.filter(r => r.validPartTwo).length
        const gradient = createMultiColorGradient(VIRIDIS, validCount)

        let counter = 0
        const drawLine = (r: Report) => {
          console.log(r)
          let seq
          if (r.validPartTwo) {
            ctx.lineWidth = 1.5
            ctx.strokeStyle = gradient[counter++]
            seq = r.reducedSequence
          } else {
            ctx.lineWidth = 1
            ctx.strokeStyle = '#777777'
            seq = r.sequence
          }
          ctx.beginPath()
          seq.forEach((s, i) => {
            if (s !== null) {
              ctx.lineTo(i * (100 / maxSeqLength) * factor, (100 - s) * factor)
            }
          })
          ctx.stroke()
        }

        reports.filter(r => !r.validPartTwo).forEach(drawLine)
        reports.filter(r => r.validPartTwo).forEach(drawLine)
      }
    }
  }

  const isIncreasing = (sequence: number[]) => {
    for (let i = 1; i < sequence.length; i++) {
      const diff = sequence[i] - sequence[i - 1]

      // Check if the difference is at least one and at most 3
      if (diff < 1 || diff > 3) {
        return false
      }
    }

    return true
  }

  const run = () => {
    if (props.input) {
      const reports: Report[] = props.input.map((i: string) => {
        const sequence = i.split(' ').map(Number)

        return {
          sequence,
          validPartOne: false,
          validPartTwo: false,
          reducedSequence: [],
        }
      })

      reports.forEach((r: Report) => {
        if (isIncreasing(r.sequence) || isIncreasing(r.sequence.concat().reverse())) {
          // Original is valid
          r.validPartOne = true
          r.validPartTwo = true
          r.reducedSequence = r.sequence.concat()
          return
        }

        for (let i = 0; i < r.sequence.length; i++) {
          // Remove each level in turn
          const temp = r.sequence.concat()
          temp.splice(i, 1)

          if (isIncreasing(temp) || isIncreasing(temp.concat().reverse())) {
            // One level removed is valid
            // @ts-ignore
            temp.splice(i, 0, null)
            r.validPartTwo = true
            r.reducedSequence = temp
            break
          }
        }
      })

      emit('onFinished', reports.filter(r => r.validPartOne).length, reports.filter(r => r.validPartTwo).length)

      nextTick(() => {
        drawOne(reports)
        drawTwo(reports)
      })
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style scoped>
.canvas-holder {
  overflow: auto;
  height: 510px;
  width: 100%;
}
</style>
