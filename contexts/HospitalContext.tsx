'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { Patient, Bed, OPDQueue, Admission } from '../types/hospital'

interface HospitalContextType {
  opdQueues: OPDQueue[]
  beds: Bed[]
  admissions: Admission[]
  addPatientToQueue: (queueId: string, patient: Patient) => void
  removePatientFromQueue: (queueId: string, patientId: string) => void
  admitPatient: (patient: Patient, bedId: string) => void
  dischargePatient: (admissionId: string) => void
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined)

export const useHospitalContext = () => {
  const context = useContext(HospitalContext)
  if (!context) {
    throw new Error('useHospitalContext must be used within a HospitalProvider')
  }
  return context
}

export const HospitalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [opdQueues, setOpdQueues] = useState<OPDQueue[]>([
    { id: '1', department: 'General', patients: [] },
    { id: '2', department: 'Cardiology', patients: [] },
    { id: '3', department: 'Pediatrics', patients: [] },
  ])

  const [beds, setBeds] = useState<Bed[]>(
    Array.from({ length: 50 }, (_, i) => ({
      id: `bed-${i + 1}`,
      ward: `Ward ${Math.floor(i / 10) + 1}`,
      isOccupied: false,
    }))
  )

  const [admissions, setAdmissions] = useState<Admission[]>([])

  const addPatientToQueue = useCallback((queueId: string, patient: Patient) => {
    setOpdQueues(queues =>
      queues.map(queue =>
        queue.id === queueId
          ? { ...queue, patients: [...queue.patients, patient] }
          : queue
      )
    )
  }, [])

  const removePatientFromQueue = useCallback((queueId: string, patientId: string) => {
    setOpdQueues(queues =>
      queues.map(queue =>
        queue.id === queueId
          ? { ...queue, patients: queue.patients.filter(p => p.id !== patientId) }
          : queue
      )
    )
  }, [])

  const admitPatient = useCallback((patient: Patient, bedId: string) => {
    setBeds(beds =>
      beds.map(bed =>
        bed.id === bedId ? { ...bed, isOccupied: true } : bed
      )
    )
    setAdmissions(admissions => [
      ...admissions,
      {
        id: `admission-${admissions.length + 1}`,
        patient,
        bed: beds.find(b => b.id === bedId)!,
        admissionDate: new Date(),
      },
    ])
  }, [beds])

  const dischargePatient = useCallback((admissionId: string) => {
    setAdmissions(admissions => {
      const admission = admissions.find(a => a.id === admissionId)
      if (admission) {
        setBeds(beds =>
          beds.map(bed =>
            bed.id === admission.bed.id ? { ...bed, isOccupied: false } : bed
          )
        )
      }
      return admissions.filter(a => a.id !== admissionId)
    })
  }, [])

  return (
    <HospitalContext.Provider value={{
      opdQueues,
      beds,
      admissions,
      addPatientToQueue,
      removePatientFromQueue,
      admitPatient,
      dischargePatient,
    }}>
      {children}
    </HospitalContext.Provider>
  )
}

