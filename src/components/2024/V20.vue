<template>
  <div id="holderOne" class="canvas-holder">
    <canvas id="partOne" class="canvas" height="500" width="500" />
  </div>
</template>

<script lang="ts" setup>
  import { createMultiColorGradient, VIRIDIS } from '@/plugins/color'
  import { Shortcut } from '@/components/2024/D20.vue'
  import { Position2d } from '@/plugins/types/Position2d'

  const props = defineProps<{
    width: number
    height: number
    path: Position2d[]
    walls: Set<string>
    sOne: Shortcut[]
  }>()

  const drawOne = () => {
    const factor = Math.max(1, Math.floor((document.getElementById('holderOne')?.offsetWidth || 1) / props.width))

    const canvas: HTMLCanvasElement = document.getElementById('partOne') as HTMLCanvasElement
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D

    // Initialise the canvas
    canvas.width = props.width * factor + 1
    canvas.height = props.height * factor + 1
    // Offset for better drawing accuracy
    ctx.translate(0.5, 0.5)
    ctx.lineWidth = 1

    ctx.fillStyle = '#222222'
    ctx.strokeStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#2f3542'
    props.walls.forEach(w => {
      const [x, y] = w.split('|').map(Number)
      ctx.fillRect(x * factor, y * factor, factor, factor)
    })

    const fg = createMultiColorGradient(VIRIDIS, props.path.length + 1)

    props.path.forEach((p, i) => {
      ctx.fillStyle = fg[i]
      ctx.fillRect(p.x * factor, p.y * factor, factor, factor)
    })

    props.sOne.forEach(s => {
      const x1 = s.path[0].x + 0.5
      const x2 = s.path[1].x + 0.5
      const y1 = s.path[0].y + 0.5
      const y2 = s.path[1].y + 0.5
      ctx.beginPath()
      ctx.moveTo(x1 * factor, y1 * factor)
      ctx.lineTo(x2 * factor, y2 * factor)
      const deltaX = Math.sign(s.path[0].x - s.path[1].x)
      const deltaY = Math.sign(s.path[0].y - s.path[1].y)
      if (deltaY === 0) {
        ctx.lineTo((x2 + 0.5 * deltaX) * factor, (y2 - 0.5) * factor)
        ctx.moveTo(x2 * factor, y2 * factor)
        ctx.lineTo((x2 + 0.5 * deltaX) * factor, (y2 + 0.5) * factor)
      } else if (deltaX === 0) {
        ctx.lineTo((x2 - 0.5) * factor, (y2 + 0.5 * deltaY) * factor)
        ctx.moveTo(x2 * factor, y2 * factor)
        ctx.lineTo((x2 + 0.5) * factor, (y2 + 0.5 * deltaY) * factor)
      }
      ctx.stroke()
    })
  }

  onMounted(() => drawOne())
</script>

<style scoped>
.canvas-holder {
  overflow: auto;
  height: auto;
  width: 100%;
}
</style>
