export const getDays = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const result: string[] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    result.push(current.toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }

  return result;
};

export const formatDate = (date: string) => {
  return date.split("T")[0];
};
export const formatHourToNumber = (hour: string) => {
  return Number(hour.split(":")[0]);
};
export const formatHour = (hour: number) => {
  return `${hour.toString().padStart(2, "0")}:00`;
};

export const formatHour12 = (hour: string) => {
  const hourNumber = Number(hour.split(":")[0]);
  const period = hourNumber < 12 ? "AM" : "PM";
  const formattedHour = hourNumber % 12 === 0 ? 12 : hourNumber % 12;

  return `${String(formattedHour).padStart(2, "0")}:00 ${period}`;
};
