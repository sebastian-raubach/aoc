<template>
  <div class="canvas-holder">
    <canvas id="partOne" class="canvas" height="1000" width="1000" />
  </div>
</template>

<script lang="ts" setup>
  import { Position2d } from '@/plugins/types/Position2d'
  import { createMultiColorGradient, VIRIDIS } from '@/plugins/color'

  const props = defineProps<{
    grid: string[][],
    start: Position2d,
    path: Position2d[],
    enclosed: Position2d[],
  }>()

  const drawProps = {
    gradient: [],
    pathIndex: 0,
    enclosedIndex: 0,
    factor: 7,
  }
  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D

  const draw = () => {
    drawProps.gradient = createMultiColorGradient(VIRIDIS, Math.ceil(props.path.length / 2))

    // Initialise the canvas
    canvas = document.getElementById('partOne') as HTMLCanvasElement
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    // Set the canvas size
    canvas.width = props.grid[0].length * drawProps.factor
    canvas.height = props.grid.length * drawProps.factor
    ctx.fillStyle = '#222222'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.lineWidth = drawProps.factor / 4

    for (let row = 0; row < props.grid.length; row++) {
      for (let col = 0; col < props.grid[row].length; col++) {
        let pipe = props.grid[row][col]

        if (row === props.start.y && col === props.start.x) {
          pipe = 'S'
        }

        ctx.strokeStyle = '#34495e'
        ctx.fillStyle = '#34495e'
        drawPipe(col, row, pipe)
      }
    }

    window.requestAnimationFrame(() => drawPath())
  }
  const drawPath = () => {
    const i = drawProps.pathIndex
    const s = props.path[i]
    const sp = props.grid[s.y][s.x]
    const e = props.path[props.path.length - i - 1]
    const ep = props.grid[e.y][e.x]

    if ((s.x === e.x && s.y) === e.y || i === Math.floor(props.path.length / 2)) {
      ctx.fillStyle = '#e74c3c'
      ctx.strokeStyle = '#e74c3c'
    } else {
      // @ts-ignore
      const color: string = drawProps.gradient[i]
      ctx.strokeStyle = color
      ctx.fillStyle = color
    }

    drawPipe(s.x, s.y, sp)
    drawPipe(e.x, e.y, ep)

    if (i < props.path.length / 2) {
      drawProps.pathIndex++
      window.requestAnimationFrame(() => drawPath())
    } else {
      const sorted = props.enclosed.concat().sort((a: Position2d, b: Position2d) => Math.sign((a.x + a.y) - (b.x + b.y)))
      window.requestAnimationFrame(() => drawEnclosed(sorted))
    }
  }
  const drawEnclosed = (enclosed: Position2d[]) => {
    ctx.strokeStyle = '#25CCF7'
    ctx.fillStyle = '#25CCF7'

    const e = enclosed[drawProps.enclosedIndex]

    drawPipe(e.x, e.y, props.grid[e.y][e.x])

    if (drawProps.enclosedIndex < enclosed.length - 1) {
      drawProps.enclosedIndex++
      window.requestAnimationFrame(() => drawEnclosed(enclosed))
    }
  }
  const drawPipe = (x: number, y: number, pipe: string) => {
    switch (pipe) {
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
        ctx.beginPath()
        ctx.arc(x * drawProps.factor + drawProps.factor / 2, y * drawProps.factor + drawProps.factor / 2, drawProps.factor / 4, 0, 2 * Math.PI)
        ctx.fill()
        break
      case 'S':
        ctx.fillStyle = '#e74c3c'
        ctx.fillRect(x * drawProps.factor, y * drawProps.factor, drawProps.factor, drawProps.factor)
        break
    }
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
