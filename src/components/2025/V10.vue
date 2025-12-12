<template>
  <div ref="holder" class="canvas-holder">
    <canvas id="partOne" class="canvas" height="1000" width="1000" />
  </div>
</template>

<script lang="ts" setup>
  import { createMultiColorGradient, VIRIDIS } from '@/plugins/color'
  import { Machine, SearchResult } from './D10.vue'
  import { useResizeObserver } from '@vueuse/core'

  export interface VizProps {
    machines: Machine[]
    solutions: SearchResult[]
  }

  const props = defineProps<VizProps>()

  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D

  const holder = useTemplateRef('holder')

  interface MachineDrawState extends Machine {
    indicatorHeat: number[]
    indicatorSteps: boolean[][]
    x: number
    y: number
  }

  interface DrawProps {
    fgGradient: string[]
    factor: number
  }

  const drawProps: DrawProps = {
    fgGradient: [],
    factor: 10,
  }

  useResizeObserver(holder, (entries: any) => {
    const entry = entries[0]
    const { width } = entry.contentRect
    draw(width)
  })

  const draw = (parentWidth?: number) => {
    let maxHeat = 0

    const drawStates: MachineDrawState[] = props.machines.map((m, mi) => {
      const drawState: MachineDrawState = JSON.parse(JSON.stringify(m)) as MachineDrawState

      drawState.indicatorHeat = drawState.indicators.map(() => 0)
      drawState.indicatorSteps = []

      let currentState = drawState.indicators.map(() => false)
      drawState.indicatorSteps.push(currentState)

      props.solutions[mi].pressedButtons.forEach(b => {
        currentState = currentState.concat()

        m.buttons[b].forEach(bb => {
          currentState[bb] = !currentState[bb]
          drawState.indicatorHeat[bb]++
        })

        maxHeat = Math.max(maxHeat, Math.max(...drawState.indicatorHeat))

        drawState.indicatorSteps.push(currentState)
      })

      return drawState
    })

    // const width = props.machines.map(m => m.indicators.length).reduce((a, b) => a + b) + props.machines.length - 1
    // const height = Math.max(...drawStates.map(ds => ds.indicatorSteps.length))

    // We're wrapping them at the max screen width (minus framework padding)
    console.log(parentWidth)
    const width = Math.floor((parentWidth || window.innerWidth) / drawProps.factor)
    const maxIndividualHeight = Math.max(...drawStates.map(ds => ds.indicatorSteps.length))
    let height = 0

    let x = 0
    let maxX = 0
    drawStates.forEach(ds => {
      if (x + ds.indicators.length >= width) {
        height += maxIndividualHeight + 2
        x = 0
      }

      ds.x = x
      ds.y = height

      maxX = Math.max(maxX, x + ds.indicators.length)

      x += (x === 0 ? 0 : 1) + ds.indicators.length
    })
    height -= 2

    drawProps.fgGradient = createMultiColorGradient(VIRIDIS, maxHeat + 1)

    // Initialise the canvas
    canvas = document.getElementById('partOne') as HTMLCanvasElement
    canvas.width = maxX * drawProps.factor
    canvas.height = height * drawProps.factor
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.lineWidth = 1

    // Set the canvas size
    ctx.fillStyle = '#222222'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // let xStart = 0
    drawStates.forEach((ds, i) => {
      // xStart += i === 0 ? 0 : (props.machines[i - 1].indicators.length + 1) * drawProps.factor
      const xStart = ds.x * drawProps.factor
      const yStart = ds.y * drawProps.factor

      ds.indicatorHeat.forEach((ih, ihi) => {
        const y = yStart

        const x = xStart + ihi * drawProps.factor

        ctx.fillStyle = drawProps.fgGradient[ih]
        ctx.fillRect(x, y, drawProps.factor, drawProps.factor)
      })

      ds.indicatorSteps.forEach((is, isi) => {
        const y = yStart + (isi + 1) * drawProps.factor

        is.forEach((isb, isbi) => {
          const x = xStart + isbi * drawProps.factor

          ctx.fillStyle = isb === true ? '#bdc3c7' : '#34495e'
          ctx.fillRect(x, y, drawProps.factor, drawProps.factor)
        })
      })
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
