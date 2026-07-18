"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BeatLoader, PuffLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { MdDelete, MdEditSquare } from "react-icons/md";
import Link from "next/link";
import { IoDocument } from "react-icons/io5";
import { useClients, useDeleteClient } from "@/hooks/useClients";
import { useModal } from "@/hooks/useModal";
import Table from "@/components/common/Table";
import { clientColumns } from "@/lib/columns";
import { Modal } from "@/components/common/Modal";
import DeleteModal from "@/components/common/DeleteModal";

export const ClientsList = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [clientId, setClientId] = useState("");
  const [client, setClient] = useState<any>({});
  const { data, isLoading, refetch } = useClients(0, 10, "");
  const { mutate: deleteClient, isPending } = useDeleteClient(() => {
    closeDelete();
    refetch();
  });
  const { isOpen, openModal, closeModal } = useModal();
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
            console.log(item);
            setClientId(item.id);
            openDelete();
          }}
          onEdit={(item: any) => {
            console.log(item);
            setClientId(item.id);
            setClient(item);
            openEdit();
          }}
        />
      )}

      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="max-w-[500px] h-20 bg-"></div>
      </Modal>

      <Modal
        showCloseButton={false}
        isOpen={deleteOpen}
        onClose={closeDelete}
        className="max-w-[700px] bg-white"
      >
        <DeleteModal
          deleteFn={() => deleteClient(clientId)}
          isDeleting={isPending}
          onCancel={() => {
            closeDelete();
            refetch();
          }}
        />
      </Modal>
    </div>
  );
};
