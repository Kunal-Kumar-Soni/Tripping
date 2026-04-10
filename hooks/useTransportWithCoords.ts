import { usePlan } from "@/hooks/usePlan";
import { useTransport } from "@/hooks/useTransport";
import { TransportType } from "@/types/transport";

export const useTransportWithCoords = () => {
  const { plans } = usePlan();
  const { transports } = useTransport();

  const planMap = new Map();
  plans.forEach((p) => planMap.set(p.id, p));

  const enrichedTransports = transports.map((t) => {
    const from = planMap.get(t.from_item_id);
    const to = planMap.get(t.to_item_id);

    return {
      id: t.id,
      fromLat: from?.lat,
      fromLng: from?.lng,
      toLat: to?.lat,
      toLng: to?.lng,
      travelMode: t.mode,
      duration_text: t.duration_text,
    };
  });

  return { transports: enrichedTransports };
};

export const getTravelMode = (mode: TransportType): google.maps.TravelMode => {
  switch (mode) {
    case "driving":
      return google.maps.TravelMode.DRIVING;
    case "walking":
      return google.maps.TravelMode.WALKING;
    case "transit":
      return google.maps.TravelMode.TRANSIT;
    case "flight":
      return google.maps.TravelMode.BICYCLING;
    default:
      return google.maps.TravelMode.DRIVING;
  }
};
