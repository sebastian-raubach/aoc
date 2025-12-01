<template>
  <span />
</template>

<script lang="ts" setup>
  import { difference, intersect, union } from '@/plugins/set'

  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  interface EdgeCounts {
    [key: string]: number
  }

  const edgeCounts: EdgeCounts = {}
  const edges: Set<string> = new Set()
  let sorted: string[]
  const cliques: string[][] = []

  const isClique = (e: number[]) => {
    for (let i = 0; i < e.length; i++) {
      for (let j = i + 1; j < e.length; j++) {
        if (!edges.has(`${sorted[e[i]]}|${sorted[e[j]]}`)) {
          return false
        }
      }
    }

    return true
  }

  const findKCliqueFrom = (i: number, k: number, clique: number[]) => {
    for (let j = i + 1; j <= sorted.length - (k - clique.length); j++) {
      if (edgeCounts[sorted[j]] >= k - 1) {
        const temp = clique.concat()
        temp.push(j)

        if (isClique(temp)) {
          if (temp.length < k) {
            findKCliqueFrom(j, k, temp)
          } else {
            cliques.push(temp.map(t => sorted[t]))
          }
        }
      }
    }
  }

  const findKClique = (k: number) => {
    for (let i = 0; i < sorted.length - k; i++) {
      findKCliqueFrom(i, k, [i])
    }
  }

  const bronKerbosch = (edges: number[][]) => {
    edges = Array.from(edges)
    const nodes: Set<number> = new Set()
    edges.forEach(edge => nodes.add(edge[0]).add(edge[1]))
    if (nodes.size < 2) {
      return []
    }
    // Populate neighborhood map
    const neighbors = new Map()
    nodes.forEach(node => neighbors.set(node, new Set()))
    edges.forEach(edge => {
      neighbors.get(edge[0]).add(edge[1])
      neighbors.get(edge[1]).add(edge[0])
    })

    const cliques: number[][] = []
    // Recursively create cliques
    const f = (clique: Set<number>, candidates: Set<number>, excludedCandidates: Set<number>) => {
      if (!candidates.size && !excludedCandidates.size) {
        cliques.push(Array.from(clique))
      }
      let pivotNeighbors: Set<number> = new Set()
      union(candidates, excludedCandidates).forEach(candidate => {
        const t = intersect<number>(neighbors.get(candidate), candidates)
        if (t.size > pivotNeighbors.size) {
          pivotNeighbors = t
        }
      })
      difference<number>(candidates, pivotNeighbors).forEach(candidate => {
        const candidateNeighbors = neighbors.get(candidate)
        f(
          (new Set(clique)).add(candidate),
          intersect<number>(candidates, candidateNeighbors),
          intersect<number>(excludedCandidates, candidateNeighbors),
        )
        candidates.delete(candidate)
        excludedCandidates.add(candidate)
      })
    }
    f(new Set(), nodes, new Set())
    return cliques
  }

  const run = () => {
    if (props.input) {
      const nodes: Set<string> = new Set()
      props.input.forEach((s: string) => {
        const [from, to] = s.split('-')

        edges.add(`${from}|${to}`)
        edges.add(`${to}|${from}`)

        edgeCounts[from] = (edgeCounts[from] || 0) + 1
        edgeCounts[to] = (edgeCounts[to] || 0) + 1

        nodes.add(from)
        nodes.add(to)
      })

      sorted = [...nodes].sort((a, b) => a.localeCompare(b))

      // Part 1
      findKClique(3)
      const pOne = cliques.filter(c => c.some(t => t.startsWith('t'))).length

      // Part 2
      const indexMap = new Map()
      sorted.forEach((s, i) => indexMap.set(s, i))
      const cs = bronKerbosch([...edges].map(e => {
        const [from, to] = e.split('|')
        return [indexMap.get(from), indexMap.get(to)]
      }))

      let largest: number[] = []
      cs.forEach(c => {
        if (c.length > largest.length) {
          largest = c
        }
      })

      const pTwo = largest.map(c => sorted[c]).sort((a, b) => a.localeCompare(b)).join(',')

      emit('onFinished', pOne, pTwo)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
