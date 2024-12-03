<template>
  <div class="canvas-holder">
    <canvas id="partOne" class="canvas" height="1000" width="1000" />
  </div>
</template>

<script lang="ts" setup>
  import { createMultiColorGradient, VIRIDIS } from '@/plugins/color'
  import { GridMap, Location } from '@/components/2023/D16.vue'

  const props = defineProps<{
    grid: GridMap
    path: Location[][]
    width: number
    height: number
  }>()

  const drawProps = {
    gradient: [],
    factor: 7,
    pathIndex: 0,
  }
  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D

  const drawPath = () => {
    const cells = props.path[drawProps.pathIndex]

    const color = drawProps.gradient[drawProps.pathIndex]
    ctx.strokeStyle = color
    ctx.fillStyle = color

    cells.forEach(c => {
      let pipe = props.grid[`${c.pos.x}|${c.pos.y}`]

      if (pipe === '.') {
        if (c.delta.x !== 0) {
          pipe = '-'
        } else {
          pipe = '|'
        }
      }
      if (pipe === '-') {
        if (c.delta.y > 0) {
          pipe = '┴'
        } else if (c.delta.y < 0) {
          pipe = 'T'
        }
      }
      if (pipe === '|') {
        if (c.delta.x > 0) {
          pipe = '┤'
        } else if (c.delta.x < 0) {
          pipe = '├'
        }
      }
      if (pipe === '/') {
        if (c.delta.x > 0 || c.delta.y > 0) {
          pipe = 'J'
        } else {
          pipe = 'F'
        }
      }
      if (pipe === '\\') {
        if (c.delta.x > 0 || c.delta.y < 0) {
          pipe = '7'
        } else {
          pipe = 'L'
        }
      }

      drawPipe(c.pos.x, c.pos.y, pipe)
    })

    if (drawProps.pathIndex < props.path.length - 1) {
      drawProps.pathIndex++
      window.requestAnimationFrame(() => drawPath())
    }
  }

  const drawPipe = (x: number, y: number, pipe: string) => {
    switch (pipe) {
      case '├':
        ctx.beginPath()
        ctx.moveTo(x * drawProps.factor + drawProps.factor / 2, y * drawProps.factor)
        ctx.lineTo(x * drawProps.factor + drawProps.factor / 2, (y + 1) * drawProps.factor)
        ctx.moveTo(x * drawProps.factor + drawProps.factor / 2, (y + 0.5) * drawProps.factor)
        ctx.lineTo((x + 1) * drawProps.factor, (y + 0.5) * drawProps.factor)
        ctx.stroke()
        break
      case '┤':
        ctx.beginPath()
        ctx.moveTo(x * drawProps.factor + drawProps.factor / 2, y * drawProps.factor)
        ctx.lineTo(x * drawProps.factor + drawProps.factor / 2, (y + 1) * drawProps.factor)
        ctx.moveTo(x * drawProps.factor + drawProps.factor / 2, (y + 0.5) * drawProps.factor)
        ctx.lineTo(x * drawProps.factor, (y + 0.5) * drawProps.factor)
        ctx.stroke()
        break
      case 'T':
        ctx.beginPath()
        ctx.moveTo(x * drawProps.factor, y * drawProps.factor + drawProps.factor / 2)
        ctx.lineTo((x + 1) * drawProps.factor, y * drawProps.factor + drawProps.factor / 2)
        ctx.moveTo((x + 0.5) * drawProps.factor, y * drawProps.factor + drawProps.factor / 2)
        ctx.lineTo((x + 0.5) * drawProps.factor, (y + 1) * drawProps.factor)
        ctx.stroke()
        break
      case '┴':
        ctx.beginPath()
        ctx.moveTo(x * drawProps.factor, y * drawProps.factor + drawProps.factor / 2)
        ctx.lineTo((x + 1) * drawProps.factor, y * drawProps.factor + drawProps.factor / 2)
        ctx.moveTo((x + 0.5) * drawProps.factor, y * drawProps.factor + drawProps.factor / 2)
        ctx.lineTo((x + 0.5) * drawProps.factor, y * drawProps.factor)
        ctx.stroke()
        break
      case 'F':
        ctx.beginPath()
        ctx.arc((x + 1) * drawProps.factor, (y + 1) * drawProps.factor, drawProps.factor / 2, Math.PI, 1.5 * Math.PI)
        ctx.stroke()
        break
      case 'J':
        ctx.beginPath()
        ctx.arc(x * drawProps.factor, y * drawProps.factor, drawProps.factor / 2, 0, 0.5 * Math.PI)
        ctx.stroke()
        break
      case '7':
        ctx.beginPath()
        ctx.arc(x * drawProps.factor, (y + 1) * drawProps.factor, drawProps.factor / 2, 1.5 * Math.PI, 0)
        ctx.stroke()
        break
      case 'L':
        ctx.beginPath()
        ctx.arc((x + 1) * drawProps.factor, y * drawProps.factor, drawProps.factor / 2, 0.5 * Math.PI, Math.PI)
        ctx.stroke()
        break
      case '/':
        ctx.beginPath()
        ctx.moveTo(x * drawProps.factor + drawProps.factor / 8, (y + 1) * drawProps.factor - drawProps.factor / 8)
        ctx.lineTo((x + 1) * drawProps.factor - drawProps.factor / 8, y * drawProps.factor + drawProps.factor / 8)
        ctx.stroke()
        break
      case '\\':
        ctx.beginPath()
        ctx.moveTo(x * drawProps.factor + drawProps.factor / 8, y * drawProps.factor + drawProps.factor / 8)
        ctx.lineTo((x + 1) * drawProps.factor - drawProps.factor / 8, (y + 1) * drawProps.factor - drawProps.factor / 8)
        ctx.stroke()
        break
      case '|':
        ctx.beginPath()
        ctx.moveTo(x * drawProps.factor + drawProps.factor / 2, y * drawProps.factor)
        ctx.lineTo(x * drawProps.factor + drawProps.factor / 2, (y + 1) * drawProps.factor)
        ctx.stroke()
        break
      case '-':
        ctx.beginPath()
        ctx.moveTo(x * drawProps.factor, y * drawProps.factor + drawProps.factor / 2)
        ctx.lineTo((x + 1) * drawProps.factor, y * drawProps.factor + drawProps.factor / 2)
        ctx.stroke()
        break
      case '.':
        // ctx.beginPath()
        // ctx.arc(x * drawProps.factor + drawProps.factor / 2, y * drawProps.factor + drawProps.factor / 2, drawProps.factor / 4, 0, 2 * Math.PI)
        // ctx.fill()
        break
    }
  }

  const draw = () => {
    drawProps.gradient = createMultiColorGradient(VIRIDIS, Math.ceil(props.path.length / 2))

    // Initialise the canvas
    canvas = document.getElementById('partOne') as HTMLCanvasElement
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    // Set the canvas size
    drawProps.factor = 9
    canvas.width = props.width * drawProps.factor
    canvas.height = props.height * drawProps.factor
    ctx.fillStyle = '#222222'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.lineWidth = drawProps.factor / 4

    for (let row = 0; row < props.height; row++) {
      for (let col = 0; col < props.width; col++) {
        const pipe = props.grid[`${col}|${row}`]

        ctx.strokeStyle = '#34495e'
        ctx.fillStyle = '#34495e'
        drawPipe(col, row, pipe)
      }
    }

    drawProps.pathIndex = 0
    window.requestAnimationFrame(() => drawPath())
  }

  onMounted(() => draw())
</script>

<style scoped>
.canvas-holder {
  overflow: auto;
  height: 1000px;
  width: 100%;
}
</style>
