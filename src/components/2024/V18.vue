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

  export interface DrawState {
    pathChanged: boolean
    lastOne: boolean
    walls: string[]
    path: string[]
  }

  interface CanvasState {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    factor: number
    index: number
  }

  const props = defineProps<{
    width: number
    height: number
    path: string[]
    walls: string[]
    pTwo: DrawState[]
  }>()

  let pTwoState: CanvasState

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

    return {
      canvas,
      ctx,
      factor,
      index: 0,
    }
  }

  const drawOne = () => {
    const cs: CanvasState = drawBg('One')

    cs.ctx.fillStyle = '#57606f'
    props.walls.forEach(w => {
      const [x, y] = w.split('|').map(Number)
      cs.ctx.fillRect(x * cs.factor, y * cs.factor, cs.factor, cs.factor)
    })

    // Initialise the canvas
    cs.canvas.width = props.width * cs.factor + 1
    cs.canvas.height = props.height * cs.factor + 1
    // Offset for better drawing accuracy
    cs.ctx.translate(0.5, 0.5)
    cs.ctx.lineWidth = 0.5

    cs.ctx.fillStyle = '#2f3542'
    cs.ctx.strokeStyle = '#57606f'
    cs.ctx.fillRect(0, 0, cs.canvas.width, cs.canvas.height)
    cs.ctx.strokeRect(0, 0, cs.canvas.width - 1, cs.canvas.height - 1)

    cs.ctx.fillStyle = '#57606f'
    props.walls.forEach(w => {
      const [x, y] = w.split('|').map(Number)
      cs.ctx.fillRect(x * cs.factor, y * cs.factor, cs.factor, cs.factor)
    })

    const fg = createMultiColorGradient(VIRIDIS, props.path.length + 1)

    props.path.forEach((p, i) => {
      cs.ctx.fillStyle = fg[i]
      const [x, y] = p.split('|').map(Number)
      cs.ctx.fillRect(x * cs.factor, y * cs.factor, cs.factor, cs.factor)
    })
  }

  const drawPath = () => {
    const cs = pTwoState

    if (cs.index < props.pTwo.length) {
      const s = props.pTwo[cs.index++]

      if (s.pathChanged) {
        const fg = createMultiColorGradient(VIRIDIS, s.path.length + 1)

        if (s.lastOne) {
          console.log(s)
        }

        cs.ctx.fillStyle = '#2f3542'
        cs.ctx.strokeStyle = '#57606f'
        cs.ctx.fillRect(0, 0, cs.canvas.width, cs.canvas.height)
        cs.ctx.strokeRect(0, 0, cs.canvas.width - 1, cs.canvas.height - 1)

        const path = s.lastOne ? s.path.slice(0, s.path.indexOf(s.walls[s.walls.length - 1])) : s.path
        path.forEach((p, i) => {
          cs.ctx.fillStyle = fg[i]
          const [x, y] = p.split('|').map(Number)
          cs.ctx.fillRect(x * cs.factor, y * cs.factor, cs.factor, cs.factor)
        })
        s.walls.forEach((w, i) => {
          cs.ctx.fillStyle = (i === (s.walls.length - 1)) ? 'white' : '#57606f'
          const [x, y] = w.split('|').map(Number)
          cs.ctx.fillRect(x * cs.factor, y * cs.factor, cs.factor, cs.factor)
        })
      } else {
        cs.ctx.fillStyle = '#57606f'
        const w = s.walls[s.walls.length - 1]
        const [x, y] = w.split('|').map(Number)
        cs.ctx.fillRect(x * cs.factor, y * cs.factor, cs.factor, cs.factor)
      }

      window.requestAnimationFrame(drawPath)
    }
  }

  const drawTwo = () => {
    pTwoState = drawBg('Two')

    window.requestAnimationFrame(drawPath)
  }

  onMounted(() => {
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
