'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useHospitalContext } from '../contexts/HospitalContext';
import { Bed, Admission } from '@/types/hospital';

interface BedAvailabilityProps {
    beds: Bed[];
}

export function BedAvailability({ beds }: BedAvailabilityProps) {
    const { admissions } = useHospitalContext();

    const groupedBeds = beds.reduce((acc: Record<string, Bed[]>, bed: Bed) => {
        if (!acc[bed.ward]) {
            acc[bed.ward] = [];
        }
        acc[bed.ward].push(bed);
        return acc;
    }, {} as Record<string, Bed[]>);

    const getPatientName = (bedId: string): string => {
        const admission = admissions.find((a: Admission) => a.bed.id === bedId);
        return admission ? admission.patient.name : '-';
    };

    return (
        <div className="space-y-6">
            {Object.entries(groupedBeds).map(([ward, wardBeds]) => (
                <div key={ward}>
                    <h3 className="text-lg font-semibold mb-2">{ward}</h3>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Bed ID</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Patient Name</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {wardBeds.map((bed) => (
                                    <TableRow key={bed.id}>
                                        <TableCell>{bed.id}</TableCell>
                                        <TableCell>
                                            <Badge variant={bed.isOccupied ? "destructive" : "secondary"}>
                                                {bed.isOccupied ? "Occupied" : "Available"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{getPatientName(bed.id)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            ))}
        </div>
    );
}
