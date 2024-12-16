import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AssistantService } from './assistant.service';

@ApiTags('assistant')
@Controller('assistant')
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @Post('process')
  @ApiOperation({ summary: 'Process user request' })
  @ApiBody({
    schema: {
      properties: {
        latitude: { type: 'number' },
        longitude: { type: 'number' },
      },
    },
  })
  async processCoordinates(
    @Body() body: { latitude: number; longitude: number },
  ) {
    const { latitude, longitude } = body;
    const res = await this.assistantService.getItineraries(latitude, longitude);

    return res;
  }
}
