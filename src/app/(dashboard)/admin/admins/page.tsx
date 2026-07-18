"use client";

import { AdminsList } from "@/app/(dashboard)/_components/AdminsList";
import Header from "@/app/(dashboard)/_components/layout/Header";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import WithRole from "@/app/(dashboard)/_components/WithRole";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/common/Modal";
import AddAdminForm from "../../_components/AddAdminForm";
import AdminEditComp from "../../_components/AdminEditComp";
import Table from "@/components/common/Table";
import { adminColumns } from "@/lib/columns";
import { PuffLoader } from "react-spinners";
import { debounce } from "lodash";
import { useAdmins, useDeleteAdmin } from "@/hooks/useAdmins";
import DeleteModal from "@/components/common/DeleteModal";
import UpdateAdminFrom from "../../_components/UpdateAdminFrom";

const Admins = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const [adminId, setDoctorId] = useState("");
  const [doctor, setDoctor] = useState<any>({});

  const { data, isLoading, error, refetch } = useAdmins(page, pageSize, search);
  const { mutate: deleteAdmin, isPending } = useDeleteAdmin(() => {
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
  const { isOpen, openModal, closeModal } = useModal();

  const debouncedSearch = useCallback(
    debounce((text) => {
      refetch();
    }, 300),
    [refetch]
  );

  const onSearchChange = (e: any) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };
  return (
    <div className="w-full h-full flex flex-col">
      <Header searchFn={onSearchChange} isShowSearch />
      <div className="w-full flex flex-col p-12">
        <div className="w-full h-full space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl">مدیران</h2>
            <div
              onClick={openModal}
              className="px-12 py-2 bg-blue-600 rounded-md text-white text-center cursor-pointer"
            >
              افزودن مدیر
            </div>
          </div>
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
                columns={adminColumns}
                currentPage={data.meta.current_page}
                pageSize={data.meta.per_page}
                showActions
                totalItems={data.meta.total}
                onPageChange={(newPage) => {
                  setPage(newPage);
                }}
                onDelete={(item: any) => {
                  console.log(item);
                  setDoctorId(item.id);
                  openDelete();
                }}
                onEdit={(item: any) => {
                  console.log(item);
                  setDoctorId(item.id);
                  setDoctor(item);
                  openEdit();
                }}
              />
            )}
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] bg-white"
        showCloseButton={false}
      >
        <AddAdminForm
          onAddedAdmin={() => {
            closeModal();
            refetch();
          }}
          onCloseModal={() => {}}
        />
      </Modal>
      <Modal
        showCloseButton={false}
        isOpen={deleteOpen}
        onClose={closeDelete}
        className="max-w-[700px] bg-white"
      >
        <DeleteModal
          deleteFn={() => deleteAdmin(adminId)}
          isDeleting={isPending}
          onCancel={() => closeDelete()}
        />
      </Modal>

      <Modal
        showCloseButton={false}
        isOpen={editOpen}
        onClose={closeEdit}
        className="max-w-[700px] bg-white max-h-[90%] overflow-y-auto"
      >
        <UpdateAdminFrom
          admin={doctor}
          onCloseModal={() => {
            closeEdit();
            refetch();
          }}
        />
      </Modal>
    </div>
  );
};

export default Admins;
