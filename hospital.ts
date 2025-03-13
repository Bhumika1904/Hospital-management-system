export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
}

export interface Bed {
  id: string;
  ward: string;
  isOccupied: boolean;
  patientId?: string;
}

export interface OPDQueue {
  id: string;
  department: string;
  patients: Patient[];
}

export interface Admission {
  id: string;
  patient: Patient;
  bed: Bed;
  admissionDate: Date;
}



