import Image from "next/image";

export default function WhatsNewsSection() {
  return (
    <div className="my-10 px-6">
      <h2 className="text-3xl font-bold">
        <span className="text-[#00A1FF]">WHAT'S </span>
        <span className="text-[#FF0055]">NEWS</span>
      </h2>
      <div className="mt-6 flex justify-center">
        <Image
          src="https://images.unsplash.com/photo-1596495577886-d920f1fb7238"
          alt="Activity"
          width={600}
          height={300}
          className="rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
}
