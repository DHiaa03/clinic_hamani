"use client";

import { useState } from "react";
import { generateLinkedInPost } from "@/ai/flows/generate-linkedin-post-flow";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Linkedin, Sparkles, Loader2, Copy, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function LinkedInPostGenerator() {
  const [topic, setTopic] = useState("");
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    if (!topic) return;
    setLoading(true);
    setPostContent("");
    try {
      const result = await generateLinkedInPost({ topic });
      setPostContent(result.postContent);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Generation failed",
        description: "Could not generate LinkedIn post. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(postContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied!",
      description: "Post content copied to clipboard.",
    });
  }

  return (
    <Card className="border-accent/20 shadow-lg bg-white overflow-hidden">
      <CardHeader className="bg-primary/5 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-primary p-1.5 rounded-lg text-white">
            <Linkedin className="h-4 w-4" />
          </div>
          <CardTitle className="text-xl text-primary font-headline">LinkedIn Post Generator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Generate professional marketing copy for your specialization or clinic.
        </p>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="flex gap-2">
          <Input 
            placeholder="e.g. Modern Cardiology, Pediatric Care..." 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={loading}
          />
          <Button onClick={handleGenerate} disabled={loading || !topic}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
            Generate
          </Button>
        </div>

        {postContent && (
          <div className="relative mt-4 group">
            <div className="bg-secondary/30 p-4 rounded-xl text-sm leading-relaxed whitespace-pre-wrap border animate-fade-in">
              {postContent}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white shadow-sm"
              onClick={handleCopy}
            >
              {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
