<template>
  <div class="canvas-holder mb-5">
    <canvas id="partOne" class="canvas" :height="canvasHeight" :width="canvasWidth" />
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  const canvasWidth = ref<number>()
  const canvasHeight = ref<number>()

  let grid: string[][]

  interface Position {
    xStart: number
    xEnd: number
    y: number
    value: number
  }
  interface Symbol {
    x: number
    y: number
    touching: Position[]
    symbol: string
  }

  const numbers: Position[] = []
  const symbols: Symbol[] = []

  const run = () => {
    if (props.input) {
      grid = props.input.map((i: string) => i.split(''))

      grid.forEach((parts, y) => {
        const i = parts.join('')
        let xStart = null
        for (let x = 0; x < parts.length; x++) {
          if (parts[x] === '.') {
            // Dot
            if (xStart !== null) {
              numbers.push({
                xStart,
                xEnd: x - 1,
                y,
                value: +i.substring(xStart, x),
              })
              xStart = null
            }

            continue
          } else if (parts[x] === `${+parts[x]}`) {
            // Number
            if (xStart === null) {
              xStart = x
            }
          } else {
            // Symbol
            if (xStart !== null) {
              numbers.push({
                xStart,
                xEnd: x - 1,
                y,
                value: +i.substring(xStart, x),
              })
              xStart = null
            }

            symbols.push({ x, y, touching: [], symbol: parts[x] })
          }
        }

        if (xStart !== null) {
          numbers.push({
            xStart,
            xEnd: i.length - 1,
            y,
            value: +i.substring(xStart, i.length),
          })
          xStart = null
        }
      })

      const pOne = numbers.map(n => {
        let touches = false
        symbols.forEach(s => {
          if ((Math.abs(s.y - n.y) <= 1) && (s.x >= n.xStart - 1) && (s.x <= n.xEnd + 1)) {
            touches ||= true
            s.touching.push(n)
          }
        })

        return touches ? n.value : 0
      }).reduce((a, b) => a + b, 0)

      const pTwo = symbols.map(s => {
        if (s.symbol === '*' && s.touching.length === 2) {
          return s.touching[0].value * s.touching[1].value
        } else {
          return 0
        }
      }).reduce((a, b) => a + b, 0)

      nextTick(() => draw())

      emit('onFinished', pOne, pTwo)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })

  const draw = () => {
    // Initialise the canvas
    const canvas: HTMLCanvasElement = document.getElementById('partOne') as HTMLCanvasElement

    if (canvas) {
      const ctx = canvas.getContext('2d')

      if (ctx) {
        ctx.lineWidth = 1

        const factor = 10

        canvasWidth.value = grid[0].length * factor
        canvasHeight.value = grid.length * factor

        nextTick(() => {
          ctx.fillStyle = '#2c3e50'
          // @ts-ignore
          ctx.fillRect(0, 0, canvasWidth.value, canvasHeight.value)

          numbers.forEach(n => {
            ctx.fillStyle = '#006266'
            ctx.fillRect(n.xStart * factor, n.y * factor, factor * (n.xEnd - n.xStart + 1), factor)
          })

          symbols.forEach(s => {
            if (s.symbol === '*' && s.touching.length === 2) {
              ctx.fillStyle = '#FFC312'
              ctx.fillRect(s.x * factor, s.y * factor, factor, factor)
              ctx.fillStyle = '#A3CB38'
              s.touching.forEach(t => {
                ctx.fillRect(t.xStart * factor, t.y * factor, factor * (t.xEnd - t.xStart + 1), factor)
              })
            } else {
              ctx.fillStyle = '#EE5A24'
              ctx.fillRect(s.x * factor, s.y * factor, factor, factor)
            }
          })
        })
      }
    }
  }
</script>

<style>
.canvas-holder {
  overflow: auto;
  height: 1000px;
  width: 100%;
}
</style>
