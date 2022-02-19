// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from "fs";

type Data = {
  simulation: string[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const simulation:string[] = findWords(req.body.rightWord, req.body.lettersNot)
  console.log(simulation)
  res.status(200).json({
    simulation
  })
}

function getDictionary() {
  return fs.readFileSync('utils/fiveWordList.txt', 'utf-8').split('\n')
}


function findWords(word:string, lettersNotIn:string) {
  const dictonary = getDictionary()
  const wordArray = word.split('')
  const wordsThatFit:string[] = []
  const arrayOfNotInRightPlace:string[] = []
  let haveRights = false
  let haveNotInRightPlace = false
  let wordRightCount = 0

  wordArray.forEach(letter => {
    if (letter === letter.toUpperCase() && letter !== '_') {
      haveRights = true
      wordRightCount++
    }
    if (letter === letter.toLowerCase() && letter !== '_') {
      haveNotInRightPlace = true
      arrayOfNotInRightPlace.push(letter)
    }
  })

  if (haveRights) {
    dictonary.filter(dictionaryWord => {
      const dictionaryWordArray = dictionaryWord.toUpperCase().split('')
      let lettersGreen = 0
      dictionaryWordArray.forEach((letter, index) => {
        if (letter === wordArray[index]) {
          lettersGreen++
        }
      })

      if (lettersGreen === wordRightCount) {
        wordsThatFit.push(dictionaryWord)
      }
    })
  }
  
  if (arrayOfNotInRightPlace) {
    for (let index = wordsThatFit.length-1 ; index >= 0; index--) {
      const word = wordsThatFit[index];
      for (let j = 0; j < arrayOfNotInRightPlace.length; j++) {
        const letter = arrayOfNotInRightPlace[j]
        if (!word.toLowerCase().includes(letter)) {
          wordsThatFit.splice(index, 1)
          break
        }
      }
    }
  }

  if (wordsThatFit.length > 1) {
    for (let index = wordsThatFit.length-1 ; index >= 0; index--) {
      const word = wordsThatFit[index];
      const lettersNotInArray = lettersNotIn.split('')
      for (let j = 0; j < lettersNotInArray.length; j++) {
        const letter = lettersNotInArray[j]
        if (word.includes(letter)) {
          wordsThatFit.splice(index, 1)
          break
        }
      }
    }
  }

  return wordsThatFit
}