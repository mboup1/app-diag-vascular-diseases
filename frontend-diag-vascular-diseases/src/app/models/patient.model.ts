export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  medicalRecordNumber: string;
  vitals: {
    heartRate: number[];
    temperature: number[];
    bloodPressure: { systolic: number; diastolic: number; }[];
    oxygenSaturation: number[];
  };
}
