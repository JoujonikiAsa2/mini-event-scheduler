import axios from "axios";
import type { TEvent, TGlobalResponse } from "../types";

const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

console.log(API_URL);

export const fetchEvents = async (
  categoryFilter?: string
): Promise<TGlobalResponse<TEvent[]>> => {
  console.log(categoryFilter);
  const response = await axios.get<TGlobalResponse<TEvent[]>>(`${API_URL}/events`);
  return response.data;
};

export const createEvent = async (
  eventData: Omit<TEvent, "id" | "category">
): Promise<TGlobalResponse<TEvent>> => {
  const response = await axios.post<TGlobalResponse<TEvent>>(
    `${API_URL}/events`,
    eventData
  );
  return response.data; // includes success, message, data
};

export const toggleArchiveStatus = async (id: string): Promise<TEvent> => {
  const response = await axios.put<TEvent>(`${API_URL}/events/${id}`);
  return response.data;
};

export const deleteEvent = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/events/${id}`);
};
