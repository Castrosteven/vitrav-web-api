import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI, { OpenAI as OpenAIType } from 'openai';

import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

const ItineraryItem = z.object({
  time_of_day: z.string().describe('Suggested starting time for the activity.'),
  activity_attraction: z
    .string()
    .describe('Name and brief description of the activity or attraction.'),
  location: z
    .string()
    .describe('Address or significant landmark of the activity.'),
  estimated_duration: z
    .string()
    .describe('Estimated time to be spent at the location.'),
  additional_notes: z
    .string()
    .describe('Any relevant tips or details regarding the activity.'),
});

export const DailyItinerary = z.object({
  itinerary: z
    .array(ItineraryItem)
    .describe(
      'A structured list of activities for the day, each with detailed information.',
    ),
});

// OpenAI response format
export const responseFormat = zodResponseFormat(DailyItinerary, 'Itinerary');

@Injectable()
export class AssistantService {
  private openAi: OpenAI;
  private assistantId: string | null = null;

  constructor() {
    this.openAi = new OpenAI({
      apiKey: process.env.OPEN_AI_SERVICE_KEY || '',
    });
  }

  // Initialize the Assistant if not already created
  private async getOrCreateAssistant() {
    if (this.assistantId) return this.assistantId;

    try {
      const assistant = await this.openAi.beta.assistants.create({
        name: 'Travel Itinerary Planner',
        instructions:
          'You are a travel assistant. Given a latitude and longitude, provide 5 detailed itineraries, each containing a list of places to visit.',
        tools: [],
        model: 'gpt-4o-mini',
        response_format: responseFormat,
      });

      this.assistantId = assistant.id;
      return this.assistantId;
    } catch (error) {
      console.error('Error creating assistant:', error);
      throw new InternalServerErrorException(
        `Error creating assistant: ${error.message}`,
      );
    }
  }

  // Single method to handle the process
  async getItineraries(latitude: number, longitude: number) {
    try {
      const assistantId = await this.getOrCreateAssistant();

      // Step 1: Create a new thread
      const thread = await this.openAi.beta.threads.create();
      console.log(`Thread created: ${thread.id}`);

      // Step 2: Add the user's location as a message to the thread
      const userMessage = `I am located at latitude ${latitude} and longitude ${longitude}. Please give me 5 detailed itineraries with places to visit.`;
      await this.openAi.beta.threads.messages.create(thread.id, {
        role: 'user',
        content: userMessage,
      });
      console.log('User location message added to thread');

      // Step 3: Create and poll the run
      const run = await this.openAi.beta.threads.runs.createAndPoll(thread.id, {
        assistant_id: assistantId,
        instructions:
          'Provide 5 itineraries, each with a list of places to visit, tailored to the provided coordinates.',
      });

      console.log(`Run status: ${run.status}`);

      // Step 4: If the run is completed, list the messages
      if (run.status === 'completed') {
        const messages = await this.openAi.beta.threads.messages.list(
          thread.id,
        );

        // Extract assistant's response
        const assistantMessages = messages.data.filter(
          (msg) => msg.role === 'assistant',
        );

        console.log('Assistant messages:', assistantMessages);

        const messageValues = assistantMessages.map((msg) => {
          const m = msg.content as OpenAIType.Beta.Threads.TextContentBlock[];
          return m.map((a) => a.text.value);
        });
        return messageValues.map((m) => {
          return m.map((a) => JSON.parse(a));
        });
      } else {
        return {
          status: run.status,
          message: 'Run did not complete successfully.',
        };
      }
    } catch (error) {
      console.error('Error processing itinerary request:', error);
      throw new InternalServerErrorException(
        `Error processing itinerary request: ${error.message}`,
      );
    }
  }
}
