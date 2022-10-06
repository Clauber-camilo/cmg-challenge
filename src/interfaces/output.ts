export enum EOutputValue {
  PRECISE = 'precise',
  VERY_PRECISE = 'very precise',
  ULTRA_PRECISE = 'ultra precise',
  KEEP = 'keep',
  DISCARD = 'discard',
}
export interface IOutput {
  [key: string]: EOutputValue;
}
