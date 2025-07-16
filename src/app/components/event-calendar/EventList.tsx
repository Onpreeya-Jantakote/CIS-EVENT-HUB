import EventCard from "./EventCard";

const events = [
  {
    id: 1,
    title: "Event #1",
    description: "Description of Event 1 goes here.",
    date: "30 JUL",
    location: "Room A101",
    imageUrl: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238",
  },
  {
    id: 2,
    title: "Event #2",
    description: "Description of Event 2 goes here.",
    date: "1 AUG",
    location: "Room B202",
    imageUrl: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238",
  },
  {
    id: 3,
    title: "Event #3",
    description: "Description of Event 3 goes here.",
    date: "5 AUG",
    location: "Room C303",
    imageUrl: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238",
  },
];

export default function EventList() {
  return (
    <div className="px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
      {events.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
}
