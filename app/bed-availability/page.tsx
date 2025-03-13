'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BedAvailability } from '../../components/BedAvailability';
import { useHospitalContext } from '../../contexts/HospitalContext';

export default function BedAvailabilityPage() {
  const { beds } = useHospitalContext();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bed Availability</CardTitle>
        <CardDescription>View and manage hospital bed availability</CardDescription>
      </CardHeader>
      <CardContent>
        <BedAvailability beds={beds} />
      </CardContent>
    </Card>
  );
}
