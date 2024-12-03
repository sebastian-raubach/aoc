<template>
  <v-card>
    <v-card-text>
      <pre class="output" v-html="formattedHtmlPartOne" />
    </v-card-text>
  </v-card>

  <v-card>
    <v-card-text>
      <pre class="output" v-html="formattedHtmlPartTwo" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
  import { Match } from '@/components/2024/D3.vue'

  const props = defineProps<{
    input: string,
    matchesOne: Match[]
    matchesTwo: Match[]
  }>()

  const formattedHtmlPartOne: ComputedRef<string> = computed(() => {
    const chars = props.input.split('')

    props.matchesOne.concat().reverse().forEach((m: Match) => {
      chars.splice(m.index + m.length, 0, '</b>')
      chars.splice(m.index, 0, '<b class="match">')
    })

    let result = chars.join('')

    result = result.replaceAll('<', '&lt;')
    result = result.replaceAll('>', '&gt;')
    result = result.replaceAll('&lt;b class="match"&gt;', '<b class="match">')
    result = result.replaceAll('&lt;/b&gt;', '</b>')

    return result
  })

  const formattedHtmlPartTwo: ComputedRef<string> = computed(() => {
    const chars = props.input.split('')

    props.matchesTwo.concat().reverse().forEach((m: Match) => {
      chars.splice(m.index + m.length, 0, '</b>')
      chars.splice(m.index, 0, m.active ? '<b class="match">' : '<b class="match-disabled">')
    })

    let result = chars.join('')

    result = result.replaceAll('<', '&lt;')
    result = result.replaceAll('>', '&gt;')
    result = result.replaceAll('&lt;b class="match"&gt;', '<b class="match">')
    result = result.replaceAll('&lt;b class="match-disabled"&gt;', '<b class="match-disabled">')
    result = result.replaceAll('&lt;/b&gt;', '</b>')

    return result
  })
</script>

<style>
.output {
  white-space: pre-wrap;
  word-wrap: break-word;
  max-height: 50vh;
  color: #95a5a6;
}
.output .match {
  color: #27ae60;
}
.output .match-disabled {
  color: #c0392b;
}
</style>
