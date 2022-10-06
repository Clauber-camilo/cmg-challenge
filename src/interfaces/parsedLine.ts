import { EReferenceType, IReferenceValues } from './transform';

export interface IParsedLine extends Partial<{ referenceValues: IReferenceValues }> {
  node: boolean;
  value?: string | number;
  type?: EReferenceType | null;
  parent?: string;
}
