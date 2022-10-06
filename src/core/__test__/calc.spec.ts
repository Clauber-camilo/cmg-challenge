import * as mathjs from 'mathjs';

import { EOutputValue } from '../../interfaces';
import {
  calculateHumidityValues,
  calculateMonoxideValues,
  calculateThermometerValues,
  isWithinTolerateRange,
} from '../calc';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('mathjs', () => ({
  ...jest.requireActual('mathjs'),
  std: jest.fn(),
}));

describe('CORE :: calc', () => {
  describe('isWithinTolerateRange', () => {
    test('should return the values as expected in testTable', () => {
      const testTable = [
        {
          value: 32.5,
          referenceValue: 33,
          tolerance: 2,
        },
        {
          value: 33.3,
          referenceValue: 33,
          tolerance: 2,
        },
        {
          value: 44.2,
          referenceValue: 30,
          tolerance: 2,
          expectToFail: true,
        },
      ];

      testTable.map((tt) => {
        const res = isWithinTolerateRange(tt.value, tt.referenceValue, tt.tolerance);

        if (tt.expectToFail) {
          expect(res).toBe(false);
          return;
        }

        expect(res).toBe(true);
      });
    });
  });

  describe('calculateThermometer', () => {
    test('should return `ultra precise` if the deviation is less than 3 and the tolerance is below 0.5', () => {
      const values = [30, 30, 30.3];
      const referenceValue = 30;

      jest.spyOn(mathjs, 'std').mockImplementation(() => 2);
      const res = calculateThermometerValues(values, referenceValue);
      expect(res).toBe(EOutputValue.ULTRA_PRECISE);
    });

    test('should return `very precise` if the deviation is less than 5 and the tolerance is below 0.5', () => {
      const values = [30.5, 29.5];
      const referenceValue = 30;

      jest.spyOn(mathjs, 'std').mockImplementation(() => 4);

      const res = calculateThermometerValues(values, referenceValue);
      expect(res).toBe(EOutputValue.VERY_PRECISE);
    });

    test('should return `precise` if not match with the requirements', () => {
      const values = [30.5, 29.5];
      const referenceValue = 28;

      jest.spyOn(mathjs, 'std').mockImplementation(() => 4);

      const res = calculateThermometerValues(values, referenceValue);
      expect(res).toBe(EOutputValue.PRECISE);
    });
  });

  describe('calculateHumidity', () => {
    test('should return `keep` if the value is 1% of the mean reading', () => {
      const values = [20.5, 20.3];
      const referenceValue = 20;

      const res = calculateHumidityValues(values, referenceValue);
      expect(res).toBe(EOutputValue.KEEP);
    });
    test('should return `discard` if the value is more than 1% of the mean reading', () => {
      const values = [20.5, 20.3, 24.5];
      const referenceValue = 20;

      const res = calculateHumidityValues(values, referenceValue);
      expect(res).toBe(EOutputValue.DISCARD);
    });
  });

  describe('calculateMonoxide', () => {
    test('should return `keep` if the values does`t have the 3 points of difference', () => {
      const values = [22, 24, 23];
      const referenceValue = 22;

      const res = calculateMonoxideValues(values, referenceValue);
      expect(res).toBe(EOutputValue.KEEP);
    });
    test('should return `discard` if the values have more than 3 points of difference', () => {
      const values = [22, 24, 23, 27];
      const referenceValue = 22;

      const res = calculateMonoxideValues(values, referenceValue);
      expect(res).toBe(EOutputValue.DISCARD);
    });
  });
});
