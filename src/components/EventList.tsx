import { CalendarX2 } from "lucide-react";
import type { IEvent } from "../types/event.types";
import EventCard from "./EventCard";

interface Props {
  events: IEvent[];
  onUpdate: () => void;
}

export default function EventList({ events, onUpdate }: Props) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold border-b pb-2 text-gray-800">
        Upcoming Events
      </h2>

      {events.length === 0 ? (
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <CalendarX2 className="w-5 h-5" />
          <span>No events scheduled.</span>
        </div>
      ) : (
        events.map((event) => (
          <EventCard key={event.id} event={event} onUpdate={onUpdate} />
        ))
      )}
    </section>
  );
}
