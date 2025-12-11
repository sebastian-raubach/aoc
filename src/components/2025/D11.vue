<template>
  <p class="text-info">The output below can be saved as a text file each and loaded into <a href="https://helium.hutton.ac.uk">Helium</a> to visualize the graph structure as well as the importance of each node.</p>
  <v-row>
    <v-col cols="21" md="6">
      <pre class="year-2025-day-11-code border pa-2">
<code v-html="pedigreeFile" />
      </pre>
    </v-col>
    <v-col cols="21" md="6">
      <pre class="year-2025-day-11-code border pa-2">
<code v-html="traitFile" />
      </pre>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  const pedigreeFile = ref<string>()
  const traitFile = ref<string>()

  const run = () => {
    if (props.input) {
      let pOne = 0
      let pTwo = 0

      const devices: Map<string, string[]> = new Map()
      props.input.forEach((s: string) => {
        const [left, right] = s.split(': ')

        devices.set(left, right.split(' '))
      })

      // Output the pedigree file
      let heliumString = '#heliumInput = PEDIGREE\nLine\tParent'
      devices.forEach((ns, n) => {
        ns.forEach(nn => {
          heliumString += `\n${nn}\t${n}`
        })
      })
      pedigreeFile.value = heliumString

      // Part one is all paths from 'you' to 'out'
      const memo = new Map()
      pOne = countPaths(devices, 'you', 'out', memo)

      // Output the "trait" file containing the counts
      let heliumTraits = '#heliumInput = PHENOTYPE\nLine\tCount=n'
      memo.forEach((count, node) => {
        if (node !== 'you') {
          heliumTraits += `\n${node}\t${count}`
        }
      })
      traitFile.value = heliumTraits

      // For part two we have two options svr->fft->dac->out or svr->dac->fft->out, so for each, calculate the number of sub-paths,
      // then multiply them together. At the end sum up both option counts.
      pTwo = countPaths(devices, 'svr', 'fft', new Map()) * countPaths(devices, 'fft', 'dac', new Map()) * countPaths(devices, 'dac', 'out', new Map()) +
        countPaths(devices, 'svr', 'dac', new Map()) * countPaths(devices, 'dac', 'fft', new Map()) * countPaths(devices, 'fft', 'out', new Map())

      emit('onFinished', pOne, pTwo)
    }
  }

  function countPaths (devices: Map<string, string[]>, current: string, dest: string, memo: Map<string, number>): number {
    if (current === dest) {
      // Destination reached => 1 path
      return 1
    }
    if (memo.has(current)) {
      // If we've already processed this one, look up the path count
      return memo.get(current) || 0
    }

    // Otherwise, keep looking. Sum up the counts from all "children".
    const count = devices.get(current)?.map(n => countPaths(devices, n, dest, memo)).reduce((a, b) => a + b) || 0
    // Remember to set the result
    memo.set(current, count)

    // Then return
    return count
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>

<style scoped>
.year-2025-day-11-code {
  max-height: 300px;
}
</style>
