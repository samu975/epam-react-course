export const getDurationInHours = (duration: number): string => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}:${minutes.toString().padStart(2, "0")} hours`;
};
