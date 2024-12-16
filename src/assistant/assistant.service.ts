import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

const Itinerary = z.object({
  title: z.string(),
  description: z.string(),
  places: z.array(z.string()),
});

const ListOfItineraries = z.object({
  itinerarylist: z.array(Itinerary),
});

@Injectable()
export class AssistantService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPEN_AI_SERVICE_KEY || '',
    });
  }

  public async generate({ location }: { location: string }) {
    const completion = await this.openai.beta.chat.completions.parse({
      model: 'gpt-4o-2024-08-06',
      messages: [
        {
          role: 'system',
          content:
            'Create a list of 5 itineraries, so that I can have multiple to choose from. For a day in a city give me 5 places to visit that includes restaurants, activities, and sightseeing. The Places should be the exact name of the location so that I can look it up on google maps. Only include the location name',
        },
        {
          role: 'user',
          content: `${location} two people 100$ budget in their 20s`,
        },
      ],
      response_format: zodResponseFormat(ListOfItineraries, 'itinerarylist'),
    });
    const event = completion.choices[0].message.parsed;
    return event;
  }
}
