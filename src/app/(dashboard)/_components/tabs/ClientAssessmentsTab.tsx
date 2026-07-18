import Table from "@/components/common/Table";
import { useAssessments } from "@/hooks/useAssessments";
import { assessmentsColumns } from "@/lib/columns";
import React, { useState } from "react";
import { PuffLoader } from "react-spinners";

interface ClientAssessmentsTabProps {
  clientId: string;
}

const ClientAssessmentsTab = ({ clientId }: ClientAssessmentsTabProps) => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const { data, isLoading, error } = useAssessments(
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
          columns={assessmentsColumns}
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

export default ClientAssessmentsTab;
