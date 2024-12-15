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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Itinerary, ItineraryCategory, User } from '@prisma/client';
import { protos } from '@googlemaps/places';

@Controller('itineraries')
export class ItinerariesController {
  constructor(private readonly itinerariesService: ItinerariesService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  createItinerary(
    @CurrentUser() user: User,
    @Body() createItineraryInput: CreateItineraryInput,
  ) {
    console.log(`User: ${user.id} is creating itinerary`);
    return this.itinerariesService.create(createItineraryInput, user);
  }

  @Get('')
  async getItinerariesNear(
    @Query('lat') lat: string,
    @Query('long') long: string,
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ): Promise<{
    page: number;
    pageSize: number;
    itineraries: Itinerary[];
  }> {
    let itineraries: Itinerary[] = [];
    const latitude = parseFloat(lat);
    const longitude = parseFloat(long);
    const pageNum = parseInt(page, 10);
    const pageSizeNum = parseInt(pageSize, 10);

    if (isNaN(latitude) || isNaN(longitude)) {
      throw new HttpException(
        'Invalid latitude or longitude.',
        HttpStatus.BAD_REQUEST,
      );
    }

    itineraries = await this.itinerariesService.getItinerariesNear(
      latitude,
      longitude,
      pageNum,
      pageSizeNum,
    );
    console.log(itineraries);

    if (itineraries.length === 0) {
      itineraries = await this.itinerariesService.aiGenerator(
        latitude,
        longitude,
      );
    }

    return {
      page: pageNum,
      pageSize: pageSizeNum,
      itineraries,
    };
  }

  @Get('generate/:id')
  async generate(
    @Param('id') id: string,
    @Query('lat') lat: number,
    @Query('long') long: number,
  ): Promise<{
    id: string;
    itinerary_title: string;
    itinerary_category: ItineraryCategory;
    activities: protos.google.maps.places.v1.IPlace[];
  }> {
    return await this.itinerariesService.generate(id, lat, long);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itinerariesService.findOne(id);
  }
}
