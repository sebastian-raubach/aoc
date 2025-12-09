<template>
  <div class="canvas-holder">
    <canvas id="partOne" class="canvas" height="1000" width="1000" />
  </div>
</template>

<script lang="ts" setup>
  import { createColorGradient } from '@/plugins/color'
  import { manhattan } from '@/plugins/math'
  import { Position2d } from '@/plugins/types/Position2d'

  export interface DrawRectangle {
    from: Position2d
    to: Position2d
    area: number
  }

  export interface VizProps {
    points: Position2d[]
    partOne: DrawRectangle
    partTwo: DrawRectangle
    min: Position2d
    max: Position2d
  }

  const props = defineProps<VizProps>()

  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D

  interface DrawProps {
    bgGradient: string[]
  }

  const drawProps: DrawProps = {
    bgGradient: [],
  }

  const draw = () => {
    drawProps.bgGradient = createColorGradient('#57606f', '#2f3542', Math.ceil(manhattan({ x: 0, y: 0 }, { x: 500, y: 500 }) + 1))

    // Initialise the canvas
    canvas = document.getElementById('partOne') as HTMLCanvasElement
    canvas.width = 1000
    canvas.height = 1000
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.lineWidth = 1

    // Set the canvas size
    ctx.fillStyle = '#222222'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let y = 0; y < 1000; y++) {
      for (let x = 0; x < 1000; x++) {
        const distance = manhattan({ x, y }, { x: 500, y: 500 })
        ctx.fillStyle = drawProps.bgGradient[distance]
        ctx.fillRect(x, y, 1, 1)
      }
    }

    ctx.fillStyle = '#006266'
    ctx.fillRect(props.partOne.from.x / 100, props.partOne.from.y / 100, (props.partOne.to.x - props.partOne.from.x) / 100, (props.partOne.to.y - props.partOne.from.y) / 100)

    ctx.fillStyle = '#A3CB38'
    ctx.fillRect(props.partTwo.from.x / 100, props.partTwo.from.y / 100, (props.partTwo.to.x - props.partTwo.from.x) / 100, (props.partTwo.to.y - props.partTwo.from.y) / 100)

    drawLines()
  }

  function drawLines () {
    ctx.strokeStyle = '#a4b0be'

    props.points.forEach((l, i) => {
      const from = l
      const to = props.points[(i + 1) % props.points.length]

      ctx.beginPath()
      ctx.moveTo(from.x / 100, from.y / 100)
      ctx.lineTo(to.x / 100, to.y / 100)
      ctx.stroke()
    })
  }

  onMounted(() => draw())
</script>

<style scoped>
.canvas-holder {
  overflow: auto;
  height: 1040px;
  width: 100%;
}
</style>
