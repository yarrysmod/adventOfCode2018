import {Level} from './main';

export default class Level1 extends Level {
  constructor(stageNumber: number) {
    super(1, stageNumber);
  }

  async _getStage1Result(input: string): Promise<string> {
    return input
        .split('\n')
        .reduce((sum: number, num: string): number => {
          if (num === '') {
            return sum;
          }

          return sum + Number(num);
        }, 0)
        .toString();
  }

  async _getStage2Result(input: string): Promise<string> {
    const frequencies = input.split('\n');
    const sumList = [0];

    while(true) {
      for (const num of frequencies) {
        if (num === '') {
          continue;
        }

        const sum: number = sumList[sumList.length - 1] + Number(num);
        const sumIndex = sumList.push(sum) - 1;

        if (sumList.indexOf(sum) !== sumIndex) {
          return sum.toString();
        }
      }
    }
  }
}
