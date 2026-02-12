export const dateFormatter = (date: string) => {
  const currentDate = new Date(date);

  const dayNumber = currentDate.getDate();
  const month = currentDate.toLocaleString("en-GB", { month: "short" });
  const year = currentDate.toLocaleString("en-GB", {
    year: "2-digit",
  });

  const formatted = `${dayNumber} ${month} '${year}`;
  return formatted;
};
