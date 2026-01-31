export const daysGenerator = (startDate: string, duration: number) => {
  const result: string[] = [];

  const start = new Date(startDate);

  for (let i = 0; i < duration; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + i);

    const date = currentDate;
    const dayNumber = date.getDate();
    const month = date.toLocaleString("en-GB", { month: "short" });
    const weekday = date.toLocaleString("en-GB", { weekday: "long" });

    const formatted = `${dayNumber} ${month}, ${weekday}`;

    result.push(formatted);
  }
  return result;
};
