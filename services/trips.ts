import { auth } from "@/lib/firebase";
import { CreateTrip } from "@/types/trips";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

//! Get Token
const getToken = async () => {
  const token = await auth.currentUser?.getIdToken();

  if (!token) {
    throw new Error("No token found");
  }

  return token;
};

//! All Trips

//? GET METHOD
export const getTrips = async () => {
  try {
    const token = await getToken();

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

//? POST METHOD
export const createTrip = async (data: CreateTrip) => {
  try {
    const token = await getToken();

    const res = await fetch(`${BASE_URL}/api/trips`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to create trip");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//! Individual Trip

//? GET METHOD
export const getSingleTrip = async (id: number) => {
  try {
    const token = await getToken();

    const res = await fetch(`${BASE_URL}/api/trips/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch single trip");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//? PUT METHOD
export const updateSingleTrip = async (id: number, data: Partial<CreateTrip>) => {
  try {
    const token = await getToken();
    const res = await fetch(`${BASE_URL}/api/trips/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to Update single trip");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//? DELETE METHOD
export const deleteSingleTrip = async (id: number) => {
  try {
    const token = await getToken();
    const res = await fetch(`${BASE_URL}/api/trips/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to delete single trip");
    }

    if (res.status === 204) return;

    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
