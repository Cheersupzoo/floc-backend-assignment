import { randomInt } from 'crypto'

type InputType = {
  score: number[][]
  k: number
}

export function exampleInput1(): InputType {
  const score = [
    [10, 6, 9, 1],
    [7, 5, 11, 2],
    [4, 8, 3, 15]
  ]

  const k = 2

  return { score, k }
}

export function exampleInput2(): InputType {
  const score: number[][] = [
    [3, 4],
    [5, 6]
  ]
  const k = 0

  return { score, k }
}

export function inputGenerator(student: number, exam: number): InputType {
  const numberTracker = new Set<number>()

  const score = Array.from(Array(student), () => new Array(exam))

  for (let m = 0; m < student; m++) {
    for (let n = 0; n < exam; n++) {
      let randomScore = randomInt(1, 106)
      while (numberTracker.has(randomScore)) {
        randomScore = randomInt(1, 106)
      }
      numberTracker.add(randomScore)
      score[m][n] = randomScore
    }
  }

  const k = randomInt(1, exam)

  return { score, k }
}
