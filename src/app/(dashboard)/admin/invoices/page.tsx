"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import Link from "next/link";
import Header from "../../_components/layout/Header";
import InvoiceItem from "../../_components/InvoiceItem";

const Invoices = () => {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchInvoices = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/invoices", {
        headers: { Accept: "application/json" },
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        toast.error(payload?.message || "خطا در دریافت فاکتور ها");
        return;
      }
      const list = Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload)
          ? payload
          : [];
      setInvoices(list);
    } catch (error) {
      console.log(error);
      toast.error("خطا در دریافت فاکتور ها");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col">
        <Header searchFn={() => {}} isShowSearch={false} />
        <div className="flex items-center justify-center w-full h-full">
          <BeatLoader
            className="text-center mt-20 flex items-center justify-center"
            color={"#3fb2f2"}
            size={30}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Header searchFn={() => {}} isShowSearch={false} />
      <div className="w-full p-12 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-2xl">فاکتورها</h2>
          <Link
            href="/admin/invoices/add"
            className="px-6 py-2 bg-blue-600 text-white rounded-md"
          >
            تولید فاکتور
          </Link>
        </div>
        <div className="w-full">
          {invoices.length === 0 ? (
            <p className="text-center text-gray-500">فاکتوری یافت نشد</p>
          ) : (
            invoices.map((item: any) => (
              <InvoiceItem key={item.id} data={item} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Invoices;
