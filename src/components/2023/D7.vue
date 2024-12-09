<template>
  <span />
</template>

<script lang="ts" setup>
  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  interface Map {
    [key: string]: number
  }

  const FIVE_OAK = '6'
  const FOUR_OAK = '5'
  const FULL_HOUSE = '4'
  const THREE_OAK = '3'
  const TWO_PAIRS = '2'
  const ONE_PAIR = '1'
  const HIGH_CARD = '0'
  const orderOne: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
  const orderTwo: string[] = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A']

  const determineTypeOne = (hand: string[]) => {
    // Count the number of each card
    const map: Map = {}
    hand.forEach(c => {
      map[c] = (map[c] || 0) + 1
    })

    const v = Object.values(map)

    // Compare how many there are of each type to determine the hand type
    if (v.some(k => k === 5)) {
      return FIVE_OAK
    } else if (v.some(k => k === 4)) {
      return FOUR_OAK
    } else if (v.some(k => k === 3) && v.some(k => k === 2)) {
      return FULL_HOUSE
    } else if (v.some(k => k === 3)) {
      return THREE_OAK
    } else if (v.filter(k => k === 2).length === 2) {
      return TWO_PAIRS
    } else if (v.some(k => k === 2)) {
      return ONE_PAIR
    } else {
      return HIGH_CARD
    }
  }

  const determineTypeTwo = (hand: string[]) => {
    // See what we could get without jokers (0s after mapping)
    const jokerCount = hand.filter(k => k === '0').length
    const noJoker = determineTypeOne(hand.filter(k => k !== '0'))

    if (jokerCount > 0) {
      if ((noJoker === FOUR_OAK && jokerCount > 0) || jokerCount === 5) {
        // Four of a kind and some joker => five of a kind
        return FIVE_OAK
      } else if (noJoker === THREE_OAK) {
        // Three of a kind
        if (jokerCount === 2) {
          // And two jokers => five of a kind
          return FIVE_OAK
        } else if (jokerCount === 1) {
          // And one joker => four of a kind
          return FOUR_OAK
        }
      } else if (noJoker === TWO_PAIRS && jokerCount > 0) {
        // Two pairs and some joker => full house
        return FULL_HOUSE
      } else if (noJoker === ONE_PAIR) {
        // One pair
        if (jokerCount === 3) {
          return FIVE_OAK
        } else if (jokerCount === 2) {
          return FOUR_OAK
        } else if (jokerCount === 1) {
          return THREE_OAK
        }
      } else if (noJoker === HIGH_CARD && jokerCount > 0) {
        if (jokerCount === 4) {
          return FIVE_OAK
        } else if (jokerCount === 3) {
          return FOUR_OAK
        } else if (jokerCount === 2) {
          return THREE_OAK
        } else {
          // If one high card => pair
          return ONE_PAIR
        }
      } else {
        return noJoker
      }
    } else {
      return noJoker
    }
  }

  const solve = (input: string[], order: string[], df: Function) => {
    const result = input.map(i => {
      // Split input
      const [cards, bid] = i.split(' ').map((p, j) => j === 0 ? p.split('') : +p) as [string[], number]

      // Map cards to HEX value based on their index in the value array
      const mapped = cards.map(p => order.indexOf(p).toString(16))

      // Determine the type of the hand (e.g. four of a kind, full house etc, result will be HEX value)
      const type = df(mapped)

      return {
        // Concatenate the hand type then the HEX version of the hand
        hand: type + mapped.join(''),
        bid,
        original: cards.join(''),
      }
    })

    // Sort them asc which will have the weakest hand first, strongest last
    result.sort((a, b) => a.hand.localeCompare(b.hand))

    // Then sum each hand bid multiplied by its position
    return result.map((h, i) => (i + 1) * h.bid).reduce((a, b) => a + b, 0)
  }

  const run = () => {
    if (props.input) {
      const pOne = solve(props.input, orderOne, determineTypeOne)
      const pTwo = solve(props.input, orderTwo, determineTypeTwo)

      emit('onFinished', pOne, pTwo)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
