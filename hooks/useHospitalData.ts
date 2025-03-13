'use client'

import { useState, useCallback, useEffect } from 'react';
import { Patient, Bed, OPDQueue, Admission } from '../types/hospital';

export function useHospitalData() {
  const [opdQueues, setOpdQueues] = useState<OPDQueue[]>([]);
  const [beds, setBeds] = useState<Bed[]>([]);
  const [admissions, setAdmissions] = useState<Admission[]>([]);

  useEffect(() => {
    // Simulate fetching initial data from the server
    setOpdQueues([
      { id: '1', department: 'General', patients: [] },
      { id: '2', department: 'Cardiology', patients: [] },
      { id: '3', department: 'Pediatrics', patients: [] },
    ]);

    setBeds(
      Array.from({ length: 50 }, (_, i) => ({
        id: `bed-${i + 1}`,
        ward: `Ward ${Math.floor(i / 10) + 1}`,
        isOccupied: false,
      }))
    );
  }, []);

  const addPatientToQueue = useCallback((queueId: string, patient: Patient) => {
    setOpdQueues(queues =>
      queues.map(queue =>
        queue.id === queueId
          ? { ...queue, patients: [...queue.patients, patient] }
          : queue
      )
    );
  }, []);

  const removePatientFromQueue = useCallback((queueId: string, patientId: string) => {
    setOpdQueues(queues =>
      queues.map(queue =>
        queue.id === queueId
          ? { ...queue, patients: queue.patients.filter(p => p.id !== patientId) }
          : queue
      )
    );
  }, []);

  const admitPatient = useCallback((patient: Patient, bedId: string) => {
    setBeds(beds =>
      beds.map(bed =>
        bed.id === bedId ? { ...bed, isOccupied: true, patientId: patient.id } : bed
      )
    );
    setAdmissions(admissions => [
      ...admissions,
      {
        id: `admission-${admissions.length + 1}`,
        patient,
        bed: beds.find(b => b.id === bedId)!,
        admissionDate: new Date(),
      },
    ]);
  }, [beds]);

  const dischargePatient = useCallback((admissionId: string) => {
    setAdmissions(admissions => {
      const admission = admissions.find(a => a.id === admissionId);
      if (admission) {
        setBeds(beds =>
          beds.map(bed =>
            bed.id === admission.bed.id ? { ...bed, isOccupied: false, patientId: undefined } : bed
          )
        );
      }
      return admissions.filter(a => a.id !== admissionId);
    });
  }, []);

  return {
    opdQueues,
    beds,
    admissions,
    addPatientToQueue,
    removePatientFromQueue,
    admitPatient,
    dischargePatient,
  };
}

