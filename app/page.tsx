import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Stethoscope, Bed, ClipboardList } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div
        className="flex-grow bg-cover bg-center"
        style={{
          backgroundColor: 'lightskyblue',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="container mx-auto px-4 py-16">
          <header className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-black">Welcome to Hospital Management System</h1>
            <p className="text-xl text-black-200">Streamline your hospital operations with our comprehensive management solution</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-6 w-6 text-primary" />
                  OPD Queue
                </CardTitle>
                <CardDescription>Manage outpatient department queues efficiently</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Streamline patient flow and reduce waiting times in your OPD.</p>
              </CardContent>
              <CardFooter>
                <Link href="/opd-queue" className="w-full">
                  <Button className="w-full">Manage OPD Queue</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bed className="h-6 w-6 text-primary" />
                  Bed Availability
                </CardTitle>
                <CardDescription>Real-time bed occupancy tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Get instant updates on bed availability across all wards.</p>
              </CardContent>
              <CardFooter>
                <Link href="/bed-availability" className="w-full">
                  <Button className="w-full">Check Bed Availability</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-6 w-6 text-primary" />
                  Patient Admissions
                </CardTitle>
                <CardDescription>Manage patient admissions and discharges</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Efficiently handle patient admissions and discharge processes.</p>
              </CardContent>
              <CardFooter>
                <Link href="/patient-admissions" className="w-full">
                  <Button className="w-full">Manage Admissions</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Hospital Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}