import { TEvent } from "../types";

export const sortEvents = (events: TEvent[]): TEvent[] => {
  return [...events].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    console.log(dateA,dateB)
    return dateA.getTime() - dateB.getTime();
  });
};