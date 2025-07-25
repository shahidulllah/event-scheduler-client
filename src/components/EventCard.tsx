import axios from "axios";
import type { IEvent } from "../types/event.types";
import { format, parseISO } from "date-fns";
import { Archive, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  event: IEvent;
  onUpdate: () => void;
}

export default function EventCard({ event, onUpdate }: Props) {
  const handleArchive = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}/events/${event.id}`);
      toast.success("Event archived!");
      onUpdate();
    } catch {
      toast.error("Failed to archive event");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/events/${event.id}`);
      toast.success("Event Deleted!");
      onUpdate();
    } catch {
      toast.error("Failed to delete event");
    }
  };

  const formattedDate = format(parseISO(event.date), "PPP");

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-5 space-y-3 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            event.category === "Work"
              ? "bg-blue-100 text-blue-800"
              : event.category === "Personal"
              ? "bg-green-100 text-green-800"
              : "bg-purple-100 text-purple-800"
          }`}
        >
          {event.category}
        </span>
      </div>

      <p className="text-sm text-gray-500">
        📅 {formattedDate} — 🕒 {event.time}
      </p>

      {event.notes && <p className="text-sm text-gray-700">{event.notes}</p>}

      <div className="flex gap-3 pt-3">
        <button
          onClick={handleArchive}
          disabled={event.archived}
          className={`flex items-center gap-1 px-4 py-2 rounded text-sm font-medium transition ${
            event.archived
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-yellow-800 text-white hover:bg-yellow-700"
          }`}
        >
          <Archive className="w-4 h-4" />
          {event.archived ? "Archived" : "Archive"}
        </button>

        <button
          onClick={handleDelete}
          className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded transition"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
}
