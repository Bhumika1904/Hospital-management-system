'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useHospitalData } from './hooks/useHospitalData'
import { OPDQueueManagement } from './components/OpdQueueManagement'
import { BedAvailability } from './components/BedAvailability'
import { PatientAdmissions } from './components/PatientAdmissions'

export default function Dashboard() {
  const hospitalData = useHospitalData()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Hospital Management Dashboard</h1>
      <Tabs defaultValue="opd">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="opd">OPD Queue</TabsTrigger>
          <TabsTrigger value="beds">Bed Availability</TabsTrigger>
          <TabsTrigger value="admissions">Patient Admissions</TabsTrigger>
        </TabsList>
        <TabsContent value="opd">
          <Card>
            <CardHeader>
              <CardTitle>OPD Queue Management</CardTitle>
              <CardDescription>Manage outpatient department queues</CardDescription>
            </CardHeader>
            <CardContent>
              <OPDQueueManagement
                queues={hospitalData.opdQueues}
                addPatientToQueue={hospitalData.addPatientToQueue}
                removePatientFromQueue={hospitalData.removePatientFromQueue}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="beds">
          <Card>
            <CardHeader>
              <CardTitle>Bed Availability</CardTitle>
              <CardDescription>View and manage hospital bed availability</CardDescription>
            </CardHeader>
            <CardContent>
              <BedAvailability beds={hospitalData.beds} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="admissions">
          <Card>
            <CardHeader>
              <CardTitle>Patient Admissions</CardTitle>
              <CardDescription>Manage patient admissions and discharges</CardDescription>
            </CardHeader>
            <CardContent>
              <PatientAdmissions
                admissions={hospitalData.admissions}
                beds={hospitalData.beds}
                admitPatient={hospitalData.admitPatient}
                dischargePatient={hospitalData.dischargePatient}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

