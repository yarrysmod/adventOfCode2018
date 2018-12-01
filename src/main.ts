import * as path from 'path';
import * as fs from "fs";

export abstract class Level {
  levelNumber: number = 0;
  stageNumber: number = 1;

  protected constructor(levelNumber: number, stageNumber: number) {
    this.levelNumber = levelNumber;
    this.stageNumber = stageNumber;
  }

  _getLevelInputPath: Function = (): string => {
    return path.join(
        __dirname,
        '..',
        'input',
        `level${this.levelNumber}`,
        `input${this.stageNumber}.txt`
    );
  };

  _loadInputFile: Function = async (): Promise<string> => {
    return await new Promise<string>(
        (resolve: Function, reject: Function) => {
          fs.readFile(
              this._getLevelInputPath(),
              (error: any, fileBuffer: Buffer): string => {
                if (error) {
                  return reject(error);
                }

                return resolve(fileBuffer.toString());
              })
        });
  };

  async _generateOutput(): Promise<string> {
    const input: string = await this._loadInputFile();
    let outputFunction: Function = () => {};

    switch (this.stageNumber) {
      case 1: {
        outputFunction = this._getStage1Result;

        break;
      }
      case 2: {
        outputFunction = this._getStage2Result;

        break;
      }
      default: {
        console.log(`invalid stage number supplied! ${this.stageNumber}`);

        process.exit(1);
      }
    }

    return outputFunction(input);
  };

  abstract async _getStage1Result(input: string): Promise<string>;
  abstract async _getStage2Result(input: string): Promise<string>;
}
