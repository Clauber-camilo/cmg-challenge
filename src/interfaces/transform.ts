export interface IReferenceValues {
  thermometer: number;
  humidity: number;
  monoxide: number;
}

export interface ITransformedObject {
  [key: string]: {
    type: string;
    values?: number[];
  };
}

export interface ITransformMappedObject {
  transformedObject: ITransformedObject;
  references: IReferenceValues;
}
