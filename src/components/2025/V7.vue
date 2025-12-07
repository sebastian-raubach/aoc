<template>
  <div class="canvas-holder">
    <canvas id="partOne" class="canvas" height="1040" width="1040" />
  </div>
</template>

<script lang="ts" setup>
  import { createColorGradient, createMultiColorGradient, VIRIDIS } from '@/plugins/color'
  import { euclidean, manhattan } from '@/plugins/math'
  import { Position2d } from '@/plugins/types/Position2d'

  export interface VizProps {
    splitters: Set<string>
    visitedSplitters: Set<string>
    height: number
    width: number
    start: Position2d
    visited: Set<string>
  }

  const props = defineProps<VizProps>()

  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D

  interface DrawProps {
    bgGradient: string[]
    fgGradient: string[]
    factor: number
    pathIndex: number
  }

  const drawProps: DrawProps = {
    bgGradient: [],
    fgGradient: [],
    factor: 8,
    pathIndex: 0,
  }

  // const drawPath = () => {
  //   const i = drawProps.pathIndex

  //   ctx.fillStyle = drawProps.fgGradient[i]
  //   ctx.fillRect(props.path[i].x * drawProps.factor, props.path[i].y * drawProps.factor, drawProps.factor, drawProps.factor)

  //   if (i < props.path.length - 1) {
  //     drawProps.pathIndex++
  //     window.requestAnimationFrame(() => drawPath())
  //   } else {
  //     const sorted: Map<number, Position2d[]> = new Map()
  //     const keys: Set<number> = new Set()

  //     props.obstacles.forEach(o => {
  //       const distance = manhattan(o, { x: Math.floor(props.width / 2), y: Math.floor(props.height / 2) })
  //       keys.add(distance)

  //       let atDistance = sorted.get(distance)

  //       if (!atDistance) {
  //         atDistance = [o]
  //       } else {
  //         atDistance.push(o)
  //       }

  //       sorted.set(distance, atDistance)
  //     })

  //     // const sorted = props.obstacles.concat().sort((a: Position2d, b: Position2d) => Math.sign((a.x + a.y) - (b.x + b.y)))
  //     window.requestAnimationFrame(() => drawObstacles(sorted, [...keys].sort((a, b) => a - b)))
  //   }
  // }

  let sorted: Position2d[]

  const draw = () => {
    drawProps.pathIndex = 0
    drawProps.bgGradient = createColorGradient('#57606f', '#2f3542', Math.ceil(manhattan({ x: 0, y: 0 }, { x: Math.ceil(props.width / 2), y: Math.ceil(props.height / 2) })) + 1)
    drawProps.fgGradient = createMultiColorGradient(VIRIDIS, props.height)

    // Initialise the canvas
    canvas = document.getElementById('partOne') as HTMLCanvasElement
    canvas.width = props.width * drawProps.factor
    canvas.height = props.height * drawProps.factor
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    // Offset for better drawing accuracy
    ctx.translate(0.5, 0.5)
    ctx.lineWidth = 1

    // Set the canvas size
    ctx.fillStyle = '#222222'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let y = 0; y < props.height; y++) {
      for (let x = 0; x < props.width; x++) {
        const distance = manhattan({ x, y }, { x: Math.ceil(props.width / 2), y: Math.ceil(props.height / 2) })
        ctx.fillStyle = drawProps.bgGradient[distance]
        ctx.fillRect(x * drawProps.factor, y * drawProps.factor, drawProps.factor, drawProps.factor)
      }
    }

    ctx.fillStyle = '#a4b0be'
    props.splitters.forEach(o => {
      const [x, y] = o.split('|').map(Number)
      ctx.fillRect(x * drawProps.factor, y * drawProps.factor, drawProps.factor, drawProps.factor)
    })

    ctx.fillStyle = '#f1c40f'
    props.visitedSplitters.forEach(o => {
      const [x, y] = o.split('|').map(Number)
      ctx.fillRect(x * drawProps.factor, y * drawProps.factor, drawProps.factor, drawProps.factor)
    })

    sorted = [...props.visited].map(v => {
      const [x, y] = v.split('|').map(Number)

      return { x, y }
    }).sort((a: Position2d, b: Position2d) => a.y - b.y || a.x - b.x)

    window.requestAnimationFrame(() => drawPath())
  }

  function drawPath () {
    const i = drawProps.pathIndex

    const ys = sorted.filter(s => s.y === drawProps.pathIndex)

    ctx.fillStyle = drawProps.fgGradient[i]

    ys.forEach(yy => {
      ctx.beginPath()
      ctx.arc(yy.x * drawProps.factor + drawProps.factor / 2, yy.y * drawProps.factor + drawProps.factor / 2, drawProps.factor / 4, 0, 2 * Math.PI)
      ctx.fill()
    })

    if (i < props.height) {
      drawProps.pathIndex++
      window.requestAnimationFrame(() => drawPath())
    }
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
