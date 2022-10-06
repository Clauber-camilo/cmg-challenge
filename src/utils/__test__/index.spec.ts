import { Interface } from 'readline';
import { Readable } from 'stream';

import { createReadLineFromString, parseLine, transformLineIntoMappedObject } from '../';
import { errorDictionary } from '../errorDictionary';

describe('utils :: index', () => {
  describe('createReadLineFromString', () => {
    test('should return the created readline as expected', () => {
      const input = 'some string text';
      const res = createReadLineFromString(input);
      expect(res).toBeInstanceOf(Interface);
    });

    test('should return the throw message if something went wrong', () => {
      const input = 'some string text';
      jest.spyOn(Readable, 'from').mockImplementationOnce(() => {
        throw new Error();
      });

      try {
        createReadLineFromString(input);
      } catch (e) {
        expect((e as { message: string }).message).toBe(errorDictionary.ErrorStreamCreation);
      }
    });
  });

  describe('parseLine', () => {
    test('should valueidade and return if match the regex', () => {
      const res = parseLine('thermometer temp-1');
      expect(res).toMatchObject({
        node: true,
        value: 'temp-1',
        type: 'thermometer',
      });

      expect(parseLine('humidity hum-2')).toMatchObject({
        node: true,
        value: 'hum-2',
        type: 'humidity',
      });
    });

    test('should throw and error if pass the date object without a parent node', () => {
      const date = '2007-04-05T22:00 72.4';
      try {
        parseLine(date);
      } catch (e) {
        expect((e as { message: string }).message).toBe(errorDictionary.ErrorInputLine(date));
      }
    });

    test('should return the value of date with his parent node', () => {
      const res = parseLine('2007-04-05T22:00 72.4', 'temp-1');
      expect(res).toMatchObject({
        node: false,
        value: 72.4,
        parent: 'temp-1',
      });
    });

    test('should send null value if the input is not matching with regex', () => {
      const res = parseLine('some test string');
      expect(res).toMatchObject({
        node: false,
        value: null,
      });
      expect(parseLine('2007-04-05T22:00 some string')).toMatchObject({
        node: false,
        value: null,
      });
    });

    test('should send the reference object', () => {
      const res = parseLine('reference 70.0 45.0 6');
      expect(res).toMatchObject({
        node: false,
        referenceValues: {
          thermometer: 70,
          humidity: 45,
          monoxide: 6,
        },
      });
    });
  });

  describe('transformLineIntoMappedObject', () => {
    test('should return the object as expected', async () => {
      const input = createReadLineFromString(
        'reference 55.4 41.0 7\nthermometer temp-1\n2007-04-05T22:00 72.4\n2007-04-05T22:01 76.0\n',
      );

      const res = await transformLineIntoMappedObject(input);
      expect(res).toMatchObject({
        references: {
          thermometer: 55.4,
          humidity: 41.0,
          monoxide: 7,
        },
        transformedObject: {
          'temp-1': {
            type: 'thermometer',
            values: [72.4, 76.0],
          },
        },
      });
    });

    test('should return an empty object if the string is wrong format', async () => {
      const input = createReadLineFromString('some strange text');

      const res = await transformLineIntoMappedObject(input);
      expect(res).toMatchObject({});
    });
  });
});
