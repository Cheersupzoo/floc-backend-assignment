export function sortScore(score: number[][], exam: number) {
  const cloneScore = [...score]
  return cloneScore.sort((first, second) => second[exam] - first[exam])
}
