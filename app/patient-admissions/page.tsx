'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PatientAdmissions } from '../../components/PatientAdmissions';
import { useHospitalContext } from '../../contexts/HospitalContext';

export default function PatientAdmissionsPage() {
  const { admissions, beds, admitPatient, dischargePatient } = useHospitalContext();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Patient Admissions</CardTitle>
        <CardDescription>Manage patient admissions and discharges</CardDescription>
      </CardHeader>
      <CardContent>
        <PatientAdmissions 
          admissions={admissions}
          beds={beds}
          admitPatient={admitPatient}
          dischargePatient={dischargePatient}
        />
      </CardContent>
    </Card>
  );
}
