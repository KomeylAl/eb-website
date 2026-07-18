"use client";

import React, { useState } from "react";
import { PuffLoader } from "react-spinners";
import Table from "@/components/common/Table";
import { unreadNotificationColumns } from "@/lib/columns";
import {
  useGetUnreadNotifications,
  useMarkNotif,
} from "@/hooks/useNotifications";

const UnreadNotifications = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [loadingId, setLoadingId] = useState<string | null>(null);

  const { data, isLoading, error, refetch } = useGetUnreadNotifications(
    page,
    pageSize
  );
  const { mutate: markRead, isPending } = useMarkNotif();

  const handleMarkRead = (id: string) => {
    setLoadingId(id);
    markRead(id, {
      onSettled: () => setLoadingId(null),
    });
    refetch();
  };

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
          data={data.data ?? []}
          columns={unreadNotificationColumns(isPending, loadingId, (notifId) =>
            handleMarkRead(notifId)
          )}
          currentPage={data.meta?.current_page ?? data.current_page ?? page}
          pageSize={data.meta?.per_page ?? data.page_size ?? pageSize}
          totalItems={data.meta?.total ?? data.total ?? 0}
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
        />
      )}
    </div>
  );
};

export default UnreadNotifications;
