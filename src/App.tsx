import { useEffect, useState } from "react";
import axios from "axios";
import type { IEvent } from "./types/event.types";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";

function App() {
  const [events, setEvents] = useState<IEvent[]>([]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get<IEvent[]>(
        "import.meta.env.VITE_BASE_URL/events"
      );
      setEvents(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Mini Event Scheduler
      </h1>
      <EventForm onEventCreated={fetchEvents} />
      <EventList events={events} onUpdate={fetchEvents} />
    </main>
  );
}

export default App;
