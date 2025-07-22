import React, { useState } from "react";
import type { TEvent } from "../types";
import { deleteEvent, toggleArchiveStatus } from "../services";

interface EventCardProps {
  event: TEvent;
  onEventUpdated: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onEventUpdated }) => {
  const { id, title, date, time, notes, category, archived } = event;

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time to be more readable
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Work":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "Personal":
        return "bg-green-100 text-green-800 border border-green-200";
      case "Social":
        return "bg-purple-100 text-purple-800 border border-purple-200";
      case "Family":
        return "bg-pink-100 text-pink-800 border border-pink-200";
      case "Education":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "Health":
        return "bg-red-100 text-red-800 border border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const [actionError, setActionError] = useState<string | null>(null);

  const handleToggleArchive = async () => {
    try {
      setActionError(null);
      await toggleArchiveStatus(id);
      onEventUpdated();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to toggle archive status";
      setActionError(message);
      console.error("Failed to toggle archive status:", error);
    }
  };

  const handleDelete = async () => {
    try {
      setActionError(null);
      await deleteEvent(id);
      onEventUpdated();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete event";
      setActionError(message);
      console.error("Failed to delete event:", error);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-6 mb-5 transition-all ${
        archived
          ? "opacity-40"
          : ""
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-4">
          <h3 className="text-xl font-bold mb-2 text-gray-800 capitalize">{title}</h3>
          <div className="mb-4 space-y-2">
            <div className="flex items-center text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{formatDate(date)}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{formatTime(time)}</span>
            </div>
          </div>

          {notes && (
            <div className="mb-4 bg-gray-50 p-3 rounded-md border border-gray-100">
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2 text-gray-500 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
                <p className="text-gray-700 whitespace-pre-line text-sm">
                  {notes}
                </p>
              </div>
            </div>
          )}
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
            category as string
          )} shadow-sm`}
        >
          {category}
        </span>
      </div>

      {actionError && (
        <div className="mb-3 p-3 bg-red-50 border-l-4 border-red-500 rounded-md">
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-sm text-red-700">{actionError}</p>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-4 pt-3 border-t border-gray-200">
        <div className="flex gap-2 items-center">
          <span>Archive</span>
          <button
            className={`w-8 rounded-full flex items-center text-sm font-medium transition-colors border border-gray-400 hover:cursor-pointer ${
              archived ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full ${
                archived ? "bg-blue-400" : "bg-gray-600"
              }`}
              onClick={handleToggleArchive}
            ></div>
          </button>
        </div>

        <button
          onClick={handleDelete}
          className="flex items-center text-red-600 hover:text-red-800 hover:cursor-pointer text-sm font-medium transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;
