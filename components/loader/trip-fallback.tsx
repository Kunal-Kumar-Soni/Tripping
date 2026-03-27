import Image from "next/image";

const TripFallback = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="space-y-2 font-semibold text-center">
        <h1 className="">Welcome to</h1>

        <Image
          src="/home/Tripping.png"
          alt="tripping-logo"
          loading="eager"
          width={1000}
          height={300}
          className="mx-auto w-auto h-12"
        />

        <h1>Create a trip to start planning</h1>
      </div>
    </div>
  );
};

export default TripFallback;
