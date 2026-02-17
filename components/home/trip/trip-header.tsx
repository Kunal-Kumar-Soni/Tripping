import { ImMagicWand } from "react-icons/im";
import { AvatarGroupCountExample } from "../../ui/avatar-group-count-example";
import { Button } from "../../ui/button";
import { GoGear } from "react-icons/go";
import Link from "next/link";

const TripHeader = () => {
  return (
    <section className="top-0 right-0 left-100 z-40 fixed">
      {/* Header */}
      <header className="flex justify-between items-center bg-black/80 shadow-[0_1px_0_rgba(0,0,0,0.6),0_6px_12px_rgba(0,0,0,0.3)] px-6 py-4 text-white">
        {/* Left */}
        <div className="w-[40%]">
          <h1 className="font-semibold text-2xl tracking-tight">Paris</h1>
        </div>

        {/* Right */}
        <div className="flex justify-between items-center gap-10 w-[60%]">
          <div className="leading-tight">
            <p className="text-white/60 text-sm">Duration</p>
            <p className="font-semibold">7 Days</p>
          </div>

          <div className="leading-tight">
            <p className="text-white/60 text-sm">Cost Estimate</p>
            <p className="font-semibold">$4000</p>
          </div>

          <AvatarGroupCountExample person={"4"} />

          <div className="flex gap-2">
            <Button
              size={"icon-lg"}
              className="flex justify-center items-center bg-indigo-500 hover:bg-indigo-600 rounded-full transition"
            >
              <ImMagicWand />
            </Button>
            <Button
              asChild
              size={"icon-lg"}
              className="flex justify-center items-center border rounded-full transition"
            >
              <Link href={"/settings"}>
                <GoGear />
              </Link>
            </Button>
          </div>
        </div>
      </header>
    </section>
  );
};

export default TripHeader;
