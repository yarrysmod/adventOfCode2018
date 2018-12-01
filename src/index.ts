import Level1 from './level1';
import {Level} from "./main";

const printLevelOutput: Function = async () => {
  const parameters: string[] = process.argv;

  if (parameters.length < 4) {
    console.log('not enough parameters! (--level=<number> --stage=<number>)');

    process.exit(1);
  }

  const levelNumber: number = Number(parameters[2].split('=')[1]);
  const stageNumber: number = Number(parameters[3].split('=')[1]);
  let levelInstance: Level|null = null;

  switch (levelNumber) {
    case 1: {
      levelInstance = new Level1(stageNumber);

      break;
    }
  }

  if (levelInstance !== null) {
    console.log(await levelInstance._generateOutput());
  } else {
    console.log(`invalid level number supplied! (${levelNumber})`);

    process.exit(1);
  }
};

printLevelOutput();
