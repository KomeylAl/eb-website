import { dateConvert, getFormattedDate } from "@/lib/utils";
import React from "react";
import { BeatLoader } from "react-spinners";

interface AppsListProps {
  data: any;
  isLoading: boolean;
}

const AppsList = ({ data, isLoading }: AppsListProps) => {
  const today = getFormattedDate();

  if (isLoading) {
    return (
      <div>
        <BeatLoader
          className="text-center mt-20 flex items-center justify-center"
          color={"#3fb2f2"}
          size={30}
        />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col h-fit mt-6">
      <div
        className="flex items-center 
           justify-between p-4 border-b border-gray-200"
      >
        <div className="w-[5%] text-right font-bold">#</div>
        <div className="w-[15%] text-right font-bold">مراجع</div>
        <div className="w-[15%] text-right font-bold">مشاور</div>
        <div className="w-[15%] text-right font-bold">تاریخ و ساعت</div>
        <div className="w-[15%] text-right font-bold">وضعیت</div>
        <div className="w-[15%] text-right font-bold">مبلغ</div>
      </div>
      <div>
        {data.map((appointment: any) => (
          <div
            key={appointment.referral_id}
            className={`flex items-center justify-between gap-28 md:gap-0 p-4 bg-white rounded-md mt-3 hover:bg-gray-100
              ${appointment.date == today ? "border border-cyan-400" : ""}
              `}
          >
            <div className="w-[5%] text-right">{appointment.referral_id}</div>
            <div className="w-[15%] text-right">{appointment.client}</div>
            <div className="w-[15%] text-right">{appointment.doctor}</div>
            <div className="w-[15%] text-right">
              {appointment.time} - {dateConvert(appointment.date)}
            </div>
            <div
              className={`w-[15%] text-right ${
                appointment.status === "pending"
                  ? "text-rose-500"
                  : "text-green-500"
              }`}
            >
              {appointment.status === "pending" ? "انجام نشده" : "انجام شده"}
            </div>
            <div
              className={`w-[15%] text-lg text-right ${
                appointment.payment_status === "unpaid"
                  ? "text-amber-500"
                  : "text-sky-600"
              }`}
            >
              {appointment.payment}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppsList;
