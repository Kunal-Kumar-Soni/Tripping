import { auth } from "@/lib/firebase";
import { CreateTrip } from "@/types/trips";

const BASE_URL = "https://tripping.nullbraces.dev";

const getIdToken = async () => {
  const token = await auth.currentUser?.getIdToken();

  if (!token) {
    throw new Error("No token found");
  }

  return token;
};

export const getTrips = async () => {
  try {
    const token = await getIdToken();

    const res = await fetch(`${BASE_URL}/api/trips`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch trips");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createTrip = async (data: CreateTrip) => {
  try {
    const token = await getIdToken();

    const res = await fetch(`${BASE_URL}/api/trips`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to create trip");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
