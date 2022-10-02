import { Interface } from 'readline';

import { parseLine, readFile } from './utils';

const evaluateLogFile = (readline: Interface) => {
  let obj = {};
  let parentNode = null;
  readline.on('line', (line) => {
    const lineParsed = parseLine(line, parentNode);

    if (lineParsed.node) {
      obj = {
        ...obj,
        [lineParsed.value]: { type: lineParsed.type },
      };

      parentNode = lineParsed.value;

      return;
    }

    if (lineParsed.value) {
      obj = {
        ...obj,
        [lineParsed.parent]: {
          ...obj[lineParsed.parent],
          values: [
            ...((obj[lineParsed.parent] as { values?: number[] }).values
              ? (obj[lineParsed.parent] as { values?: number[] }).values
              : []),
            lineParsed.value,
          ],
        },
      };
    }
  });

  readline.on('close', () => {
    console.log('OBJ ->', obj);
  });

  return '';
};

const init = () => {
  const logFileContent = readFile('input-data.log');
  evaluateLogFile(logFileContent);
};

init();

export { evaluateLogFile };
