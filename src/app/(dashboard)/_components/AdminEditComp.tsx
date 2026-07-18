"use client";

import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import fa from "react-date-object/locales/persian_fa";
import axios from "axios";
import ReactSelect from "react-select";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Header from "./layout/Header";
import { dateConvert } from "@/lib/utils";

interface AdminEditCompProps {
  data: any;
  token: string | undefined;
}

const AdminEditComp = ({ data, token }: AdminEditCompProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    role: "",
    birth_date: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const rolesOptions = [
    { value: "receptionist", label: "پذیرش" },
    { value: "manager", label: "مدیریت" },
    { value: "author", label: "نویسنده وب سایت" },
    { value: "accountant", label: "حسابداری" },
  ];

  const handleRolesChange = (selectedOption: any) => {};

  useEffect(() => {
    setFormData({
      name: data.name,
      phone: data.phone,
      role: data.role,
      birth_date: data.birth_date,
      password: "",
    });
  }, []);

  const handleBirthDateChange = (value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      birth_date: value
        .toDate()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ")
        .slice(0, 10),
    }));
  };

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    await axios
      .put(
        `/api/admins/${data.id}`,
        {
          name: formData.name,
          phone: formData.phone,
          birth_date: formData.birth_date,
          admin_role: formData.role,
          ...(formData.password ? { password: formData.password } : {}),
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        if (response.status === 200) {
          toast.success("اطلاعات با موفقیت بروز رسانی شد");
          router.refresh();
          router.push("/admin/admins");
        } else {
          toast.error("خطا در بروز رسانی اطلاعات");
        }
      })
      .catch(function (error) {
        console.log(error);
        toast("خطا در برقراری ارتباط با سرور");
      })
      .finally(() => setIsLoading(false));
  };

  if (!data) {
    return <div>در حال دریافت اطلاعات</div>;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Header isShowSearch={false} searchFn={() => {}} />
      <div className="w-full h-full flex flex-col p-8 mt-6 rounded-sm">
        <div className="w-full flex gap-3 mt-9 ">
          <div className="w-full">
            <label>نام و نام خانوادگی</label>
            <input
              value={formData.name}
              onChange={(e) => {
                setFormData((prev: any) => ({ ...prev, name: e.target.value }));
              }}
              type="text"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
          <div className="w-full">
            <label>سِمت</label>
            <ReactSelect
              className="mt-2 bg-amber-400"
              placeholder="انتخاب سمت"
              onChange={handleRolesChange}
              options={rolesOptions}
            />
          </div>
        </div>
        <div className="w-full flex gap-3 mt-9">
          <div className="w-full">
            <label>شماره تلفن</label>
            <input
              placeholder={data.phone}
              onChange={(e) => {
                setFormData((prev: any) => ({
                  ...prev,
                  phone: e.target.value,
                }));
              }}
              type="number"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
          <div className="w-full">
            <label>تاریخ تولد</label>
            <div className="w-full">
              <DatePicker
                value={dateConvert(data.birth_date)}
                calendarPosition="bottom-right"
                inputClass="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
                containerClassName="w-full"
                onChange={handleBirthDateChange}
                calendar={persian}
                locale={fa}
                format="YYYY-MM-DD"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <div
            onClick={handleSubmit}
            className={`
           mt-9 w-52 cursor-pointer text-center rounded-md py-2 text-white
           ${isLoading ? "bg-blue-400" : "bg-blue-700"}`}
          >
            ویرایش اطلاعات
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditComp;
