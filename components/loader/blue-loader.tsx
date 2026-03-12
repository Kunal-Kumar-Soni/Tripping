import { Spinner2 } from "../ui/spinner";

const BlueLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner2 className="w-20 h-20 text-blue-600" />
    </div>
  );
};

export default BlueLoader;
