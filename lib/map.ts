"use server";
import {
  Client,
  DistanceMatrixRowElement,
  Status,
  TravelMode,
} from "@googlemaps/google-maps-services-js";

const client = new Client();

export const getPlaceAutocomplete = async (input: string) => {
  if (!input.trim()) return;
  try {
    const res = await client.placeAutocomplete({
      params: {
        input,
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      },
    });
    return res.data.predictions;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export const getPlaceDetails = async (placeId: string) => {
  try {
    const res = await client.placeDetails({
      params: {
        place_id: placeId,
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      },
    });
    const data = res.data.result.geometry?.location;
    if (!data) return null;
    return {
      lat: data?.lat,
      lng: data?.lng,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export const getDistance = async (origins: string, destinations: string) => {
  try {
    const [driving, walking, publicTransport] = await Promise.all([
      client.distancematrix({
        params: {
          origins: [origins],
          destinations: [destinations],
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
          mode: TravelMode.driving,
        },
      }),
      client.distancematrix({
        params: {
          origins: [origins],
          destinations: [destinations],
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
          mode: TravelMode.walking,
        },
      }),
      client.distancematrix({
        params: {
          origins: [origins],
          destinations: [destinations],
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
          mode: TravelMode.transit,
        },
      }),
    ]);

    return {
      driving: driving.data.rows[0].elements[0],
      walking: walking.data.rows[0].elements[0],
      publicTransport: publicTransport.data.rows[0].elements[0],
      flight: {
        status: Status.ZERO_RESULTS,
        duration: { text: "Not available", value: 0 },
        distance: { text: "N/A", value: 0 },
      } as DistanceMatrixRowElement,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
