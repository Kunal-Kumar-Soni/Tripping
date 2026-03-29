import Image from "next/image";

const TripFallback = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-2 text-center font-semibold">
        <h1 className="">Welcome to</h1>

        <Image
          src="/home/Tripping.png"
          alt="tripping-logo"
          loading="eager"
          width={1000}
          height={300}
          className="mx-auto h-12 w-auto"
        />

        <h1>Create a trip to start planning</h1>
      </div>
    </div>
  );
};

export default TripFallback;
