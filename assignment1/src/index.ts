import { exampleInput1, exampleInput2, inputGenerator } from './input'
import { inputValidation } from './inputValidation'
import { printTable } from './printTable'
import { sortScore } from './sortScore'

function main() {
  const { score, k } = exampleInput1()
  inputValidation(score, k)
  const sortedScore = sortScore(score, k)

  console.log('Input:')
  printTable(score)
  console.log('k = ', k)

  console.log('\nOutput:')
  printTable(sortedScore)
}

main()
