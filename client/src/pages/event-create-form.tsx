import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createEvent } from "../services";
import type { TEvent, TGlobalResponse } from "../types";
import { X } from "lucide-react";

interface EventFormProps {
  onEventCreated: () => void;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isFormOpen: boolean;
}

type FormValues = {
  title: string;
  date: string;
  time: string;
  notes?: string;
};

const EventCreateForm: React.FC<EventFormProps> = ({
  onEventCreated,
  isFormOpen,
  setIsFormOpen,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  const [serverError, setServerError] = useState<any | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    console.log(data);
    try {
      const createdEvent: TGlobalResponse<TEvent> = await createEvent({
        ...data,
        notes: data.notes?.trim() || undefined,
        archived: false,
      });
      console.log(createdEvent.data.category);
      setSuccessMessage(
        `Event created successfully and categorized as "${createdEvent.data.category}"`
      );
      reset();
      onEventCreated();
    } catch (error: any) {
      setServerError(error?.response?.data.errors);
    }
  };

  console.log(serverError);
  return (
    <div
      className={`${
        isFormOpen ? "fixed" : "hidden"
      } inset-0 bg-[#000000] opacity-90 flex flex-col justify-center items-center  z-50`}
    >
      {/*modal closing button*/}
      <div className="text-white absolute right-0 top-0 p-2">
        <button className="w-8 h-8 rounded-full border hover:cursor-pointer hover:bg-gray-400">
          <X
            onClick={() => {
              setIsFormOpen(!isFormOpen);
            }}
          />
        </button>
      </div>

      {/*errors*/}
      {serverError && (
        <div className="bg-white w-fit border-r-4 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6 z-50">
          <p className="font-medium text-red-800 mb-1">
            Please fix the following errors:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {serverError.map((error: string) => (
              <li>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* success message */}
      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-md mb-6 animate-pulse">
          <p className="font-medium">{successMessage}</p>
        </div>
      )}

      {/* form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white space-y-6 border border-gray-400 rounded-lg p-4"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
            className="w-full pl-3 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Add a title for your event"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date <span className="text-red-500">*</span>
            </label>
            <input
              id="date"
              type="date"
              {...register("date")}
              className="w-full pl-3 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Time <span className="text-red-500">*</span>
            </label>
            <input
              id="time"
              type="time"
              {...register("time")}
              className="w-full pl-3 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Notes (optional)
          </label>
          <textarea
            id="notes"
            {...register("notes")}
            rows={4}
            className="w-full pl-3 px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Add any additional details"
          />
          <p className="mt-1 text-xs text-gray-500">
            Keywords in title and notes will be used to auto-categorize your
            event.
          </p>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#4F46E5] hover:bg-[#6366F1] hover:scale-104 hover:cursor-pointer text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Adding Event...
              </>
            ) : (
              <>
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
                Add Event
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventCreateForm;
