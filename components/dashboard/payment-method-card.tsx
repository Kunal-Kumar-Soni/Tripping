import { FiPlus } from "react-icons/fi";
import { MdOutlinePayment } from "react-icons/md";

import { Button } from "../ui/button";

const PaymentMethodsCard = () => {
  return (
    <section className="space-y-5 font-medium">
      {/* Title  */}
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-3">
          <MdOutlinePayment size={20} />
          <span>Payment Method</span>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethodsCard;
