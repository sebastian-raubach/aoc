<template>
  <v-row>
    <v-col cols="12" md="6">
      <div id="holderOne" class="canvas-holder">
        <canvas id="partOne" class="canvas" height="500" width="500" />
      </div>
    </v-col>
    <v-col cols="12" md="6">
      <div id="holderTwo" class="canvas-holder">
        <canvas id="partTwo" class="canvas" height="500" width="500" />
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
  import { createMultiColorGradient, VIRIDIS } from '@/plugins/color'

  interface CanvasState {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    factor: number
    index: number
  }

  const props = defineProps<{
    width: number
    height: number
    grid: string[]
    pOne: string[]
    pTwo: string[][]
  }>()

  let pTwoState: CanvasState
  let fg: string[] = []

  const drawBg = (id: string): CanvasState => {
    const factor = Math.max(1, Math.floor((document.getElementById('holder' + id)?.offsetWidth || 1) / props.width))

    const canvas: HTMLCanvasElement = document.getElementById('part' + id) as HTMLCanvasElement
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D

    // Initialise the canvas
    canvas.width = props.width * factor + 1
    canvas.height = props.height * factor + 1
    // Offset for better drawing accuracy
    ctx.translate(0.5, 0.5)
    ctx.lineWidth = 0.5

    ctx.fillStyle = '#2f3542'
    ctx.strokeStyle = '#57606f'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeRect(0, 0, canvas.width - 1, canvas.height - 1)

    ctx.fillStyle = '#57606f'

    props.grid.forEach(s => {
      const [r, c] = s.split('|').map(Number)
      ctx.fillRect(c * factor, r * factor, factor, factor)
    })

    return {
      canvas,
      ctx,
      factor,
      index: 0,
    }
  }

  const drawOne = () => {
    const cs: CanvasState = drawBg('One')

    cs.ctx.fillStyle = fg[0]

    props.pOne.forEach(s => {
      const [r, c] = s.split('|').map(Number)
      cs.ctx.fillRect(c * cs.factor, r * cs.factor, cs.factor, cs.factor)
    })
  }

  const drawGrid = () => {
    const cs = pTwoState

    if (cs.index < props.pTwo.length) {
      const grid = props.pTwo[cs.index++]

      cs.ctx.fillStyle = fg[cs.index]

      grid.forEach(s => {
        const [r, c] = s.split('|').map(Number)
        cs.ctx.fillRect(c * cs.factor, r * cs.factor, cs.factor, cs.factor)
      })

      window.requestAnimationFrame(drawGrid)
    }
  }

  const drawTwo = () => {
    pTwoState = drawBg('Two')

    window.requestAnimationFrame(drawGrid)
  }

  onMounted(() => {
    fg = createMultiColorGradient(VIRIDIS, props.pTwo.length)

    drawOne()
    drawTwo()
  })
</script>

<style scoped>
.canvas-holder {
  overflow: auto;
  height: auto;
  width: 100%;
}
</style>
