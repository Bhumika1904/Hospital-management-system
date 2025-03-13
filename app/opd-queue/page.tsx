'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OPDQueueManagement } from '../../components/OpdQueueManagement';
import { useHospitalContext } from '../../contexts/HospitalContext';

export default function OPDQueuePage() {
  const { opdQueues, addPatientToQueue, removePatientFromQueue } = useHospitalContext();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>OPD Queue Management</CardTitle>
        <CardDescription>Manage outpatient department queues</CardDescription>
      </CardHeader>
      <CardContent>
        <OPDQueueManagement 
          queues={opdQueues}
          addPatientToQueue={addPatientToQueue}
          removePatientFromQueue={removePatientFromQueue}
        />
      </CardContent>
    </Card>
  );
}





