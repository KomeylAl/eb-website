"use client";

import { useAdmins } from "@/hooks/useAdmins";
import Table from "@/components/common/Table";
import { adminColumns } from "@/lib/columns";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/ui/button";
import { useDeleteAppointment } from "@/hooks/useAppointments";
import { useState } from "react";
import { PuffLoader } from "react-spinners";

export const AdminsList = () => {
  const { data, isLoading, error, refetch } = useAdmins();
  const [adminId, setAdminId] = useState(0);

  const { isOpen, openModal, closeModal } = useModal();

  const { mutate: deleteAppointment, isPending } = useDeleteAppointment(
    adminId,
    () => {
      closeModal();
      refetch();
    }
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
          data={data}
          columns={adminColumns}
          currentPage={0}
          pageSize={data.lenght}
          showActions
          totalItems={data.lenght}
          onDelete={(item: any) => {
            setAdminId(item.id);
            openModal();
          }}
        />
      )}

      <Modal
        showCloseButton={false}
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] bg-white"
      >
        <div className="w-full h-40 flex flex-col items-start justify-between p-10">
          <p className="text-lg">آیا از حذف این مورد اطمینان دارید؟</p>
          <div className="w-full flex items-center justify-end gap-4">
            <Button
              variant="destructive"
              size="lg"
              className={`cursor-pointer ${
                isPending ? "bg-rose-400" : "bg-rose-600"
              }`}
              onClick={() => deleteAppointment()}
            >
              {isPending ? "در حال حذف..." : "حذف"}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="cursor-pointer"
              onClick={closeModal}
            >
              بازگشت
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
