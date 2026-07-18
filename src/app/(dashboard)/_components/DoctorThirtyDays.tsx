"use client";

import Table from "@/components/common/Table";
import { useDoctorThirtyDays } from "@/hooks/useDoctors";
import { appointmentColumns } from "@/lib/columns";
import React from "react";
import { PuffLoader } from "react-spinners";

interface DoctorThirtyDaysProps {
  doctorId: string;
}

const DoctorThirtyDays = ({ doctorId }: DoctorThirtyDaysProps) => {
  const { data, isLoading, error } = useDoctorThirtyDays(doctorId);
  const items = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data)
      ? data
      : [];

  return (
    <div className="w-full h-full flex items-center justify-center">
      {isLoading && <PuffLoader size={60} color="#3e86fa" />}

      {error && (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-rose-500">خطا در دریافت اطلاعات</p>
        </div>
      )}

      {!isLoading && !error && (
        <Table
          data={items}
          columns={appointmentColumns}
          currentPage={1}
          pageSize={items.length || 10}
          totalItems={items.length}
        />
      )}
    </div>
  );
};

export default DoctorThirtyDays;
