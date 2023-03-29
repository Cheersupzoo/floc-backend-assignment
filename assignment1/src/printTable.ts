export function printTable(
  scores: number[][],
  k: number,
  indexes: number[] = Array.from(
    { length: scores[0].length },
    (_, index) => index
  )
) {
  const transformScore = scores.map((score, index) =>
    score.reduce((prev, cur, index) => {
      return {
        ...prev,
        [`E${index}${k === index ? '*' : ''}`]: cur
      }
    }, {})
  )
  const numberOfExam = scores[0].length
  const transformScoreAppendStudentIndex = transformScore.map(
    (score, index) => ({
      ['S']: `S${indexes[index]}`,
      ...score
    })
  )

  console.table(transformScoreAppendStudentIndex, [
    'S',
    ...Array.from(
      { length: numberOfExam },
      (value, index) => `E${index}${k === index ? '*' : ''}`
    )
  ])
}
