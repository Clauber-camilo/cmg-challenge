import { parseLine } from './utils/';

describe('INDEX', () => {
  describe('parseline function', () => {
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
        expect((e as { message: string }).message).toBe(
          `The line input: ${date} not have a parent type`,
        );
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
  });
});
