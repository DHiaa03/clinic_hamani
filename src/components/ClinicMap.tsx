"use client";

import { MapPin, Info } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { type Doctor } from '@/lib/data';

export function ClinicMap({ doctors, selectedDoctorId, onSelectDoctor }: { 
  doctors: Doctor[], 
  selectedDoctorId?: string,
  onSelectDoctor?: (id: string) => void 
}) {
  return (
    <Card className="h-full border-none shadow-lg overflow-hidden flex flex-col">
      <CardHeader className="bg-primary text-primary-foreground py-4">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Clinic Locations
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 bg-secondary/30 relative min-h-[400px]">
        {/* Fake Map Grid */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #4589A9 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        
        {/* Fake Streets */}
        <div className="absolute top-1/4 left-0 right-0 h-4 bg-white/50 border-y border-primary/10 -rotate-2" />
        <div className="absolute top-0 bottom-0 left-1/3 w-6 bg-white/50 border-x border-primary/10 rotate-1" />
        <div className="absolute bottom-1/4 left-0 right-0 h-3 bg-white/50 border-y border-primary/10 rotate-1" />

        <div className="relative w-full h-full">
          <TooltipProvider>
            {doctors.map((doc) => (
              <Tooltip key={doc.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onSelectDoctor?.(doc.id)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                      selectedDoctorId === doc.id ? 'z-20 scale-125' : 'z-10 hover:scale-110'
                    }`}
                    style={{ left: `${doc.location.x}%`, top: `${doc.location.y}%` }}
                  >
                    <div className={`relative flex items-center justify-center`}>
                      <MapPin className={`h-8 w-8 ${selectedDoctorId === doc.id ? 'text-accent fill-accent/20' : 'text-primary fill-primary/10'}`} />
                      <div className={`absolute -bottom-1 whitespace-nowrap bg-white px-1.5 py-0.5 rounded text-[8px] font-bold shadow-sm border border-border`}>
                        {doc.name.split(' ').pop()}
                      </div>
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <div className="text-xs">
                    <p className="font-bold">{doc.location.name}</p>
                    <p className="text-muted-foreground">{doc.name}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>

        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-2 rounded-lg shadow-sm border text-[10px] flex items-center gap-2">
          <Info className="h-3 w-3 text-primary" />
          Interactive simulated clinic map
        </div>
      </CardContent>
    </Card>
  );
}