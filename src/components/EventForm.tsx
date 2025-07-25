import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { CalendarPlus, StickyNote, Clock, CalendarDays } from "lucide-react";
import { format } from "date-fns";

interface Props {
  onEventCreated: () => void;
}

export default function EventForm({ onEventCreated }: Props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time) {
      toast.error("🚨 Title, date, and time are required!");
      return;
    }

    const formattedDateTime = format(new Date(`${date}T${time}`), "PPPp");

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/events`, {
        title,
        date,
        time,
        notes,
      });

      toast.success(`🎉 Event for ${formattedDateTime} created!`);

      setTitle("");
      setDate("");
      setTime("");
      setNotes("");
      onEventCreated();
    } catch (error) {
      console.log(error);
      toast.error("❌ Failed to create event.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100 shadow-lg rounded-2xl px-6 py-6 mb-8 border border-indigo-200 space-y-4 transition-all duration-300"
    >
      <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
        <CalendarPlus className="text-indigo-500" /> Add New Event
      </h2>

      <input
        type="text"
        placeholder="Event Title *"
        className="w-full p-3 text-indigo-700 bg-white border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-1/2">
          <CalendarDays className="absolute left-3 top-3 text-indigo-400" />
          <input
            type="date"
            className="w-full p-3 pl-10 border border-indigo-300 bg-white text-indigo-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="relative w-full sm:w-1/2">
          <Clock className="absolute left-3 top-3 text-indigo-400" />
          <input
            type="time"
            className="w-full p-3 pl-10 border border-indigo-300 bg-white text-indigo-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      <div className="relative">
        <StickyNote className="absolute left-3 top-3 text-indigo-400" />
        <textarea
          placeholder="Notes (optional)"
          className="w-full p-3 pl-10 border border-indigo-300 bg-white text-indigo-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none min-h-[100px]"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-pink-700 hover:from-indigo-900 hover:to-pink-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-md"
      >
        Add Event
      </button>
    </form>
  );
}
