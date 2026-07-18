import { dateConvert } from "@/lib/utils";
import React from "react";

interface InvoiceItemProps {
  data: any;
}

const InvoiceItem = ({ data }: InvoiceItemProps) => {
  const fromDate = dateConvert(data.from_date);
  const toDate = dateConvert(data.to_date);

  return (
    <div className="flex items-center justify-around bg-white bg-opacity-60 py-4 rounded-md mb-3">
      <div className="w-[20%] text-center">
        <p>{data.id}</p>
      </div>
      <div className="w-[20%] text-center">
        <p>
          {typeof data.client === "object"
            ? data.client?.name ?? data.client?.id
            : data.client}
        </p>
      </div>
      <div className="w-[20%] text-center">
        <p>{fromDate}</p>
      </div>
      <div className="w-[20%] text-center">
        <p>{toDate}</p>
      </div>
      <div className="w-[20%] text-center">
        <a
          href={data.file_url ?? data.file_path}
          target="_blank"
          download
          className="text-blue-500"
        >
          دانلود
        </a>
      </div>
    </div>
  );
};

export default InvoiceItem;
