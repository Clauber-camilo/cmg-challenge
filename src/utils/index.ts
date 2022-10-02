import { createReadStream } from 'fs';
import { createInterface } from 'readline';

const readFile = (filePath: string) => {
  try {
    const instream = createReadStream(filePath, 'utf8');

    const readline = createInterface({
      input: instream,
      terminal: false,
    });
    return readline;
  } catch (e) {
    throw new Error('Something went wrong when trying to read the file');
  }
};

const regexDateCheck = /(^\d{4}-\d{2}-\d{2}T\d{2}:\d{2} \d.*)/gm;
const regexTypeCheck = /(^thermometer.*|humidity.*|monoxide.*)/gm;

interface IParsedLine {
  node: boolean;
  value: string | number;
  type?: string | null;
  parent?: string;
}

const parseLine = (line: string, parent?: string): IParsedLine => {
  line.toLowerCase();

  if (line.match(regexTypeCheck)) {
    const [type, value] = line.split(' ');
    return { node: true, value, type };
  }

  if (line.match(regexDateCheck)) {
    if (!parent) {
      throw new Error(`The line input: ${line} not have a parent type`);
    }
    const [, value] = line.split(' ');
    return { node: false, value: Number(value), parent };
  }

  return { node: false, value: null };
};

export { readFile, parseLine };
