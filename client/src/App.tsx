import React, { useEffect, useState } from "react";
import EventCreateForm from "./pages/event-create-form";
import EventCard from "./pages/event-card";
import { fetchEvents } from "./services";
import type { TEvent, TGlobalResponse } from "./types";
import logo from "./assets/event-logo.png";

type CategoryFilter = "All" | "Work" | "Personal" | "Other";
const categories = ["All", "Work", "Personal", "Other"]

const App: React.FC = () => {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data: TGlobalResponse<TEvent[]> = await fetchEvents();
      setEvents(data.data);
    } catch (err) {
      setError("Failed to load events. Please try again later.");
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [isFormOpen]);

  const totalEvent =
    categoryFilter === "All"
      ? events.length
      : events.filter((event) => event.category === categoryFilter).length

  return (
    <div className="flex flex-col min-h-screen relative bg-gradient-to-b from-indigo-50 to-white">
      <nav className="bg-white shadow-sm border-b border-indigo-100 sticky top-0 z-10">
        <div className="max-w-[80rem] mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src={logo} className="size-8" />
              <h1 className="logo ml-3 text-xl md:text-2xl font-bold text-gray-900">
                Calendex
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full">
        <div className="max-w-[80rem] mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
          <EventCreateForm
            onEventCreated={loadEvents}
            isFormOpen={isFormOpen}
            setIsFormOpen={setIsFormOpen}
          />

          <div className="mt-6 w-full ">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="mb-4 md:mb-0">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                  <h3 className=" text-2xl font-bold text-gray-900 inline-block border-b-2 border-indigo-500 pb-1">
                    Your Events ({totalEvent})
                  </h3>
                  <button
                    className="bg-[#4F46E5] hover:bg-[#6366F1] hover:scale-104 hover:cursor-pointer text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out transform shadow-sm flex items-center justify-center"
                    onClick={() => {
                      setIsFormOpen(!isFormOpen);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span className="mt-1">Add Event</span>
                  </button>
                </div>
              </div>

              <div className="w-full md:w-auto">
                <div className="flex items-center justify-center md:justify-end">
                  <span className="mr-3 text-sm font-medium text-gray-700">
                    Filter by:
                  </span>
                  <div className="sm:hidden">
                    <select
                      value={categoryFilter}
                      onChange={(e) =>
                        setCategoryFilter(e.target.value as CategoryFilter)
                      }
                      className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-0 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {categories.map(
                        (category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <div className="hidden sm:inline-flex rounded-md shadow-sm">
                    {(
                      categories as CategoryFilter[]
                    ).map((category) => {
                      const isActive = categoryFilter === category;
                      const getColorClass = () => {
                        if (!isActive)
                          return "bg-white text-gray-700 hover:bg-gray-50 border-gray-300";
                        switch (category) {
                          case "Work":
                            return "bg-[#F59E0B] text-white border-[#F59E0B]";
                          case "Personal":
                            return "bg-green-600 text-white border-green-600";
                          case "Other":
                            return "bg-gray-600 text-white border-gray-600";
                          default:
                            return "bg-indigo-600 text-white border-indigo-600";
                        }
                      };

                      return (
                        <button
                          key={category}
                          type="button"
                          onClick={() => setCategoryFilter(category)}
                          className={`px-4 py-2 text-sm font-medium transition-all hover:cursor-pointer duration-200 ${getColorClass()} ${
                            category === "All" ? "rounded-l-md" : ""
                          } ${
                            category === "Other" ? "rounded-r-md" : ""
                          } border`}
                        >
                          {category}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="h-[70vh] flex flex-col items-center justify-center text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#4F46E5]"></div>
                <p className="mt-3 text-[#F59E0B] font-medium">
                  Loading your events...
                </p>
              </div>
            ) : error ? (
              <div className="h-[70vh] flex items-center justify-center bg-red-50 rounded-lg shadow-sm p-6 mb-4 border border-red-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-red-500 mr-4"
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
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-1">
                    Unable to load events
                  </h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            ) : events.length === 0 ? (
              <div className="h-[70vh] flex flex-col items-center justify-center bg-white p-10 text-center rounded-lg border border-gray-100 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-[#4F46E5]"
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
                <h3 className="text-lg font-medium text-[#F59E0B] mt-4">
                  No events yet
                </h3>
                <p className="text-gray-500 mt-2">
                  Add your first event using the form above
                </p>
              </div>
            ) : (
              <>
                {/* Filter and show events */}
                {(() => {
                  const filteredEvents =
                    categoryFilter === "All"
                      ? events
                      : events.filter(
                          (event) => event.category === categoryFilter
                        );

                  return filteredEvents.length === 0 ? (
                    <div className="bg-white p-8 text-center rounded-lg shadow-sm border border-gray-100">
                      <div className="inline-block p-4 rounded-full bg-gray-50 mb-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-[#F59E0B]"
                          fill="white"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            color="#4F46E5"
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-[#F59E0B]">
                        No{" "}
                        {categoryFilter !== "All" ? categoryFilter + " " : ""}
                        events found
                      </h3>
                      <p className="text-gray-500 mt-2">
                        Try a different filter or add a new event
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6">
                      {filteredEvents.map((event) => (
                        <EventCard
                          key={event.id}
                          event={event}
                          onEventUpdated={loadEvents}
                        />
                      ))}
                    </div>
                  );
                })()}
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-[80rem] md:flex md:items-center md:justify-between mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <img src={logo} className="size-8" />
            <div className="ml-2">
              <p className=" text-sm font-semibold text-gray-700 logo">
                Calendex
              </p>
              <p className="text-sm text-gray-500">
                Made with React, TypeScript, and TailwindCSS
              </p>
            </div>
          </div>

          <div className="mt-6 md:mt-0">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Event Manager. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
