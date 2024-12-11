// API Key for Google Places API
import { v1 } from '@googlemaps/places';

const apiKey = 'AIzaSyCUJkX3cVPs-ka6AcEk4XgmJcPxZ_z92zw';

// Create a new PlacesClient
const placesClient = new v1.PlacesClient({
  apiKey,
});

export { placesClient };
