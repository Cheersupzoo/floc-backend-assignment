import { exampleInput1, exampleInput2, inputGenerator } from './input'
import { inputValidation } from './inputValidation'
import { printTable } from './printTable'
import { sortScore } from './sortScore'

function main() {
  const { score, k } = inputGenerator(3, 5)
  inputValidation(score, k)
  const [sortedScore, sortedIndex] = sortScore(score, k)

  console.log('Input:')
  printTable(score, k)
  console.log('k = ', k)

  console.log('\nOutput:')
  printTable(sortedScore, k, sortedIndex)
}

main()
