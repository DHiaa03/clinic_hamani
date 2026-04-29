"use client";

import { type Doctor } from '@/lib/data';
import { Star, Clock, MapPin, CheckCircle2, Award, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';

export function DoctorProfile({ doctor }: { doctor: Doctor }) {
  const placeholder = PlaceHolderImages.find(p => p.id === doctor.image) || PlaceHolderImages[0] || {
    imageUrl: 'https://picsum.photos/seed/default/400/400',
    imageHint: 'medical professional'
  };

  const handleBook = () => {
    toast({
      title: "Booking Initiated",
      description: `Connecting to ${doctor.name}'s schedule...`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="shrink-0">
          <div className="relative h-48 w-48 rounded-2xl overflow-hidden shadow-md border-4 border-white bg-secondary">
            <Image 
              src={placeholder.imageUrl}
              alt={doctor.name}
              fill
              className="object-cover"
              data-ai-hint={placeholder.imageHint}
            />
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className="bg-accent/10 text-accent font-semibold px-2">
                Verified Hamani Expert
              </Badge>
              <div className="flex items-center gap-1 text-sm font-medium text-amber-500">
                <Star className="h-4 w-4 fill-amber-500" />
                {doctor.rating}
              </div>
            </div>
            <h2 className="text-3xl font-bold text-primary font-headline">{doctor.name}</h2>
            <p className="text-muted-foreground flex items-center gap-1">
              <Award className="h-4 w-4 text-accent" />
              {doctor.experience} years of clinical experience
            </p>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {doctor.bio}
          </p>

          <div className="flex flex-wrap gap-2">
            <Button className="bg-primary hover:bg-primary/90" onClick={handleBook}>
              <Calendar className="h-4 w-4 mr-2" />
              Book Appointment
            </Button>
            <Button variant="outline" className="border-accent text-accent hover:bg-accent/5" onClick={() => toast({ title: "Contacting Hamani Office..." })}>
              Contact Office
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5 text-accent" />
            Weekly Availability
          </h3>
          <div className="bg-white rounded-xl p-4 border shadow-sm">
            <ul className="space-y-3">
              {doctor.availability.length > 0 ? (
                doctor.availability.map((time, idx) => (
                  <li key={idx} className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{time.split(' ')[0]}</span>
                    <span className="text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-full">{time.split(' ').slice(1).join(' ')}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted-foreground italic">Schedule currently being updated</li>
              )}
            </ul>
          </div>
          <div className="space-y-2 pt-2">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Primary Clinic
            </h4>
            <p className="text-sm text-muted-foreground ml-6">{doctor.location.name}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-accent" />
            Patient Reviews
          </h3>
          <div className="space-y-3">
            {doctor.reviews.length > 0 ? (
              doctor.reviews.map((review) => (
                <div key={review.id} className="bg-white p-4 rounded-xl border shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">{review.user}</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic">"{review.comment}"</p>
                </div>
              ))
            ) : (
              <div className="bg-secondary/20 p-4 rounded-xl text-center">
                <p className="text-sm text-muted-foreground">No recent reviews for this specialist.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
