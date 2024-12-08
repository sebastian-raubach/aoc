<template>
  <v-row>
    <v-col cols="12" md="6">
      <div class="canvas-holder">
        <canvas id="partOne" class="canvas" height="500" width="500" />
      </div>
    </v-col>
    <v-col cols="12" md="6">
      <div class="canvas-holder">
        <canvas id="partTwo" class="canvas" height="500" width="500" />
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
  import { createColorGradient, createMultiColorGradient, VIRIDIS } from '@/plugins/color'
  import { Position2d } from '@/plugins/types/Position2d'

  const props = defineProps<{
    height: number
    width: number
    antennas: Map<string, Position2d[]>
    antinodesOne: Map<string, Set<string>>
    antinodesTwo: Map<string, Set<string>>
  }>()

  const draw = (canvasId: string, antinodes: Map<string, Set<string>>) => {
    const bgGradient = createColorGradient('#353c4a', '#2f3542', 10)
    const fgGradient = createMultiColorGradient(VIRIDIS, props.antennas.size)
    const factor = 10

    // Initialise the canvas
    const canvas: HTMLCanvasElement = document.getElementById(canvasId) as HTMLCanvasElement
    canvas.width = props.width * factor
    canvas.height = props.height * factor
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D
    // Offset for better drawing accuracy
    ctx.translate(0.5, 0.5)
    ctx.lineWidth = 1

    // Set the canvas size
    ctx.fillStyle = '#222222'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let y = 0; y < props.height; y++) {
      for (let x = 0; x < props.width; x++) {
        ctx.fillStyle = bgGradient[Math.floor(Math.random() * 10)]
        ctx.fillRect(x * factor, y * factor, factor, factor)
      }
    }

    let counter = 0
    props.antennas.forEach((value: Position2d[], key: string) => {
      ctx.fillStyle = fgGradient[counter++]
      value.forEach(v => ctx.fillRect(v.x * factor, v.y * factor, factor, factor))

      antinodes.get(key)?.forEach((s: string) => {
        const [x, y] = s.split('|').map(Number)

        ctx.beginPath()
        ctx.arc(x * factor + factor / 2, y * factor + factor / 2, factor / 4, 0, 2 * Math.PI)
        ctx.fill()
      })
    })
  }

  onMounted(() => {
    draw('partOne', props.antinodesOne)
    draw('partTwo', props.antinodesTwo)
  })
</script>

<style scoped>
.canvas-holder {
  overflow: auto;
  height: 510px;
  width: 100%;
}
</style>
