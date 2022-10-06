import {
  calculateHumidityValues,
  calculateMonoxideValues,
  calculateThermometerValues,
} from './core/calc';
import { EReferenceType, IOutput, ITransformMappedObject } from './interfaces';
import { createReadLineFromString, readFile, transformLineIntoMappedObject } from './utils';

const mountOutputData = ({ transformedObject, references }: ITransformMappedObject): IOutput => {
  console.log('transformedObject', transformedObject);
  const output = Object.entries(transformedObject).reduce((acc, [key, value]) => {
    switch (value.type) {
      case EReferenceType.THERMOMETER:
        return { ...acc, [key]: calculateThermometerValues(value.values, references.thermometer) };
      case EReferenceType.HUMIDITY:
        return { ...acc, [key]: calculateHumidityValues(value.values, references.humidity) };
      case EReferenceType.MONOXIDE:
        return { ...acc, [key]: calculateMonoxideValues(value.values, references.monoxide) };
    }
  }, {});

  return output;
};

const evaluateLogFile = async (logContent: string) =>
  await transformLineIntoMappedObject(createReadLineFromString(logContent)).then(mountOutputData);

const init = async () => {
  const logFileContent = readFile('input-data.log');
  console.log(await evaluateLogFile(logFileContent)); // just to output the result;
};

void init();

export { evaluateLogFile, mountOutputData };
