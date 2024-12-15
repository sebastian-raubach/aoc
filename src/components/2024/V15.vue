<template>
  <v-row>
    <v-col cols="12" md="4">
      <div class="canvas-holder">
        <canvas id="partOne" class="canvas" height="500" width="500" />
      </div>
    </v-col>
    <v-col cols="12" md="8">
      <div class="canvas-holder">
        <canvas id="partTwo" class="canvas" height="500" width="500" />
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
  import { Config } from '@/components/2024/D15.vue'

  const props = defineProps<{
    partOne: Config[]
    partTwo: Config[]
    width: number
    height: number
  }>()

  interface DrawProps {
    width: number
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    configs: Config[]
    index: number
  }

  const factor = 10

  const drawConfig = (drawProps: DrawProps) => {
    if (drawProps.index === drawProps.configs.length) {
      return
    }

    const config = drawProps.configs[drawProps.index++]

    for (let y = 0; y < props.height; y++) {
      for (let x = 0; x < drawProps.width; x++) {
        drawProps.ctx.fillStyle = '#2f3542'
        drawProps.ctx.fillRect(x * factor, y * factor, factor, factor)
      }
    }

    drawProps.ctx.fillStyle = '#57606f'
    config.walls.forEach(w => {
      const [x, y] = w.split('|').map(Number)

      drawProps.ctx.fillRect(x * factor, y * factor, factor, factor)
    })

    drawProps.ctx.fillStyle = '#1e90ff'
    config.boxes.forEach(b => {
      const [x, y] = b.split('|').map(Number)

      drawProps.ctx.fillRect(x * factor, y * factor, factor, factor)
    })

    drawProps.ctx.fillStyle = '#ff6348'
    const [x, y] = config.robot.split('|').map(Number)
    drawProps.ctx.fillRect(x * factor, y * factor, factor, factor)

    window.requestAnimationFrame(() => drawConfig(drawProps))
  }

  const draw = (partTwo: boolean) => {
    const canvas = document.getElementById(partTwo ? 'partTwo' : 'partOne') as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const drawProps = {
      width: partTwo ? props.width : props.width / 2,
      configs: partTwo ? props.partTwo : props.partOne,
      index: 0,
      canvas,
      ctx,
    }
    // Initialise the canvas
    drawProps.canvas.width = drawProps.width * factor + 1
    drawProps.canvas.height = props.height * factor + 1
    // Offset for better drawing accuracy
    drawProps.ctx.translate(0.5, 0.5)
    drawProps.ctx.lineWidth = 0.5

    drawProps.ctx.fillStyle = '#222222'
    drawProps.ctx.fillRect(0, 0, drawProps.canvas.width, drawProps.canvas.height)

    window.requestAnimationFrame(() => drawConfig(drawProps))
  }

  onMounted(() => {
    draw(false)
    draw(true)
  })
</script>

<style scoped>
.canvas-holder {
  overflow: auto;
  height: auto;
  width: 100%;
}
</style>
