export const formattedSubject = (title) =>
  title.length > 80 ? title.slice(0, 77) + "..." : title;
