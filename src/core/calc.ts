import { abs, mean, std } from 'mathjs';

import { EOutputValue } from '../interfaces';

const isWithinTolerateRange = (value: number, referenceValue: number, tolerance: number) =>
  abs(referenceValue - value) <= tolerance;

const calculateThermometerValues = (values: number[], referenceValue: number) => {
  const meanValue = mean(values);
  const deviation = std(values) as unknown as number;

  const isUltraPrecise = deviation < 3 && isWithinTolerateRange(meanValue, referenceValue, 0.5);
  const isVeryPrecise = deviation < 5 && isWithinTolerateRange(meanValue, referenceValue, 0.5);

  return isUltraPrecise
    ? EOutputValue.ULTRA_PRECISE
    : isVeryPrecise
    ? EOutputValue.VERY_PRECISE
    : EOutputValue.PRECISE;
};

const calculateHumidityValues = (values: number[], referenceValue: number) => {
  const meanValue = mean(values);
  const keep = isWithinTolerateRange(meanValue, referenceValue, 1);
  return keep ? EOutputValue.KEEP : EOutputValue.DISCARD;
};

const calculateMonoxideValues = (values: number[], referenceValue: number) => {
  const discard = values.find((val) => val < referenceValue - 3 || val > referenceValue + 3);
  return !discard ? EOutputValue.KEEP : EOutputValue.DISCARD;
};

export {
  calculateThermometerValues,
  calculateHumidityValues,
  calculateMonoxideValues,
  isWithinTolerateRange,
};
