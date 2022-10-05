import { createReadLineFromString, readFile, transformLineIntoMappedObject } from './utils';

const evaluateLogFile = async (logContent: string) => {
  const readline = createReadLineFromString(logContent);
  const trandformedData = await transformLineIntoMappedObject(readline);
  console.log(trandformedData);
  return '';
};

const init = async () => {
  const logFileContent = readFile('input-data.log');
  await evaluateLogFile(logFileContent);
};

init();

export { evaluateLogFile };
