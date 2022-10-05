import { IReferenceValues } from './transform';

export interface IParsedLine extends Partial<{ referenceValues: IReferenceValues }> {
  node: boolean;
  value?: string | number;
  type?: string | null;
  parent?: string;
}
