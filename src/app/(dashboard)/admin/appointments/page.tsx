"use client";

import React, { useCallback, useState } from "react";
import Header from "../../_components/layout/Header";
import IconButton from "@/components/ui/custom/IconButton";
import { BiPlus } from "react-icons/bi";
import persian from "react-date-object/calendars/persian";
import DatePicker, { DateObject } from "react-multi-date-picker";
import fa from "react-date-object/locales/persian_fa";
import { useAppointments, useDeleteAppointment } from "@/hooks/useAppointments";
import { useModal } from "@/hooks/useModal";
import { debounce } from "lodash";
import { PuffLoader } from "react-spinners";
import Table from "@/components/common/Table";
import { appointmentColumns } from "@/lib/columns";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/ui/button";
import AddAppForm from "../../_components/AddAppForm";

const Appinments = () => {
  const [value, setValue] = useState<DateObject>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const [appId, setAppId] = useState(0);

  const baseDate = value
    ? value.toDate().toISOString().slice(0, 19).replace("T", " ").slice(0, 10)
    : "";

  const {
    data: baseData,
    isLoading: baseLoading,
    error: baseError,
    refetch,
  } = useAppointments(page, pageSize, search, baseDate);

  const { mutate: deleteAppointment, isPending } = useDeleteAppointment(
    appId,
    () => {
      closeModal();
      refetch();
    }
  );

  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: addModalOpen,
    openModal: openAddModal,
    closeModal: closeAddModal,
  } = useModal();

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
      <Header searchFn={onSearchChange} isShowSearch/>
      <div className="w-full flex flex-col p-12">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:items-center lg:justify-between">
          <h2 className="font-bold text-2xl">نوبت ها</h2>

          <div className="flex md:flex-row flex-col items-start gap-3">
            <IconButton
              icon={<BiPlus className="text-white" size={20} />}
              size="sm"
              className="cursor-pointer"
              onClick={openAddModal}
            />
            <DatePicker
              inputClass="py-2 bg-blue-600 rounded-md text-white text-center placeholder-white"
              placeholder="انتخاب تاریخ"
              calendar={persian}
              locale={fa}
              value={value}
              format="YYYY-MM-DD"
              onChange={(date: any) => {
                setValue(date);
                refetch();
              }}
            />
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center mt-8">
          {baseLoading && <PuffLoader size={60} color="#3e86fa" />}

          {baseError && (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-rose-500">خطا در دریافت اطلاعات</p>
            </div>
          )}

          {baseData && (
            <Table
              data={baseData.data}
              columns={appointmentColumns}
              currentPage={baseData.meta.current_page}
              pageSize={baseData.meta.per_page}
              showActions
              totalItems={baseData.meta.total}
              onPageChange={(newPage) => {
                setPage(newPage);
              }}
              onDelete={(item: any) => {
                setAppId(item.referral_id);
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
          <Modal
            isOpen={addModalOpen}
            onClose={closeAddModal}
            showCloseButton={false}
            className="max-w-[700px] bg-white"
          >
            <AddAppForm
              onCloseModal={closeAddModal}
              onAddedAppointment={() => {
                closeAddModal();
                refetch();
              }}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Appinments;
