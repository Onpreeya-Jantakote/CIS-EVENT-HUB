import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";

interface EventCardProps {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
}

export default function EventCard({ id, title, description, date, location, imageUrl }: EventCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col justify-between border border-gray-200">
      <div className="relative w-full h-48">
        <Image src={imageUrl} alt={`Event ${id}`} fill className="object-cover" />
      </div>
      <div className="p-4 flex flex-col justify-between">
        <h3 className="text-lg font-semibold mb-4 text-[#2192FF]">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex items-center justify-between text-sm">
          <button className="bg-transparent text-[#FF0055] px-4 py-2 rounded-3xl border border-[#FF0055] hover:bg-[#FF0055] hover:text-white transition">
            Enroll
          </button>
          <div className="flex gap-4 text-[#6E6E6E] items-center">
            <div className="flex items-center gap-1">
              <FaCalendarAlt className="text-[#FF0055]" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-[#FF0055]" />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}