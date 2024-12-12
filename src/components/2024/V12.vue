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
  import { createMultiColorGradient, VIRIDIS } from '@/plugins/color'
  import { Position2d } from '@/plugins/types/Position2d'
  import { Area, Fence } from '@/components/2024/D12.vue'

  const props = defineProps<{
    grid: string[][]
    areas: Area[]
  }>()

  const draw = (id: string, isTwo: boolean) => {
    const width = props.grid[0].length
    const height = props.grid.length
    const factor = 7

    // Initialise the canvas
    const canvas: HTMLCanvasElement = document.getElementById(id) as HTMLCanvasElement
    canvas.width = width * factor + 1
    canvas.height = height * factor + 1
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D
    // Offset for better drawing accuracy
    ctx.translate(0.5, 0.5)
    ctx.lineWidth = 0.5
    ctx.strokeStyle = 'white'

    let maxValue = 0
    props.areas.forEach((area: Area) => {
      maxValue = Math.max(maxValue, area.coords.length * area.fences.length + 1)
    })

    const fg = createMultiColorGradient(VIRIDIS, maxValue)

    props.areas.forEach((area: Area) => {
      ctx.fillStyle = fg[area.coords.length * (isTwo ? area.sideCount : area.fences.length)]

      area.coords.forEach((c: Position2d) => {
        ctx.fillRect(c.x * factor, c.y * factor, factor, factor)
      })

      area.fences.forEach((f: Fence) => {
        ctx.beginPath()
        if (f.orientation === 'v') {
          ctx.moveTo(Math.ceil(f.x) * factor, f.y * factor)
          ctx.lineTo(Math.ceil(f.x) * factor, (f.y + 1) * factor)
        } else {
          ctx.moveTo(f.x * factor, Math.ceil(f.y) * factor)
          ctx.lineTo((f.x + 1) * factor, Math.ceil(f.y) * factor)
        }
        ctx.stroke()
      })
    })
  }

  onMounted(() => {
    draw('partOne', false)
    draw('partTwo', true)
  })
</script>

<style scoped>
.canvas-holder {
  overflow: auto;
  height: auto;
  width: 100%;
}
</style>
