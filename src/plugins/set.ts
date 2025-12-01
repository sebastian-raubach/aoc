const difference = <Type>(set: Set<Type>, otherSet: Set<Type>): Set<Type> => {
  const result = new Set<Type>(set)
  otherSet.forEach(value => {
    result.delete(value)
  })
  return result
}

const intersect = <Type>(set: Set<Type>, otherSet: Set<Type>): Set<Type> => {
  const result = new Set<Type>()
  otherSet.forEach(value => {
    if (set.has(value)) {
      result.add(value)
    }
  })
  return result
}

const union = <Type>(set: Set<Type>, otherSet: Set<Type>): Set<Type> => {
  const result = new Set<Type>(set)
  otherSet.forEach(value => result.add(value))
  return result
}

export {
  difference,
  intersect,
  union,
}
