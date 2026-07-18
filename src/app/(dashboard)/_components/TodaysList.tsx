"use client";

import React from "react";
import { PuffLoader } from "react-spinners";
import { useAppointments, useAppointmentsByDate } from "@/hooks/useAppointments";
import Table from "@/components/common/Table";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/common/Modal";
import { appointmentColumns } from "@/lib/columns";

const ToDaysList = () => {
  const date = new Date().toJSON().slice(0, 10);
  const { data, isLoading } = useAppointments(0, 10, "", date);
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="w-full h-full flex items-center justify-center">
      {isLoading && <PuffLoader size={60} color="#3e86fa" />}

      {data && (
        <Table
          data={data.data}
          columns={appointmentColumns}
          currentPage={data.meta.current_page}
            pageSize={data.meta.per_page}
            showActions
            totalItems={data.meta.total}
          onDelete={openModal}
        />
      )}

      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="max-w-[500px] h-20 bg-"></div>
      </Modal>
    </div>
  );
};

export default ToDaysList;
