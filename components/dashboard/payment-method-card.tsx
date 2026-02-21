import { Button } from "../ui/button";
import { FiPlus } from "react-icons/fi";
import { MdOutlinePayment } from "react-icons/md";

const PaymentMethodsCard = () => {
  const data = [
    {
      title: "Seoul",
      location: "Seoul, South Korea",
    },
    {
      title: "Seoul",
      location: "Seoul, South Korea",
    },
    {
      title: "Seoul",
      location: "Seoul, South Korea",
    },
  ];
  return (
    <section className="space-y-5 font-medium">
      {/* Title  */}
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center gap-3">
          <MdOutlinePayment size={20} />
          <span>Payment Method</span>
        </div>
      </div>

      <div className="space-y-1">
        {data.map((el, index) => (
          <div
            key={index}
            className="flex justify-between items-center px-3 py-2 border rounded-md"
          >
            <div className="font-semibold text-sm leading-tight">
              <p>{el.title}</p>
              <p className="text-muted-foreground">{el.location}</p>
            </div>

            <Button size="icon-sm" variant="outline" className="rounded-full cursor-pointer">
              <FiPlus />
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PaymentMethodsCard;
