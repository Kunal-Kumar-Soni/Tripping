import { Spinner2 } from "../ui/spinner";

const BlueLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner2 className="h-20 w-20 text-blue-600" />
    </div>
  );
};

export default BlueLoader;
