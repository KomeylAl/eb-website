"use client";

import { useAddAdmin } from "@/hooks/useAdmins";
import { roleOptions } from "@/lib/selectOptions";
import { useState } from "react";
import toast from "react-hot-toast";
import ReactSelect from "react-select";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import fa from "react-date-object/locales/persian_fa";
import { convertBaseDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AddAdminFormProps {
  onCloseModal: () => void;
  onAddedAdmin: () => void;
}

const AddAdminForm = ({ onCloseModal }: AddAdminFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    role: "",
    birth_date: "",
    password: "",
  });

  const { mutate: addAdmin, isPending } = useAddAdmin(() => onCloseModal());

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.role ||
      !formData.birth_date ||
      !formData.password
    ) {
      toast.error("لطفا همه فیلد هارا پر کنید");
    } else {
      addAdmin(formData);
    }
  };

  return (
    <div className="w-full h-full p-8 space-y-7">
      <h2 className="text-xl font-semibold">افزودن مدیر</h2>
      <div className="w-full flex gap-3 mt-9">
        <div className="w-full">
          <label>نام و نام خانوادگی</label>
          <input
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            type="text"
            className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
          />
        </div>
        <div className="w-full">
          <label>نقش</label>
          <ReactSelect
            className="mt-2 focus:ring-black focus:border-black"
            placeholder="انتخاب نقش"
            onChange={(e: any) =>
              setFormData((prev) => ({ ...prev, role: e.value }))
            }
            options={roleOptions}
          />
        </div>
      </div>
      <div className="w-full flex gap-3 mt-9">
        <div className="w-full">
          <label>شماره تلفن</label>
          <input
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            type="number"
            className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
          />
        </div>
        <div className="w-full">
          <label>تاریخ تولد</label>
          <div className="w-full">
            <DatePicker
              calendarPosition="bottom-right"
              inputClass="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
              containerClassName="w-full"
              onChange={(value: any) =>
                setFormData((prev) => ({
                  ...prev,
                  birth_date: convertBaseDate(value),
                }))
              }
              calendar={persian}
              locale={fa}
              format="YYYY-MM-DD"
            />
          </div>
        </div>
        <div className="w-full">
          <label>رمز عبور</label>
          <input
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            type="text"
            className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2 text-left"
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
          {isPending ? "در حال افزودن..." : "افزودن مدیر"}
        </Button>
      </div>
    </div>
  );
};

export default AddAdminForm;
