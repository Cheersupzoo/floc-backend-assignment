export function printTable(scores: number[][]) {
  const transformScore = scores.map((score, index) =>
    score.reduce((prev, cur, index) => ({ ...prev, [`E${index}`]: cur }), {})
  )
  const numberOfExam = scores[0].length
  console.table(
    transformScore,
    Array.from({ length: numberOfExam }, (value, index) => `E${index}`)
  )
}
