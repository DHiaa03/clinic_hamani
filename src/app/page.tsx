"use client";

import { useState } from 'react';
import { Header } from '@/components/Header';
import { SPECIALIZATIONS, DOCTORS } from '@/lib/data';
import { 
  Heart, 
  User, 
  Activity, 
  Baby, 
  Zap, 
  Eye, 
  Search, 
  ArrowRight,
  ShieldCheck,
  CalendarDays,
  Users,
  Stethoscope
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LinkedInPostGenerator } from '@/components/LinkedInPostGenerator';
import { toast } from '@/hooks/use-toast';

const iconMap: Record<string, any> = {
  Heart, User, Activity, Baby, Zap, Eye
};

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSpecializations = SPECIALIZATIONS.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-primary/5 py-20 px-4">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #4589A9 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="container mx-auto max-w-5xl text-center space-y-6 relative">
            <div className="inline-flex items-center gap-2 bg-accent/10 px-3 py-1 rounded-full text-accent font-semibold text-sm mb-4">
              <ShieldCheck className="h-4 w-4" />
              Verified Specialists at Clinic Hamani
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary font-headline tracking-tight">
              Modern Care, <span className="text-accent underline decoration-accent/30 underline-offset-8">Hamani Style</span>.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find and connect with top-rated medical specialists at Clinic Hamani. Browse our directory, view locations, and get AI-powered health insights.
            </p>
            <div className="max-w-md mx-auto relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 group-focus-within:text-accent transition-colors" />
              <Input 
                className="pl-10 h-12 shadow-sm rounded-full border-primary/20 bg-white" 
                placeholder="Search medical specializations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Directory Section */}
        <section className="py-20 container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1 space-y-10">
              <div className="flex items-end justify-between">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-primary">Browse Specializations</h2>
                  <p className="text-muted-foreground">Select a category to explore available doctors</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredSpecializations.map((spec) => {
                  const IconComp = iconMap[spec.iconName] || User;
                  const docCount = DOCTORS.filter(d => d.specializationId === spec.id).length;

                  return (
                    <Link key={spec.id} href={`/specialization/${spec.id}`} className="group">
                      <Card className="h-full border-2 border-transparent hover:border-accent hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white overflow-hidden">
                        <CardContent className="p-6 space-y-4">
                          <div className="h-12 w-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                            <IconComp className="h-6 w-6" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="text-lg font-bold text-primary">{spec.name}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                              {spec.description}
                            </p>
                          </div>
                          <div className="pt-2 flex items-center justify-between">
                            <span className="text-xs font-bold text-accent bg-accent/5 px-2 py-1 rounded-md">
                              {docCount} Hamani Specialists
                            </span>
                            <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                              <ArrowRight className="h-3 w-3" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
              
              {filteredSpecializations.length === 0 && (
                <div className="text-center py-20 bg-secondary/20 rounded-3xl border-2 border-dashed border-muted-foreground/20">
                  <p className="text-muted-foreground">No specializations found matching your search.</p>
                  <Button variant="link" onClick={() => setSearchTerm('')}>Clear search</Button>
                </div>
              )}
            </div>

            {/* Sidebar Marketing Tool */}
            <div className="lg:w-80 space-y-6">
              <div className="bg-white p-6 rounded-3xl border shadow-sm space-y-4">
                <h3 className="font-bold text-primary flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  Hamani Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Active Specialists</span>
                    <span className="font-bold">{DOCTORS.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Patient Satisfaction</span>
                    <span className="font-bold">4.9/5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Verified Clinics</span>
                    <span className="font-bold">12</span>
                  </div>
                </div>
              </div>

              <LinkedInPostGenerator />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-10">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight text-white">Clinic Hamani</span>
          </div>
          <p className="text-sm text-primary-foreground/70">
            &copy; 2025 Clinic Hamani Healthcare Network. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" className="hover:bg-white/10 text-white">Privacy</Button>
            <Button variant="ghost" size="sm" className="hover:bg-white/10 text-white">Terms</Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
