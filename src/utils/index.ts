import { readFileSync } from 'fs';
import { createInterface, Interface } from 'readline';
import { Readable } from 'stream';

import {
  IParsedLine,
  EReferenceType,
  IReferenceValues,
  ITransformedObject,
  ITransformMappedObject,
} from '../interfaces/';
import { errorDictionary } from './errorDictionary';

const createReadLineFromString = (text: string): Interface => {
  try {
    const instream = Readable.from([text]);
    const readline = createInterface({
      input: instream,
      terminal: false,
    });

    return readline;
  } catch (e) {
    throw new Error(errorDictionary.ErrorStreamCreation);
  }
};

const readFile = (filePath: string) => {
  try {
    return readFileSync(filePath, 'utf8');
  } catch (e) {
    throw new Error(errorDictionary.ErrorReadFile);
  }
};

const regexDateCheck = /(^\d{4}-\d{2}-\d{2}T\d{2}:\d{2} \d.*)/gm;
const regexTypeCheck = /(^thermometer.*|humidity.*|monoxide.*)/gm;
const regexReference = /(^reference\s\d{2}[.]\d\s\d{2}[.]\d\s\d)/gm;

const parseLine = (line: string, parent?: string): IParsedLine => {
  line.toLowerCase();

  if (line.match(regexReference)) {
    const [, thermometerRef, humidityRef, monoxideRef] = line.split(' ');
    return {
      node: false,
      referenceValues: {
        thermometer: Number(thermometerRef),
        humidity: Number(humidityRef),
        monoxide: Number(monoxideRef),
      },
    };
  }

  if (line.match(regexTypeCheck)) {
    const [type, value] = line.split(' ');
    return { node: true, value, type: type as EReferenceType };
  }

  if (line.match(regexDateCheck)) {
    if (!parent) {
      throw new Error(errorDictionary.ErrorInputLine(line));
    }

    const [, value] = line.split(' ');
    return { node: false, value: Number(value), parent };
  }

  return { node: false, value: null };
};

const transformLineIntoMappedObject = async (
  readline: Interface,
): Promise<ITransformMappedObject> => {
  let transformedObject: ITransformedObject = {};
  let references: IReferenceValues;
  let parentNode = null;

  for await (const line of readline) {
    const lineParsed = parseLine(line, parentNode);

    if (lineParsed.referenceValues) {
      references = { ...lineParsed.referenceValues };
    } else if (lineParsed.node) {
      transformedObject = {
        ...transformedObject,
        [lineParsed.value]: { type: lineParsed.type },
      };

      parentNode = lineParsed.value;
    } else if (lineParsed.value) {
      transformedObject = {
        ...transformedObject,
        [lineParsed.parent]: {
          ...transformedObject[lineParsed.parent],
          values: [
            ...((transformedObject[lineParsed.parent] as { values?: number[] }).values
              ? (transformedObject[lineParsed.parent] as { values?: number[] }).values
              : []),
            lineParsed.value as number,
          ],
        },
      };
    }
  }

  return { transformedObject, references };
};

export { readFile, createReadLineFromString, parseLine, transformLineIntoMappedObject };
