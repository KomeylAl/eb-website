"use client";

import React, { useState } from "react";
import { PuffLoader } from "react-spinners";
import Table from "@/components/common/Table";
import {
  AllNotificationsColumns,
  unreadNotificationColumns,
} from "@/lib/columns";
import { useGetNotifications, useMarkNotif } from "@/hooks/useNotifications";

const AllNotifications = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, error, refetch } = useGetNotifications(
    page,
    pageSize
  );
  console.log(data)
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
          columns={AllNotificationsColumns}
          currentPage={data.current_page}
          pageSize={data.page_size}
          totalItems={data.total}
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
        />
      )}
    </div>
  );
};

export default AllNotifications;
