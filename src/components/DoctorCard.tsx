"use client";

import { type Doctor } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MapPin, ChevronRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export function DoctorCard({ 
  doctor, 
  isSelected, 
  onClick 
}: { 
  doctor: Doctor, 
  isSelected: boolean,
  onClick: () => void 
}) {
  // Use a fallback image if the ID doesn't match a placeholder
  const placeholder = PlaceHolderImages.find(p => p.id === doctor.image) || {
    imageUrl: `https://picsum.photos/seed/${doctor.id}/400/400`,
    imageHint: 'medical doctor profile'
  };

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-md border-2 group ${
        isSelected ? 'border-accent bg-accent/5' : 'border-transparent bg-white'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4 flex gap-4 items-center">
        <div className="relative h-16 w-16 rounded-full overflow-hidden shrink-0 border-2 border-primary/10 bg-secondary">
          <Image 
            src={placeholder.imageUrl} 
            alt={doctor.name} 
            fill 
            className="object-cover"
            data-ai-hint={placeholder.imageHint}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-primary truncate">{doctor.name}</h4>
            <div className="flex items-center gap-0.5 text-xs font-medium text-amber-500 shrink-0">
              <Star className="h-3 w-3 fill-amber-500" />
              {doctor.rating}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-1">{doctor.experience} yrs exp.</p>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground truncate">
            <MapPin className="h-3 w-3 shrink-0" />
            {doctor.location.name}
          </div>
        </div>
        <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform ${isSelected ? 'translate-x-1 text-accent' : 'group-hover:translate-x-1'}`} />
      </CardContent>
    </Card>
  );
}
