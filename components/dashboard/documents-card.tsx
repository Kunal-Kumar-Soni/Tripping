import { FiPlus } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";

import { Button } from "../ui/button";

const DocumentsCard = () => {
  return (
    <section className="space-y-5 font-medium">
      {/* Title  */}
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-3">
          <IoDocumentTextOutline size={18} />
          <span>Your Documents</span>
        </div>
      </div>
    </section>
  );
};

export default DocumentsCard;
