import useCountdown from "./CountdownTimer";

export default function CoverSection() {
  const timeLeft = useCountdown("2025-07-30T00:00:00");

  return (
    <div
      className="relative bg-cover bg-center h-[500px] flex items-center justify-center bg-black/40 mt-16"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1596495577886-d920f1fb7238')`,
      }}
    >
      <div className="text-center text-white p-6 rounded-xl w-full max-w-4xl mx-auto font-bold">
        {!timeLeft.ended ? (
          <div className="flex gap-6 justify-center mb-4">
            <CountdownBox value={timeLeft.days} label="DAY" color="#FF0055" />
            <CountdownBox value={timeLeft.hours} label="HOUR" color="#FFF700" />
            <CountdownBox value={timeLeft.minutes} label="MIN" color="#00a2ff" />
            <CountdownBox value={timeLeft.seconds} label="SEC" color="#00FF59" />
          </div>
        ) : (
          <div className="text-2xl font-bold mb-6">Event Already Started!</div>
        )}

        <h1 className="text-4xl font-bold mb-2">CIS SPORT DAY</h1>
        <p className="text-base font-bold mb-6">Project Room 22 February 2025</p>
        <div className="flex gap-4 justify-center">
          <button className="bg-[#FF0055] text-white text-lg px-6 py-2 rounded-3xl hover:opacity-90">
            Enroll
          </button>
          <button className="border border-white text-white text-lg px-6 py-2 rounded-3xl hover:bg-white hover:text-[#FF0055]">
            See More
          </button>
        </div>
      </div>
    </div>
  );
}

function CountdownBox({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold" style={{ color }}>
        {value}
      </div>
      <div className="text-sm" style={{ color }}>
        {label}
      </div>
    </div>
  );
}
