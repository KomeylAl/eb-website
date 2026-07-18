"use client";

import { Modal } from "@/components/common/Modal";
import Header from "../../_components/layout/Header";
import { useCallback, useState } from "react";
import { debounce } from "lodash";
import { useModal } from "@/hooks/useModal";
import { useClients } from "@/hooks/useClients";
import { PuffLoader } from "react-spinners";
import Table from "@/components/common/Table";
import { clientColumns } from "@/lib/columns";
import AdminEditComp from "../../_components/AdminEditComp";

const Clients = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const [clientId, setClientId] = useState(0);
  const [client, setClient] = useState<any>({});

  const { data, isLoading, error, refetch } = useClients(
    page,
    pageSize,
    search
  );

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
            <h2 className="font-bold text-2xl">مراجعان</h2>
            <div
              onClick={openModal}
              className="px-12 py-2 bg-blue-600 rounded-md text-white text-center cursor-pointer"
            >
              افزودن مراجع
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
                columns={clientColumns}
                currentPage={data.meta.current_page}
                pageSize={data.meta.per_page}
                showActions
                totalItems={data.meta.total}
                onPageChange={(newPage) => {
                  setPage(newPage);
                }}
                onDelete={(item: any) => {
                  console.log(item)
                  setClientId(item.id);
                  openDelete();
                }}
                onEdit={(item: any) => {
                  console.log(item)
                  setClientId(item.id);
                  setClient(item);
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
              <div></div>
            </Modal>

            <Modal
              showCloseButton={false}
              isOpen={editOpen}
              onClose={closeEdit}
              className="max-w-[700px] bg-white max-h-[90%] overflow-y-auto"
            >
              <AdminEditComp 
                data={client}
                token=""
              />
            </Modal>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] bg-white"
        showCloseButton={false}
      >
        <div></div>
      </Modal>
    </div>
  );
};

export default Clients;
