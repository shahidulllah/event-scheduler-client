import { useEffect, useState } from "react";
import axios from "axios";
import type { IEvent } from "./types/event.types";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import { CalendarDays } from "lucide-react";
import { toast } from "sonner";

function App() {
  const [events, setEvents] = useState<IEvent[]>([]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get<IEvent[]>(
        `${import.meta.env.VITE_BASE_URL}/events`
      );
      setEvents(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <div className="flex items-center justify-center gap-2 text-3xl font-bold text-indigo-600">
          <CalendarDays className="w-8 h-8 text-indigo-500" />
           <h1>Mini Event Scheduler</h1>
        </div>

        <EventForm onEventCreated={fetchEvents} />
        <EventList events={events} onUpdate={fetchEvents} />
      </div>
    </main>
  );
}

export default App;
