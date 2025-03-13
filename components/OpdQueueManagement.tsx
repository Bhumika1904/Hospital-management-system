'use client';

import { useState, useId } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OPDQueue, Patient } from '../types/hospital';

interface OPDQueueManagementProps {
  queues: OPDQueue[];
  addPatientToQueue: (queueId: string, patient: Patient) => void;
  removePatientFromQueue: (queueId: string, patientId: string) => void;
}

export function OPDQueueManagement({ queues, addPatientToQueue, removePatientFromQueue }: OPDQueueManagementProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [condition, setCondition] = useState('');
  const [selectedQueue, setSelectedQueue] = useState('');
  const id = useId();

  const handleAddPatient = () => {
    if (name && age && condition && selectedQueue) {
      const newPatient: Patient = {
        id: `patient-${Date.now()}`,
        name,
        age: parseInt(age),
        condition,
      };
      addPatientToQueue(selectedQueue, newPatient);
      setName('');
      setAge('');
      setCondition('');
      setSelectedQueue('');
    }
  };

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
          <Label htmlFor={`${id}-queue`}>Queue</Label>
          <Select value={selectedQueue} onValueChange={setSelectedQueue}>
            <SelectTrigger id={`${id}-queue`}>
              <SelectValue placeholder="Select queue" />
            </SelectTrigger>
            <SelectContent>
              {queues.map((queue) => (
                <SelectItem key={queue.id}
                value={queue.id}
                onValueChange={setSelectedQueue} // Function to update the selected queue
                closeDropdown={() => {}} // Function to close the dropdown
              >
                {queue.department}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={handleAddPatient} className="w-full">Add Patient to Queue</Button>

      <div className="space-y-6">
        {queues.map((queue) => (
          <div key={queue.id}>
            <h3 className="text-lg font-semibold mb-2">{queue.department} Queue</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queue.patients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.condition}</TableCell>
                      <TableCell>
                        <Button variant="destructive" onClick={() => removePatientFromQueue(queue.id, patient.id)}>
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
