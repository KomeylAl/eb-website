"use client";

import DeleteModal from "@/components/common/DeleteModal";
import { Modal } from "@/components/common/Modal";
import Table from "@/components/common/Table";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { useDeleteWorkshop, useWorksops } from "@/hooks/useWorkshops";
import { workshopColumns } from "@/lib/columns";
import { useState } from "react";
import { PuffLoader } from "react-spinners";
import EditWorkshopForm from "../forms/EditWorkshopForm";

const WorkShopsList = () => {
  const [page, setPage] = useState(1); // API page از 0 شروع میشه
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const [item, setItem] = useState();
  const [id, setId] = useState("");

  const { data, isLoading, error, refetch } = useWorksops(
    page,
    pageSize,
    search
  );
  const { mutate: deleteWorkshop, isPending } = useDeleteWorkshop(id, () => {
    closeDelete();
    refetch();
  });
  const {
    isOpen: deleteOpen,
    openModal: openDelete,
    closeModal: closeDelete,
  } = useModal();
  const {
    isOpen: editOpen,
    openModal: openEdit,
    closeModal: closeEdit,
  } = useModal();

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
          columns={workshopColumns}
          currentPage={data.meta.current_page}
          pageSize={data.meta.per_page}
          showActions
          totalItems={data.meta.total}
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
          onDelete={(item: any) => {
            setId(item.id);
            openDelete();
          }}
          onEdit={(item: any) => {
            setItem(item);
            openEdit();
          }}
        />
      )}

      <Modal
        showCloseButton={false}
        isOpen={deleteOpen}
        onClose={closeDelete}
        className="max-w-[700px] bg-white"
      >
        <DeleteModal
          deleteFn={() => {}}
          isDeleting={false}
          onCancel={() => {
            closeDelete();
          }}
          description="با حذف کارگاه تمامی اطلاعات، جلسات و مشترکین حذف خواهند شد."
        />
      </Modal>

      <Modal
        showCloseButton={false}
        isOpen={editOpen}
        onClose={closeEdit}
        className="max-w-[700px] bg-white max-h-[80%] overflow-y-auto"
      >
        <EditWorkshopForm 
          onCloseModal={() => closeEdit()}
          workshop={item}
        />
      </Modal>
    </div>
  );
};

export default WorkShopsList;
