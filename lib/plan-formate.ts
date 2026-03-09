import { Plan } from "@/types/plan";

export const getDays = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const result: string[] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    result.push(current.toISOString().slice(0, 10));
    current.setDate(current.getDate() + 1);
  }

  return result;
};

export const formatPlan = (plan: Plan) => {
  const date = plan.start_date.split("T")[0];

  const startHour = Number(plan.start_time.split(":")[0]);
  const endHour = Number(plan.end_time.split(":")[0]);

  const duration = endHour - startHour;

  return {
    id: plan.id,
    title: plan.title,
    address: plan.address ?? null,
    date,
    startHour,
    endHour,
    duration,
    order_index: plan.order_index ?? null,
  };
};

export const formatHour12 = (hour: number) => {
  const period = hour < 12 ? "AM" : "PM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

  return `${String(formattedHour).padStart(2, "0")}:00 ${period}`;
};
