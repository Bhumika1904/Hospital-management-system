import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { HospitalProvider } from '../contexts/HospitalContext'
import { Button } from "@/components/ui/button"
import { Home, Stethoscope, Bed, ClipboardList } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hospital Management System',
  description: 'Manage OPD queues, bed availability, and patient admissions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HospitalProvider>
          <nav className="bg-primary text-primary-foreground shadow-md">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <Link href="/" className="flex items-center gap-2 text-2xl font-bold mb-4 md:mb-0">
                  <Home className="h-6 w-6" />
                  Hospital Management
                </Link>
                <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                  <li>
                    <Link href="/opd-queue">
                      <Button variant="secondary" className="w-full md:w-auto">
                        <Stethoscope className="mr-2 h-4 w-4" /> OPD Queue
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/bed-availability">
                      <Button variant="secondary" className="w-full md:w-auto">
                        <Bed className="mr-2 h-4 w-4" /> Bed Availability
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/patient-admissions">
                      <Button variant="secondary" className="w-full md:w-auto">
                        <ClipboardList className="mr-2 h-4 w-4" /> Patient Admissions
                      </Button>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <main className="container mx-auto p-4">
            {children}
          </main>
        </HospitalProvider>
      </body>
    </html>
  )
}

