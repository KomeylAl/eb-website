"use client";

import { useClients } from "@/hooks/useClients";
import React, { useState } from "react";
import ReactSelect from "react-select";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import fa from "react-date-object/locales/persian_fa";
import { Button } from "@/components/ui/button";
import { useAddAppointment } from "@/hooks/useAppointments";
import {
  amountStatusOptions,
  apiOptions,
  statusOptions,
} from "@/lib/selectOptions";
import { useDoctors } from "@/hooks/useDoctors";
import { convertBaseDate } from "@/lib/utils";
import toast from "react-hot-toast";

interface AddAppFormProps {
  onCloseModal: () => void;
  onAddedAppointment: () => void;
}

const AddAppForm = ({ onCloseModal }: AddAppFormProps) => {
  const [formData, setFormData] = useState({
    client_id: "",
    doctor_id: "",
    status: "",
    payment_status: "",
    amount: "",
    date: "",
    time: "",
  });

  const {
    data: clients,
    isLoading: clientsLoading,
    error: clientsError,
  } = useClients(0, 1000);
  
  const {
    data: doctors,
    isLoading: doctorsLoading,
    error: doctorsError,
  } = useDoctors(0, 100);

  const clientsOptions = clients ? apiOptions(clients.data) : [];
  const doctorsOptions = doctors ? apiOptions(doctors.data) : [];

  const { mutate: addApp, isPending } = useAddAppointment(() => onCloseModal());

  const handleSubmit = () => {
    if (
      !formData.amount ||
      !formData.payment_status ||
      !formData.client_id ||
      !formData.date ||
      !formData.doctor_id ||
      !formData.status ||
      !formData.time
    ) {
      toast.error("لطفا همه فیلد هارا پر کنید");
    } else {
      addApp(formData);
    }
  };

  return (
    <div className="w-full h-full p-8 space-y-7">
      <h2 className="text-xl font-semibold">افزودن نوبت</h2>
      <div className="w-full flex gap-3">
        <div className="w-full">
          <label>انتخاب مشاور</label>
          <ReactSelect
            className="mt-3 focus:ring-black focus:border-black"
            placeholder="انتخاب مشاور"
            onChange={(value: any) =>
              setFormData((prev) => ({ ...prev, doctor_id: value.value }))
            }
            options={doctorsOptions}
          />
        </div>
        <div className="w-full">
          <label>انتخاب مراجع</label>
          <ReactSelect
            className="mt-3 focus:ring-black focus:border-black"
            placeholder="انتخاب مراجع"
            onChange={(value: any) =>
              setFormData((prev) => ({ ...prev, client_id: value.value }))
            }
            options={clientsOptions}
          />
        </div>
      </div>
      <div className="w-full flex gap-3">
        <div className="w-full">
          <label>مبلغ این جلسه</label>
          <input
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, amount: e.target.value }))
            }
            type="number"
            className="w-full bg-white py-2 rounded-sm px-2 mt-2 border border-gray-300"
          />
        </div>
        <div className="w-full">
          <label>تاریخ جلسه</label>
          <div className="w-full">
            <DatePicker
              calendarPosition="bottom-right"
              inputClass="w-full bg-white py-2 rounded-sm px-2 mt-2 border border-gray-300"
              containerClassName="w-full"
              onChange={(value: any) =>
                setFormData((prev) => ({
                  ...prev,
                  date: convertBaseDate(value),
                }))
              }
              calendar={persian}
              locale={fa}
              format="YYYY-MM-DD"
              className=""
            />
          </div>
        </div>
        <div className="w-full">
          <label>ساعت جلسه</label>
          <div className="w-full">
            <input
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, time: e.target.value }))
              }
              type="text"
              className="w-full bg-white py-2 rounded-sm px-2 mt-2 border border-gray-300"
            />
          </div>
        </div>
      </div>
      <div className="flex w-full gap-3 mt-9">
        <div className="w-full">
          <label>وضعیت</label>
          <ReactSelect
            className="mt-2 focus:ring-black focus:border-black"
            placeholder="انتخاب وضعیت"
            onChange={(value: any) =>
              setFormData((prev) => ({ ...prev, status: value.value }))
            }
            options={statusOptions}
          />
        </div>
        <div className="w-full">
          <label>وضعیت پرداخت</label>
          <ReactSelect
            className="mt-2 focus:ring-black focus:border-black"
            placeholder="وضعیت پرداخت"
            onChange={(value: any) =>
              setFormData((prev) => ({ ...prev, payment_status: value.value }))
            }
            options={amountStatusOptions}
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-end gap-3">
        <Button
          variant="outline"
          size="lg"
          className="cursor-pointer"
          onClick={onCloseModal}
        >
          بازگشت
        </Button>
        <Button
          variant="default"
          size="lg"
          className={`cursor-pointer ${
            isPending ? "bg-blue-400" : "bg-blue-600"
          }`}
          onClick={handleSubmit}
        >
          {isPending ? "در حال افزودن..." : "افزودن نوبت"}
        </Button>
      </div>
    </div>
  );
};

export default AddAppForm;
