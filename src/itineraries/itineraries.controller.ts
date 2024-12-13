import { ItinerariesService } from './itineraries.service';
import { CreateItineraryInput } from './dto/create-itinerary.input';
import { CurrentUser } from 'src/user.decorator';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from '@prisma/client';

/**
 * Controller for handling itineraries related requests.
 */
@Controller('itineraries')
export class ItinerariesController {
  /**
   * Constructs a new instance of ItinerariesController.
   * @param itinerariesService - The service used to manage itineraries.
   */
  constructor(private readonly itinerariesService: ItinerariesService) {}

  /**
   * Creates a new itinerary.
   * This route is protected with JWT authentication.
   * @param user - The current authenticated user.
   * @param createItineraryInput - The input data for creating a new itinerary.
   * @returns The created itinerary.
   */
  @Post('')
  @UseGuards(JwtAuthGuard)
  createItinerary(
    @CurrentUser() user: User,
    @Body() createItineraryInput: CreateItineraryInput,
  ) {
    console.log(`User: ${user.id} is creating itinerary`);
    return this.itinerariesService.create(createItineraryInput, user);
  }

  /**
   * Retrieves all itineraries.
   * @returns A list of all itineraries.
   */
  @Get('')
  async getItinerariesNear(
    @Query('lat') lat: string,
    @Query('long') long: string,
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ) {
    // Parse lat, long, page, pageSize from query params
    const latitude = parseFloat(lat);
    const longitude = parseFloat(long);
    const pageNum = parseInt(page, 10);
    const pageSizeNum = parseInt(pageSize, 10);

    // Ensure lat and long are valid numbers
    if (isNaN(latitude) || isNaN(longitude)) {
      return {
        statusCode: 400,
        message: 'Invalid latitude or longitude.',
      };
    }

    // Call service to get the itineraries
    const itineraries = await this.itinerariesService.getItinerariesNear(
      latitude,
      longitude,
      pageNum,
      pageSizeNum,
    );

    // Return response
    return {
      page: pageNum,
      pageSize: pageSizeNum,
      itineraries,
    };
  }

  /**
   * Retrieves a single itinerary by its ID.
   * @param id - The ID of the itinerary to retrieve.
   * @returns The requested itinerary.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itinerariesService.findOne(id);
  }

  /**
   * Generates an itinerary based on the provided ID and coordinates.
   * @param id - The ID of the itinerary to generate.
   * @param lat - The latitude coordinate.
   * @param long - The longitude coordinate.
   * @returns The generated itinerary.
   */
  @Get('/generate/:id')
  generate(
    @Param('id') id: string,
    @Query('lat') lat: number,
    @Query('long') long: number,
  ) {
    return this.itinerariesService.generate(id, lat, long);
  }
}
