"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

export const PaymentsList = () => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = getCookie("token")?.toString();

  const getPayments = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/payments?per_page=100`, {
        headers: {
          Accept: "application/json",
        },
      });
      if (response.status === 200) {
        const list = Array.isArray(response.data?.data)
          ? response.data.data
          : Array.isArray(response.data)
            ? response.data
            : [];
        setPayments(list);
      }
    } catch (error) {
      console.log(error, "PAYMENTS_GET_ERROR");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPayments();
  }, []);

  function dateConvert(app_date: string) {
    const date = new Date(app_date);
    const jalali_date = date.toLocaleDateString("fa-IR");
    return jalali_date;
  }

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
    <div className="w-full flex flex-col mt-6">
      <div
        className="flex items-center 
           justify-between p-4 border-b 
           border-gray-200"
      >
        <div className="w-1/6 text-right font-bold">#</div>
        <div className="w-1/6 text-right font-bold">مراجع</div>
        <div className="w-1/6 text-right font-bold">مشاور</div>
        <div className="w-1/6 text-right font-bold">تاریخ مراجعه</div>
        <div className="w-1/6 text-right font-bold">مبلغ</div>
        <div className="w-1/6 text-right font-bold">وضعیت</div>
      </div>
      <div className="">
        {payments.map((payment: any) => (
          <div
            className="flex items-center justify-between bg-white rounded-md p-4 shadow-md mt-3"
            key={payment.id}
          >
            <div className="w-1/6 text-right">{payment.id}</div>
            <div className="w-1/6 text-right">{payment.client}</div>
            <div className="w-1/6 text-right">{payment.doctor}</div>
            <div className="w-1/6 text-right">
              {dateConvert(payment.referral_date)}
            </div>
            <div
              className={`w-1/6 text-lg text-right ${
                payment.status === "unpaid" ? "text-amber-500" : "text-sky-600"
              }`}
            >
              {payment.amount}
            </div>
            <div
              className={`w-1/6 text-right ${
                payment.status === "unpaid" ? "text-rose-500" : "text-green-500"
              }`}
            >
              {payment.status === "paid" ? "پرداخت شده" : "پرداخت نشده"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
