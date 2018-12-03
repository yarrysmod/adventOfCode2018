import {Level} from './main';

export default class Level2 extends Level {
  constructor(stageNumber: number) {
    super(2, stageNumber);
  }

  async _getStage1Result(input: string): Promise<string> {
    const inputLines = input
        .split('\n')
        .map((inputLine) => inputLine.split(''));
    const factors = {
      twice: 0,
      thrice: 0,
    };

    for (const inputCharacters of inputLines) {
      const letterContainer: {[key: string]: number} = {};

      for (const character of inputCharacters) {
        if (!letterContainer[character]) {
          letterContainer[character] = 0;
        }

        letterContainer[character] += 1;
      }

      const occurrences: number[] = Object.values(letterContainer);
      const hasTwice = occurrences.filter((number) => number === 2).length > 0;
      const hasThrice = occurrences.filter((number) => number === 3).length > 0;

      if (hasTwice) {
        factors.twice += 1;
      }

      if (hasThrice) {
        factors.thrice += 1;
      }
    }

    return `${factors.twice * factors.thrice}`;
  }

  async _getStage2Result(input: string): Promise<string> {
    const inputLines = input.split('\n');
    const maxChars = inputLines[0].length;
    let designatedProductKey = '';

    for (let i = 0; i < inputLines.length; i++) {
      const expectedLine = inputLines[i];

      for (let j = 0; j < inputLines.length; j++) {
        if (j !== i) {
          const actualLine = inputLines[j];
          let faultPosition: number = -1;
          let isMatch = true;

          for (let k = 0; k < maxChars; k++) {
            if (expectedLine[k] !== actualLine[k]) {
              if (faultPosition === -1) {
                faultPosition = k;
              } else {
                isMatch = false;

                break;
              }
            }
          }

          if (isMatch) {
            designatedProductKey = expectedLine.slice(0, faultPosition) + expectedLine.slice(faultPosition + 1);

            break;
          }
        }
      }
    }

    return designatedProductKey;
  }
}
