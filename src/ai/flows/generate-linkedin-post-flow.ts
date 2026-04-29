'use server';
/**
 * @fileOverview This file implements a Genkit flow to generate a professional LinkedIn post
 * for promoting medical services or the ClinicConnect platform.
 *
 * - generateLinkedInPost - A function that handles the generation process.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLinkedInPostInputSchema = z.object({
  topic: z.string().describe('The topic or area to promote (e.g., a specific medical specialization or the platform itself).'),
});
export type GenerateLinkedInPostInput = z.infer<typeof GenerateLinkedInPostInputSchema>;

const GenerateLinkedInPostOutputSchema = z.object({
  postContent: z.string().describe('A professional and engaging LinkedIn post.'),
});
export type GenerateLinkedInPostOutput = z.infer<typeof GenerateLinkedInPostOutputSchema>;

/**
 * Wrapper function to call the LinkedIn post generation Genkit flow.
 */
export async function generateLinkedInPost(input: GenerateLinkedInPostInput): Promise<GenerateLinkedInPostOutput> {
  return generateLinkedInPostFlow(input);
}

const generateLinkedInPostPrompt = ai.definePrompt({
  name: 'generateLinkedInPostPrompt',
  input: {schema: GenerateLinkedInPostInputSchema},
  output: {schema: GenerateLinkedInPostOutputSchema},
  prompt: `You are a professional healthcare marketing expert. 
  Write an engaging, professional LinkedIn post for "ClinicConnect", a modern healthcare directory.
  
  Topic: {{{topic}}}
  
  The post should:
  1. Have a strong, professional hook.
  2. Mention the benefits of using ClinicConnect (verified specialists, AI-powered health insights, and seamless scheduling).
  3. Use a tone that is authoritative yet accessible.
  4. Include 3-5 relevant professional hashtags.
  5. Include a call to action to visit the platform.`,
});

const generateLinkedInPostFlow = ai.defineFlow(
  {
    name: 'generateLinkedInPostFlow',
    inputSchema: GenerateLinkedInPostInputSchema,
    outputSchema: GenerateLinkedInPostOutputSchema,
  },
  async (input) => {
    const {output} = await generateLinkedInPostPrompt(input);
    return output!;
  }
);
