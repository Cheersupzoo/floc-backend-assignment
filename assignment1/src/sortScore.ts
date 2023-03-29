export function sortScore(
  score: number[][],
  exam: number
): [number[][], number[]] {
  const cloneScore = [...score]
  const sortedScore = cloneScore.sort(
    (first, second) => second[exam] - first[exam]
  )
  const sortedIndex = sortedScore.map((studentScore) =>
    score.indexOf(studentScore)
  )

  return [sortedScore, sortedIndex]
}
