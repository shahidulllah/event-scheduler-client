import axios from "axios";
import type { IEvent } from "../types/event.types";

interface Props {
  event: IEvent;
  onUpdate: () => void;
}

export default function EventCard({ event, onUpdate }: Props) {
  const handleArchive = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}/events/${event.id}`);
      onUpdate();
    } catch {
      alert("Failed to archive event");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/events/${event.id}`);
      onUpdate();
    } catch {
      alert("Failed to delete event");
    }
  };

  return (
    <div className="bg-gray-50 border rounded p-4 shadow-sm space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{event.title}</h3>
        <span
          className={`text-sm px-2 py-1 rounded ${
            event.category === "Work"
              ? "bg-blue-100 text-blue-800"
              : event.category === "Personal"
              ? "bg-green-100 text-green-800"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {event.category}
        </span>
      </div>

      <p className="text-sm text-gray-600">
        {event.date} at {event.time}
      </p>

      {event.notes && <p className="text-sm">{event.notes}</p>}

      <div className="flex gap-2 pt-2">
        <button
          onClick={handleArchive}
          disabled={event.archived}
          className={`px-3 py-1 rounded text-sm ${
            event.archived
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
          }`}
        >
          {event.archived ? "Archived" : "Archive"}
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
