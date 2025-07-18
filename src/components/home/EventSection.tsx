import EventCard from "./EventCard";

export default function EventSection() {
  const events = [
    {
      title: "Generative AI Workshop Project",
      date: "30 JUNE",
      room: "6214",
      imageUrl:
        "https://www.classcentral.com/report/wp-content/uploads/2022/05/Adobe-Photoshop-BCG-Banner-1.png",
    },
    {
      title: "Generative AI Workshop Project",
      date: "1 AUG",
      room: "6215",
      imageUrl:
        "https://images.unsplash.com/photo-1596495577886-d920f1fb7238",
    },
    {
      title: "Cyber Security Workshop Project",
      date: "5 AUG",
      room: "6209",
      imageUrl:
        "https://www.classcentral.com/report/wp-content/uploads/2022/05/Adobe-Photoshop-BCG-Banner-1.png",
    },
  ];

  return (
    <div className="px-6 mb-12">
      <h2 className="text-3xl font-bold text-[#FF0055] mb-6">EVENT</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </div>
  );
}
