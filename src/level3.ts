import {Level} from './main';

interface FormDetails {
  yStart: number;
  yEnd: number;
  xStart: number;
  xEnd: number;
}

const OVERLAP_SYMBOL: string = 'X';

export default class Level3 extends Level {
  constructor(stageNumber: number) {
    super(3, stageNumber);
  }

  async _getStage1Result(input: string): Promise<string> {
    const linePattern = /#\d+ @ (\d+),(\d+): (\d+)x(\d+)/;
    const inputLines = input.split('\n');
    const formsList: Array<FormDetails> = inputLines.map((inputLine): FormDetails => {
      const formattedLine = linePattern.exec(inputLine);

      if (formattedLine === null) {
        return;
      }

      const xStart: number = Number(formattedLine[1]);
      const yStart: number = Number(formattedLine[2]);
      const xEnd: number = xStart + Number(formattedLine[3]);
      const yEnd: number = yStart + Number(formattedLine[4]);

      return {
        yStart,
        yEnd,
        xStart,
        xEnd,
      };
    }).filter(Boolean);
    const overlapDetails = this.getOverlapDetails(formsList);

    return this.getOverlapArea(overlapDetails);
  }

  async _getStage2Result(input: string): Promise<string> {
    const linePattern = /#\d+ @ (\d+),(\d+): (\d+)x(\d+)/;
    const inputLines = input.split('\n');
    const formsList: Array<FormDetails> = inputLines.map((inputLine): FormDetails => {
      const formattedLine = linePattern.exec(inputLine);

      if (formattedLine === null) {
        return;
      }

      const xStart: number = Number(formattedLine[1]);
      const yStart: number = Number(formattedLine[2]);
      const xEnd: number = xStart + Number(formattedLine[3]);
      const yEnd: number = yStart + Number(formattedLine[4]);

      return {
        yStart,
        yEnd,
        xStart,
        xEnd,
      };
    }).filter(Boolean);
    const overlapDetails = this.getOverlapDetails(formsList);

    return this.getNonOverlapFormNumber(overlapDetails);
  }

  getOverlapArea(overlapDetails: {overlapList: Array<Array<string>>, overlapRecord: {[key: string]: boolean}}): string {
    let overlapArea: number;

    overlapArea = overlapDetails.overlapList.reduce((totalOverlap: number, overlapRow: Array<string>) => {
      const overlapColumns = overlapRow.reduce((count, columnValue, columnIndex) => {
        overlapRow[columnIndex] = columnValue;

        if (columnValue === OVERLAP_SYMBOL) {
          count++;
        }

        return count;
      }, 0);

      return totalOverlap + overlapColumns;
    }, 0);

    return overlapArea.toString();
  }

  getNonOverlapFormNumber (overlapDetails: {overlapList: Array<Array<string>>, overlapRecord: {[key: string]: boolean}}): string {
    let nonOverlapFormNumber = '';

    for (const overlapRecord of Object.entries(overlapDetails.overlapRecord)) {
      const [formNumber,isOverlapped] = overlapRecord;

      if (!isOverlapped) {
        nonOverlapFormNumber = formNumber;

        break;
      }
    }

    return nonOverlapFormNumber;
  }

  getOverlapDetails (formsList: { xStart: number, yStart: number, xEnd: number, yEnd: number }[]): {
    overlapList: Array<Array<string>>,
    overlapRecord: {}
  } {
    const overlapDetails: {
      overlapList: Array<Array<string>>,
      overlapRecord: {}
    } = {
      overlapList: [],
      overlapRecord: {},
    };
    let overlapArea: number;

    for (const formEntry of formsList.entries()) {
      const formDetails = {
        number: formEntry[0] + 1,
        details: formEntry[1],
      };

      this.populateOverlayArea(formDetails, overlapDetails);
    }

    return overlapDetails;
  }

  populateOverlayArea(
      formDetails: {number: number, details: FormDetails},
      overlapDetails: {overlapList: Array<Array<string>>, overlapRecord: {[key: string]: boolean}}
  ) {
    const {
      details: {
        xStart,
        xEnd,
        yStart,
        yEnd,
      },
      number: formNumber,
    } = formDetails;
    const {
      overlapList,
      overlapRecord,
    } = overlapDetails;

    overlapRecord[formNumber] = false;

    for (let yIndex = yStart; yIndex < yEnd; yIndex++) {
      if (overlapList[yIndex] === undefined) {
        overlapList[yIndex] = [];
      }

      const overlapRow = overlapList[yIndex];

      for (let xIndex = xStart; xIndex < xEnd; xIndex++) {
        const oldColumnValue = overlapRow[xIndex];
        const isColumnMarked = oldColumnValue !== undefined;
        if (isColumnMarked) {
          const isGenuineColumnValue = oldColumnValue !== OVERLAP_SYMBOL;

          if (isGenuineColumnValue) {
            overlapRecord[oldColumnValue] = true;

            overlapRow[xIndex] = OVERLAP_SYMBOL;
          }

          overlapRecord[formNumber] = true;
        } else {
          overlapRow[xIndex] = formNumber.toString();
        }
      }
    }
  }
}
