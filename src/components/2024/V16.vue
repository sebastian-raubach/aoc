<template>
  <div id="holder" class="canvas-holder">
    <canvas id="partOne" class="canvas" height="500" width="500" />
  </div>
</template>

<script lang="ts" setup>
  import { createColorGradient, createMultiColorGradient, VIRIDIS } from '@/plugins/color'
  import { State } from '@/components/2024/D16.vue'

  const props = defineProps<{
    grid: string[][]
    path: State[]
    onPath: Set<string>
  }>()

  const draw = () => {
    const factor = Math.max(1, Math.floor((document.getElementById('holder')?.offsetWidth || 1) / props.grid[0].length))

    const canvas: HTMLCanvasElement = document.getElementById('partOne') as HTMLCanvasElement
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D

    // Initialise the canvas
    canvas.width = props.grid[0].length * factor + 1
    canvas.height = props.grid.length * factor + 1
    // Offset for better drawing accuracy
    ctx.translate(0.5, 0.5)
    ctx.lineWidth = 0.5

    ctx.fillStyle = '#222222'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let y = 0; y < props.grid.length; y++) {
      for (let x = 0; x < props.grid[y].length; x++) {
        if (props.grid[y][x] === '.') {
          ctx.fillStyle = '#2f3542'
        } else if (props.grid[y][x] === '#') {
          ctx.fillStyle = '#57606f'
        }

        ctx.fillRect(x * factor, y * factor, factor, factor)
      }
    }

    const fg = createMultiColorGradient(VIRIDIS, props.path[props.path.length - 1].cost + 1)
    const bg = createColorGradient('#ced6e0', '#747d8c', props.onPath.size + 1)

    props.path.forEach(s => {
      ctx.fillStyle = fg[s.cost]
      ctx.fillRect(s.position.x * factor, s.position.y * factor, factor, factor)
    })

    // ctx.fillStyle = '#ced6e0'
    let counter = 0
    props.onPath.forEach(o => {
      ctx.fillStyle = bg[counter++]
      const [x, y] = o.split('|').map(Number)
      ctx.beginPath()
      ctx.arc(x * factor + factor / 2, y * factor + factor / 2, factor / 4, 0, 2 * Math.PI)
      ctx.fill()
    })
  }

  onMounted(() => draw())
</script>

<style scoped>
.canvas-holder {
  overflow: auto;
  height: auto;
  width: 100%;
}
</style>
