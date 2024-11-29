<template>
  <p class="text-info">The output below can be saved as a text file each and loaded into <a href="https://helium.hutton.ac.uk">Helium</a> to visualize the graph structure as well as the importance of each node.</p>
  <v-row>
    <v-col cols="21" md="6">
      <pre class="year-2023-day-8-code border">
<code v-html="pedigreeFile" />
      </pre>
    </v-col>
    <v-col cols="21" md="6">
      <pre class="year-2023-day-8-code border">
<code v-html="traitFile" />
      </pre>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
  import { lcm } from '@/plugins/math'

  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  interface PedigreeMap {
    [key: string]: string[]
  }
  interface CountMap {
    [key: string]: number
  }

  const pedigreeFile = ref<string>()
  const traitFile = ref<string>()

  const solve = (start: string, instructions: number[], map: PedigreeMap, goals: string[]) => {
    let current: string = start
    let counter: number = 0
    const counts: CountMap = {}

    while (!goals.includes(current)) {
      counts[current] = (counts[current] || 0) + 1
      current = map[current][instructions[counter % instructions.length]]
      counter++
    }

    counts[current] = (counts[current] || 0) + 1

    return {
      visitCounts: counts,
      counter,
    }
  }
  const getTraitFile = (visitCounts: CountMap) => {
    let result = '#heliumInput = PHENOTYPE\nLineName\tVisitCount\tNodeType\n'

    Object.keys(visitCounts).forEach(l => {
      result += `${l}\t${visitCounts[l]}\t${l === 'AAA' ? 'start' : (l === 'ZZZ' ? 'end' : '')}\n`
    })

    return result
  }

  if (props.input) {
    const instructions: number[] = props.input[0].split('').map((i: string) => i === 'L' ? 0 : 1)

    const map: PedigreeMap = {}
    let pedigree = 'Line\tParent\n'
    const pattern = /(?<from>[A-Z]+) = \((?<left>[A-Z]+), (?<right>[A-Z]+)\)/
    for (let i = 2; i < props.input.length; i++) {
      const res = props.input[i].match(pattern)?.groups

      if (res) {
        map[res.from] = [res.left, res.right]
        pedigree += `${res.left}\t${res.from}\n`
        pedigree += `${res.right}\t${res.from}\n`
      }
    }
    pedigreeFile.value = pedigree

    const p1 = solve('AAA', instructions, map, ['ZZZ'])
    const pOne = p1.counter

    traitFile.value = getTraitFile(p1.visitCounts)

    const starts: string[] = Object.keys(map).filter(k => k.endsWith('A'))
    const goals: string[] = Object.keys(map).filter(k => k.endsWith('Z'))

    const counts = starts.map(s => solve(s, instructions, map, goals).counter)

    const pTwo = lcm(counts)

    emit('onFinished', pOne, pTwo)
  }
</script>

<style scoped>
.year-2023-day-8-code {
  background-color: #2c3e50;
  color: #7f8c8d;
  max-height: 300px;
}
</style>
