'use server';
/**
 * @fileOverview This file implements a Genkit flow to generate a brief overview and common symptom tips
 * for a given medical specialization.
 *
 * - generateSpecializationOverview - A function that handles the generation process.
 * - GenerateSpecializationOverviewInput - The input type for the generateSpecializationOverview function.
 * - GenerateSpecializationOverviewOutput - The return type for the generateSpecializationOverview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema for the specialization overview generation.
const GenerateSpecializationOverviewInputSchema = z.object({
  specializationName: z.string().describe('The name of the medical specialization (e.g., Cardiology, Dermatology).'),
});
export type GenerateSpecializationOverviewInput = z.infer<typeof GenerateSpecializationOverviewInputSchema>;

// Output schema for the specialization overview generation.
const GenerateSpecializationOverviewOutputSchema = z.object({
  overview: z.string().describe('A brief, helpful overview of the medical specialization.'),
  commonSymptomTips: z.array(z.string()).describe('A list of 3-5 common symptom tips related to this medical specialization.'),
});
export type GenerateSpecializationOverviewOutput = z.infer<typeof GenerateSpecializationOverviewOutputSchema>;

/**
 * Wrapper function to call the specialization overview Genkit flow.
 * @param input The specialization name.
 * @returns A promise that resolves to the generated overview and symptom tips.
 */
export async function generateSpecializationOverview(input: GenerateSpecializationOverviewInput): Promise<GenerateSpecializationOverviewOutput> {
  return generateSpecializationOverviewFlow(input);
}

// Define the Genkit prompt for generating the specialization overview.
const generateSpecializationOverviewPrompt = ai.definePrompt({
  name: 'generateSpecializationOverviewPrompt',
  input: {schema: GenerateSpecializationOverviewInputSchema},
  output: {schema: GenerateSpecializationOverviewOutputSchema},
  prompt: `You are a helpful medical assistant. For the "{{{specializationName}}}" medical specialization, please provide a brief overview and a list of 3-5 common symptom tips.`, 
});

// Define the Genkit flow.
const generateSpecializationOverviewFlow = ai.defineFlow(
  {
    name: 'generateSpecializationOverviewFlow',
    inputSchema: GenerateSpecializationOverviewInputSchema,
    outputSchema: GenerateSpecializationOverviewOutputSchema,
  },
  async (input) => {
    const {output} = await generateSpecializationOverviewPrompt(input);
    return output!;
  }
);
