export const tripFormate = (dateStr: string) => {
  const date = new Date(dateStr);
  const day = date.toLocaleDateString("en-US", {
    day: "2-digit",
  });
  const month = date.toLocaleDateString("en-US", {
    month: "short",
  });
  const weekday = date.toLocaleDateString("en-US", {
    weekday: "long",
  });
  return `${day} ${month}, ${weekday}`;
};

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

export const indianFormat = (dateStr: string) => {
  const date = new Date(dateStr);
  const indianDate = date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const finalFormat = indianDate.split("/").join(" | ");
  return finalFormat;
};
