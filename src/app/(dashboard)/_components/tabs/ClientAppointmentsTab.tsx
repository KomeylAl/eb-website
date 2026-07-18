import Table from "@/components/common/Table";
import { useAppointments } from "@/hooks/useAppointments";
import { appointmentColumns } from "@/lib/columns";
import React, { useState } from "react";
import { PuffLoader } from "react-spinners";

interface ClientAppointmentsTabProps {
  clientId: string;
}

const ClientAppointmentsTab = ({ clientId }: ClientAppointmentsTabProps) => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const { data, isLoading, error } = useAppointments(
    page,
    pageSize,
    "",
    "",
    clientId
  );
  return (
    <div className="w-full h-full flex items-center justify-center">
      {isLoading && <PuffLoader size={60} color="#3e86fa" />}

      {error && (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-rose-500">خطا در دریافت اطلاعات</p>
        </div>
      )}

      {data && (
        <Table
          data={data.data}
          columns={appointmentColumns}
          currentPage={data.meta.current_page}
          pageSize={data.meta.per_page}
          totalItems={data.meta.total}
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
        />
      )}
    </div>
  );
};

export default ClientAppointmentsTab;
