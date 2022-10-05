interface IErrorDictionary {
  ErrorStreamCreation: string;
  ErrorReadFile: string;
  ErrorInputLine: (line: string) => string;
}

const errorDictionary: IErrorDictionary = {
  ErrorStreamCreation: 'Something went wrong when trying to create the stream',
  ErrorReadFile: 'Something went wrong when trying to read the file',
  ErrorInputLine: (line: string) => `The line input: ${line} not have a parent type`,
};

export { errorDictionary };
