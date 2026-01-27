import singInBg from "@/assets/images/auth/signin-bg.jpg";
import Image from "next/image";
const page = () => {
  return (
    <div className="relative w-full aspect-video">
      <Image
        src={singInBg}
        placeholder="blur"
        fill
        alt="Sign in background"
        className="object-cover"
      />
    </div>
  );
};

export default page;
