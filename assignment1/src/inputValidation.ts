export function inputValidation(score: number[][], k: number) {
  const m = score.length
  if (!(1 <= m && m <= 250))
    throw Error('m is out of range \x1b[33m1 <= m, n <= 250\x1b[0m')
  const n = score[0].length
  if (!(1 <= n && n <= 250))
    throw Error('n is out of range \x1b[33m1 <= m, n <= 250\x1b[0m')

  score.map((exams, sIndex) =>
    exams.map((exam, eIndex) => {
      if (!(1 <= exam && exam <= 105))
        throw Error(
          `exam score[${sIndex}][${eIndex}] is out of range \x1b[33m1 <= score[i][j] <= 105\x1b[0m`
        )
    })
  )
}
