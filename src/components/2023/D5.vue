<template>
  <div ref="chartDiv" />
</template>

<script lang="ts" setup>
  import { VIRIDIS } from '@/plugins/color'
  import { coreStore } from '@/stores/app'
  // @ts-ignore
  import Plotly from 'plotly.js/lib/core'
  // @ts-ignore
  import parcoords from 'plotly.js/lib/parcoords'
  // Only register the chart types we're actually using to reduce the final bundle size
  Plotly.register([
    parcoords,
  ])

  // @ts-ignore
  const chartDiv: HTMLDivElement = ref<HTMLDivElement>()

  let media: MediaQueryList
  const systemTheme = ref('dark')
  const store = coreStore()
  let themeColor = 'black'
  let gridColor = '#111111'
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    themeColor = 'white'
    gridColor = '#eeeeee'
  } else {
    themeColor = store.theme === 'dark' ? 'white' : 'black'
    gridColor = store.theme === 'dark' ? '#eeeeee' : '#111111'
  }

  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  interface Node {
    from: number
    to: number
    size: number
  }
  interface Trace {
    value: number
    trace: number[]
  }

  const solve = (mapping: Node[][], s: number): Trace => {
    let current: number = s
    const trace = [s]
    for (let i = 0; i < mapping.length; i++) {
      for (let j = 0; j < mapping[i].length; j++) {
        const rule: Node = mapping[i][j]
        if (current >= rule.from && current <= rule.from + rule.size) {
          current = rule.to + Math.abs(current - rule.from)
          break
        }
      }

      trace.push(current)
    }
    return {
      value: current,
      trace,
    }
  }

  const plot = (data: number[][]) => {
    // @ts-ignore
    Plotly.purge(chartDiv.value)

    const dims = ['seeds', 'seeds-to-soil', 'soil-to-fertilizer', 'fertilizer-to-water', 'water-to-light', 'light-to-temperature', 'temperature-to-humidity', 'humidity-to-location']
    const colors = VIRIDIS

    const traces = [{
      type: 'parcoords',
      line: {
        color: [] as number[],
        colorscale: colors.map((c, i) => [i / (colors.length - 1), c]),
      },
      dimensions: dims.map(d => {
        return {
          label: d,
          values: [] as number[],
          range: [Number.MAX_SAFE_INTEGER, -Number.MAX_SAFE_INTEGER],
        }
      }),
    }]

    data.forEach((d: number[]) => {
      d.forEach((p: number, i: number) => {
        const dim = traces[0].dimensions[i]
        dim.values.push(p)
        dim.range[0] = Math.min(dim.range[0], p)
        dim.range[1] = Math.max(dim.range[1], p)
      })
    })

    data.forEach(d => {
      const v = d[d.length - 1]
      const dim = traces[0].dimensions[traces[0].dimensions.length - 1]

      traces[0].line.color.push((v - dim.range[0]) / (dim.range[1] - dim.range[0]))
    })

    // @ts-ignore
    Plotly.newPlot(chartDiv.value, traces, {
      height: 600,
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      xaxis: {
        tickfont: { color: themeColor },
        gridcolor: gridColor,
      },
      yaxis: {
        title: { text: 'Ranking', font: { color: themeColor } },
        tickfont: { color: themeColor },
        gridcolor: gridColor,
      },
    }, {
      responsive: true,
      displaylogo: false,
    })
  }

  const run = () => {
    if (props.input) {
      const seeds: number[] = props.input[0].split(': ')[1].split(' ').map(Number)
      const mapping: Node[][] = []

      let current: Node[] = []
      for (let i = 2; i < props.input.length; i++) {
        if (props.input[i] === '') {
          mapping.push(current)
          current = []
          i++
        } else {
          const [destination, source, size] = props.input[i].split(' ').map(Number)
          current.push({
            from: source,
            to: destination,
            size,
          })
        }
      }

      mapping.push(current)

      const traces: number[][] = []
      const pOne = seeds.map((s: number) => {
        const result: Trace = solve(mapping, s)
        traces.push(result.trace)
        return result.value
      }).sort((a, b) => a - b)[0]

      nextTick(() => plot(traces))

      let min = Number.MAX_SAFE_INTEGER
      for (let i = 1; i < seeds.length; i += 2) {
        const start = seeds[i - 1]
        const size = seeds[i]
        for (let j = 0; j < size; j++) {
          min = Math.min(min, solve(mapping, start + j).value)
        }
      }

      emit('onFinished', pOne, min)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })

  watch(() => store.theme, (value: string) => {
    if (value === 'system') {
      media = window.matchMedia('(prefers-color-scheme: dark)')
      media.addEventListener('change', onThemeChange)
      onThemeChange()
    } else if (media) {
      media.removeEventListener('change', onThemeChange)
    }

    // @ts-ignore
    if (chartDiv.value) {
      const theme = value === 'system' ? systemTheme.value : value
      const themeColor = theme === 'dark' ? 'white' : 'black'
      const gridColor = theme === 'dark' ? '#eeeeee' : '#111111'
      try {
        // @ts-ignore
        Plotly.restyle(chartDiv.value, {
          'colorbar.tickfont.color': themeColor,
        }, [0])
        const layoutUpdate = {
          'xaxis.title.font.color': themeColor,
          'yaxis.title.font.color': themeColor,
          'xaxis.gridcolor': gridColor,
          'yaxis.gridcolor': gridColor,
        }
        // @ts-ignore
        chartDiv.value.layout.annotations.forEach((a, i) => {
          // @ts-ignore
          layoutUpdate[`annotations[${i}].font.color`] = themeColor
        })
        // @ts-ignore
        Plotly.relayout(chartDiv.value, layoutUpdate)
      } catch (e) {
        // Do nothing here
      }
    }
  }, { immediate: true })
  function onThemeChange () {
    systemTheme.value = media!.matches ? 'dark' : 'light'
  }
</script>

<style>

</style>
