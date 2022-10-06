export interface IReferenceValues {
  thermometer: number;
  humidity: number;
  monoxide: number;
}

export enum EReferenceType {
  THERMOMETER = 'thermometer',
  HUMIDITY = 'humidity',
  MONOXIDE = 'monoxide',
}

export interface ITransformedObject {
  [key: string]: {
    type: EReferenceType;
    values?: number[];
  };
}

export interface ITransformMappedObject {
  transformedObject: ITransformedObject;
  references: IReferenceValues;
}
