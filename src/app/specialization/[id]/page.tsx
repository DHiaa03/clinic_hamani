"use client";

import { use, useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/Header';
import { SPECIALIZATIONS, DOCTORS, type Specialization, type Doctor } from '@/lib/data';
import { SpecializationAIBox } from '@/components/SpecializationAIBox';
import { ClinicMap } from '@/components/ClinicMap';
import { DoctorCard } from '@/components/DoctorCard';
import { DoctorProfile } from '@/components/DoctorProfile';
import { Button } from '@/components/ui/button';
import { ArrowLeft, UserPlus, Filter, Star } from 'lucide-react';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";

export default function SpecializationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const specialization = SPECIALIZATIONS.find(s => s.id === id);
  const doctors = useMemo(() => DOCTORS.filter(d => d.specializationId === id), [id]);
  
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | undefined>(doctors[0]?.id);
  const selectedDoctor = useMemo(() => DOCTORS.find(d => d.id === selectedDoctorId), [selectedDoctorId]);

  useEffect(() => {
    if (doctors.length > 0 && !doctors.some(d => d.id === selectedDoctorId)) {
      setSelectedDoctorId(doctors[0].id);
    }
  }, [id, doctors, selectedDoctorId]);

  const handleGenericAction = (action: string) => {
    toast({
      title: `${action}`,
      description: "This feature is coming soon to Clinic Hamani.",
    });
  };

  if (!specialization) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">Specialization not found</h1>
        <Link href="/">
          <Button>Back to Directory</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 space-y-4">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-accent hover:underline mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Clinic Hamani Directory
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-primary font-headline">{specialization.name}</h1>
              <p className="text-muted-foreground max-w-2xl">{specialization.description}</p>
            </div>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter Specialists
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Filter Specialists</DialogTitle>
                    <DialogDescription>
                      Adjust settings to find your perfect match at Clinic Hamani.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-6 space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-secondary/50" onClick={() => handleGenericAction('Rating Filter')}>
                      <span>Minimum Rating (4.0+)</span>
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-secondary/50" onClick={() => handleGenericAction('Experience Filter')}>
                      <span>Experience (10+ years)</span>
                      <span className="text-xs font-bold text-muted-foreground">Apply</span>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-9">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Join as Specialist
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Apply to Join Clinic Hamani</DialogTitle>
                    <DialogDescription>
                      Our network is always looking for world-class specialists.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 text-center space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Please send your CV and accreditation details to <strong>recruitment@hamani.clinic</strong>
                    </p>
                    <Button onClick={() => handleGenericAction('Application Sent')}>Submit Interest</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Doctor List & AI Tool */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-foreground/80 flex items-center gap-2">
                  Hamani Specialists
                  <span className="bg-secondary text-secondary-foreground text-[10px] px-2 py-0.5 rounded-full">
                    {doctors.length}
                  </span>
                </h3>
              </div>
              <ScrollArea className="h-[400px] lg:h-[calc(100vh-450px)] pr-4">
                <div className="space-y-3">
                  {doctors.map(doc => (
                    <DoctorCard 
                      key={doc.id} 
                      doctor={doc} 
                      isSelected={selectedDoctorId === doc.id}
                      onClick={() => setSelectedDoctorId(doc.id)}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>

            <SpecializationAIBox specializationName={specialization.name} />
          </div>

          {/* Right Column: Profile & Map */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border animate-fade-in min-h-[600px]">
              {selectedDoctor ? (
                <DoctorProfile doctor={selectedDoctor} />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-20">
                  <div className="bg-secondary p-4 rounded-full mb-4">
                    <UserPlus className="h-8 w-8 text-primary/40" />
                  </div>
                  <p>Select a specialist to view their full profile at Clinic Hamani</p>
                </div>
              )}
            </div>

            <div className="h-[500px]">
              <ClinicMap 
                doctors={doctors} 
                selectedDoctorId={selectedDoctorId} 
                onSelectDoctor={setSelectedDoctorId}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
