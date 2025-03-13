'use client';

import { useState, useId } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Admission, Bed, Patient } from '../types/hospital';

interface PatientAdmissionsProps {
  admissions: Admission[];
  beds: Bed[];
  admitPatient: (patient: Patient, bedId: string) => void;
  dischargePatient: (admissionId: string) => void;
}

export function PatientAdmissions({
  admissions,
  beds,
  admitPatient,
  dischargePatient
}: PatientAdmissionsProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [condition, setCondition] = useState('');
  const [selectedBed, setSelectedBed] = useState('');
  const id = useId();

  const handleAdmitPatient = () => {
    if (name && age && condition && selectedBed) {
      const newPatient: Patient = {
        id: `patient-${Date.now()}`,
        name,
        age: parseInt(age),
        condition,
      };
      admitPatient(newPatient, selectedBed);
      setName('');
      setAge('');
      setCondition('');
      setSelectedBed('');
    }
  };

  const availableBeds = beds.filter(bed => !bed.isOccupied);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`${id}-name`}>Name</Label>
          <Input id={`${id}-name`} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor={`${id}-age`}>Age</Label>
          <Input id={`${id}-age`} type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div>
          <Label htmlFor={`${id}-condition`}>Condition</Label>
          <Input id={`${id}-condition`} value={condition} onChange={(e) => setCondition(e.target.value)} />
        </div>
        <div>
          <Label htmlFor={`${id}-bed`}>Bed</Label>
          <Select value={selectedBed} onValueChange={setSelectedBed}>
            <SelectTrigger id={`${id}-bed`}>
              <SelectValue placeholder="Select bed" />
            </SelectTrigger>
            <SelectContent>
              {availableBeds.map((bed) => (
               <SelectItem
               key={bed.id}
               value={bed.id}
               onValueChange={setSelectedBed} // Update the selected bed
               closeDropdown={() => {}}       // Handled internally by Select
             >
               {bed.id} ({bed.ward})
               </SelectItem>
               
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={handleAdmitPatient} className="w-full">Admit Patient</Button>

      <div>
        <h3 className="text-lg font-semibold mb-2">Current Admissions</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Bed</TableHead>
                <TableHead>Admission Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admissions.map((admission) => (
                <TableRow key={admission.id}>
                  <TableCell>{admission.patient.name}</TableCell>
                  <TableCell>{admission.patient.age}</TableCell>
                  <TableCell>{admission.patient.condition}</TableCell>
                  <TableCell>{admission.bed.id} ({admission.bed.ward})</TableCell>
                  <TableCell>{new Date(admission.admissionDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => dischargePatient(admission.id)}>
                      Discharge
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
