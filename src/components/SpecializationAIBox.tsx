"use client";

import { useState, useEffect } from "react";
import { generateSpecializationOverview, type GenerateSpecializationOverviewOutput } from "@/ai/flows/generate-specialization-overview-flow";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sparkles, Loader2, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function SpecializationAIBox({ specializationName }: { specializationName: string }) {
  const [data, setData] = useState<GenerateSpecializationOverviewOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOverview() {
      setLoading(true);
      try {
        const result = await generateSpecializationOverview({ specializationName });
        setData(result);
      } catch (error) {
        console.error("AI flow failed", error);
      } finally {
        setLoading(false);
      }
    }
    loadOverview();
  }, [specializationName]);

  if (loading) {
    return (
      <Card className="border-accent/30 bg-accent/5">
        <CardContent className="flex flex-col items-center justify-center p-8 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-accent mb-4" />
          <p className="text-sm font-medium">Generating AI specialization insights...</p>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <Card className="border-accent/30 bg-white/50 backdrop-blur overflow-hidden shadow-md animate-fade-in">
      <div className="bg-accent/10 p-2 flex items-center gap-2 px-6">
        <Sparkles className="h-4 w-4 text-accent" />
        <span className="text-[10px] uppercase font-bold tracking-widest text-accent-foreground/70">AI-Powered Insights</span>
      </div>
      <CardHeader className="pt-4">
        <CardTitle className="text-lg text-primary flex items-center gap-2">
          Understanding {specializationName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-muted-foreground italic">
          "{data.overview}"
        </p>
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold flex items-center gap-2 text-foreground/80">
            <Lightbulb className="h-3 w-3 text-accent" />
            COMMON SYMPTOM TIPS
          </h4>
          <ul className="grid grid-cols-1 gap-2">
            {data.commonSymptomTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                <span className="text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}