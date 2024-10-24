const letterValues = {
  A: 1,
  E: 1,
  I: 1,
  O: 1,
  U: 1,
  L: 1,
  N: 1,
  R: 1,
  S: 1,
  T: 1,
  D: 2,
  G: 2,
  B: 3,
  C: 3,
  M: 3,
  P: 3,
  F: 4,
  H: 4,
  V: 4,
  W: 4,
  Y: 4,
  K: 5,
  J: 8,
  X: 8,
  Q: 10,
  Z: 10
}

function scrabble(word) {
  if (!word || typeof word !== 'string') return 0

  let score = 0
  let i = 0
  let openBraces = 0
  let openBrackets = 0

  while (i < word.length) {
    const char = word[i].toUpperCase()
    if (char === '{') {
      openBraces++
      i++
      continue
    } else if (char === '}') {
      if (openBraces > 0) {
        openBraces--
        i++
        continue
      } else {
        return 0 // Unmatched closing brace
      }
    } else if (char === '[') {
      openBrackets++
      i++
      continue
    } else if (char === ']') {
      if (openBrackets > 0) {
        openBrackets--
        i++
        continue
      } else {
        return 0 // Unmatched closing bracket
      }
    } else if (!letterValues[char]) {
      return 0 // Unrecognized symbol
    }

    // Calculate letter multiplier
    const letterMultiplier =
      (openBraces > 0 ? 2 : 1) * (openBrackets > 0 ? 3 : 1)
    score += (letterValues[char] || 0) * letterMultiplier
    i++
  }

  // Check for unmatched opening braces or brackets
  if (openBraces > 0 || openBrackets > 0) {
    return 0
  }

  return score
}

module.exports = scrabble
