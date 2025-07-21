import { useState } from "react";
import axios from "axios";

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
      alert("Title, date and time are required");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/events`, {
        title,
        date,
        time,
        notes,
      });
      setTitle("");
      setDate("");
      setTime("");
      setNotes("");
      onEventCreated();
    } catch (error) {
      console.log(error);
      alert("Failed to create event");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-4 py-4 mb-6 space-y-4 border"
    >
      <h2 className="text-lg font-semibold">Add New Event</h2>

      <input
        type="text"
        placeholder="Title *"
        className="w-full p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="flex gap-4">
        <input
          type="date"
          className="w-1/2 p-2 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          className="w-1/2 p-2 border rounded"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <textarea
        placeholder="Notes (optional)"
        className="w-full p-2 border rounded"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Event
      </button>
    </form>
  );
}
