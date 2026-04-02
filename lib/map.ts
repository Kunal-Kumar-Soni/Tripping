"use server";
import { Client } from "@googlemaps/google-maps-services-js";

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
