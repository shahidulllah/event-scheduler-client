import type { IEvent } from '../types/event.types';
import EventCard from './EventCard';

interface Props {
  events: IEvent[];
  onUpdate: () => void;
}

export default function EventList({ events, onUpdate }: Props) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold border-b pb-2">Upcoming Events</h2>
      {events.length === 0 ? (
        <p className="text-gray-500">No events scheduled.</p>
      ) : (
        events.map((event) => (
          <EventCard key={event.id} event={event} onUpdate={onUpdate} />
        ))
      )}
    </section>
  );
}
