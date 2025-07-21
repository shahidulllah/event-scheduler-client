import { CalendarX2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { IEvent } from "../types/event.types";
import EventCard from "./EventCard";

interface Props {
  events: IEvent[];
  onUpdate: (filterCategory?: string) => void;
}

const categories = ["All", "Work", "Personal", "Other"];

export default function EventList({ events, onUpdate }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const categoryFilter =
      selectedCategory !== "All" ? selectedCategory : undefined;
    onUpdate(categoryFilter);
  }, [selectedCategory, onUpdate]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-gray-800">Upcoming Events</h2>

        <div className="flex items-center gap-2">
          <label
            htmlFor="category"
            className="text-sm font-medium text-gray-600"
          >
            Filter by Category:
          </label>
          <select
            id="category"
            className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none focus:ring focus:ring-blue-400"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <CalendarX2 className="w-5 h-5" />
          <span>No events scheduled.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onUpdate={() => onUpdate(selectedCategory)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
