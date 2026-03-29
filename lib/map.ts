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
