type Data = {
  simulation: string[];
};

export default function handler(rightWord: string, lettersNot: string) {
  return findWords(rightWord, lettersNot);
}

async function getDictionary() {
  const dataFromDocument = await fetch("fiveWordList.txt");
  const wordFormat = await dataFromDocument.text();
  return wordFormat.split("\n");
}

async function findWords(word: string, lettersNotIn: string) {
  const dictonary = await getDictionary();
  const wordArray = word.split("");
  const wordsThatFit: string[] = [];
  const arrayOfNotInRightPlace: string[] = [];
  let haveRights = false;
  let haveNotInRightPlace = false;
  let wordRightCount = 0;

  wordArray.forEach((letter) => {
    if (letter === letter.toUpperCase() && letter !== "_") {
      haveRights = true;
      wordRightCount++;
    }
    if (letter === letter.toLowerCase() && letter !== "_") {
      haveNotInRightPlace = true;
      arrayOfNotInRightPlace.push(letter);
    }
  });

  if (haveRights) {
    dictonary.filter((dictionaryWord) => {
      const dictionaryWordArray = dictionaryWord.toUpperCase().split("");
      let lettersGreen = 0;
      dictionaryWordArray.forEach((letter, index) => {
        if (letter === wordArray[index]) {
          lettersGreen++;
        }
      });

      if (lettersGreen === wordRightCount) {
        wordsThatFit.push(dictionaryWord);
      }
    });
  }

  if (arrayOfNotInRightPlace) {
    for (let index = wordsThatFit.length - 1; index >= 0; index--) {
      const word = wordsThatFit[index];
      for (let j = 0; j < arrayOfNotInRightPlace.length; j++) {
        const letter = arrayOfNotInRightPlace[j];
        if (!word.toLowerCase().includes(letter)) {
          wordsThatFit.splice(index, 1);
          break;
        }
      }
    }
  }

  if (wordsThatFit.length > 1) {
    for (let index = wordsThatFit.length - 1; index >= 0; index--) {
      const word = wordsThatFit[index];
      const lettersNotInArray = lettersNotIn.split("");
      for (let j = 0; j < lettersNotInArray.length; j++) {
        const letter = lettersNotInArray[j];
        if (word.includes(letter)) {
          wordsThatFit.splice(index, 1);
          break;
        }
      }
    }
  }

  return wordsThatFit;
}
