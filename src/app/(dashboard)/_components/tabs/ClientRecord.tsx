"use client";

import React, { useEffect, useState } from "react";
import FileUploader from "../FileUploader";
import { Input } from "@/components/ui/input";
import { Controller, useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { clientRecordSchema } from "@/validation/clientsValidations";
import { Textarea } from "@/components/ui/textarea";
import * as yup from "yup";
import { CLientRecordType } from "@/types/clientsTypes";
import { Button } from "@/components/ui/button";
import CustomDatePicker from "@/components/ui/custom/DatePicker";
import { convertBaseDate, dateConvert } from "@/lib/utils";
import DateObject from "react-date-object";
import { Combobox } from "@/components/ui/custom/Combobox";
import { EntityType } from "@/lib/types";
import axios from "axios";
import toast from "react-hot-toast";
import Label from "@/components/common/Label";
import { useSaveClientRecord } from "@/hooks/useClients";

type ClientRecordFormValues = yup.InferType<typeof clientRecordSchema>;
type FormValues = yup.InferType<typeof clientRecordSchema>;

const fields: Array<{ name: keyof ClientRecordFormValues; label: string }> = [
  { name: "chief_complaints", label: "Chief Complaints" },
  { name: "present_illness", label: "Present Illness" },
  { name: "past_history", label: "Past History" },
  { name: "family_history", label: "Family History" },
  { name: "personal_history", label: "Personal History" },
  { name: "mse", label: "MSE" },
  { name: "diagnosis", label: "Diagnosis" },
];

const ClientRecord = ({
  record,
  clientId,
}: {
  record: CLientRecordType;
  clientId: string;
}) => {
  const { mutate: saveRecord, isPending } = useSaveClientRecord(() => {});
  const resolver = yupResolver(clientRecordSchema) as Resolver<FormValues, any>;
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver,
  });

  useEffect(() => {
    if (record)
      reset(
        record ?? {
          doctor_id: 0,
          supervisor_id: 0,
          admin_id: 0,
          record_number: "",
          admission_date: "",
          visit_date: "",
          chief_complaints: "",
          companion_address: "",
          companion_name: "",
          companion_phone: "",
          diagnosis: "",
          family_history: "",
          mse: "",
          past_history: "",
          personal_history: "",
          present_illness: "",
          reference_source: "",
          images: [],
        }
      );
  }, [record, reset]);

  const [doctors, setDoctors] = useState<EntityType[]>([]);
  const [supervisors, setSupervisors] = useState<EntityType[]>([]);
  const [admins, setAdmins] = useState<EntityType[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`/api/doctors?page=0&pageSize=100`);
        const entities = response.data.data.map((item: any) => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setDoctors(entities);
        setSupervisors(entities);
      } catch (err: any) {
        toast.error(err.message);
      }
    };

    const fetchAdmins = async () => {
      try {
        const response = await axios.get(`/api/admins`);
        const entities = response.data.data.map((item: any) => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setAdmins(entities);
      } catch (err: any) {
        toast.error(err.message);
      }
    };

    fetchDoctors();
    fetchAdmins();
  }, []);

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    for (const key in data) {
      const value = data[key as keyof CLientRecordType];
      if (key === "images" && Array.isArray(value)) {
        value.forEach((file) => formData.append("images[]", file));
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    }
    

    saveRecord({ formData, clientId });
  };

  if (errors) {
    console.log(errors);
  }
  return (
    <form className="flex gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full rounded-sm space-y-4">
        {/* مشخصات همراه */}
        <div className="bg-white/45 rounded-sm p-4">
          <h3>مشخصات همراه</h3>
          <div className="w-full mt-4 flex items-center justify-between gap-3">
            <div className="w-full">
              <Label>نام و نام خانوادگی</Label>
              <Input
                {...register("companion_name")}
                type="text"
                className="w-full bg-white rounded-sm p-2"
                placeholder="نام و نام خانوادگی*"
              />
            </div>
            <div className="w-full">
              <Label>شماره تلفن</Label>
              <Input
                {...register("companion_phone")}
                type="text"
                className="w-full bg-white rounded-sm p-2"
                placeholder="شماره تلفن*"
              />
            </div>
            <div className="w-full">
              <Label>آدرس</Label>
              <Input
                {...register("companion_address")}
                type="text"
                className="w-full bg-white rounded-sm p-2"
                placeholder="آدرس"
              />
            </div>
          </div>
        </div>

        {/* اطلاعات اصلی پرونده */}
        <div className="bg-white/45 rounded-sm p-4">
          <h3>اطلاعات اصلی پرونده</h3>
          <div className="w-full mt-4 space-y-5">
            <div className="w-full flex items-center gap-3">
              <div className="w-full">
                <Label>شماره پرونده</Label>
                <Input
                  {...register("record_number")}
                  type="text"
                  className="w-full bg-white rounded-sm p-2"
                  placeholder="شماره پرونده*"
                />
              </div>
              <div className="w-full">
                <Label>منبع ارجاع</Label>
                <Input
                  {...register("reference_source")}
                  type="text"
                  className="w-full bg-white rounded-sm p-2"
                  placeholder="منبع ارجاع"
                />
              </div>
            </div>
            <div className="w-full flex items-center gap-3">
              {doctors && (
                <div className="w-full">
                  <Label>مشاور</Label>
                  <Controller
                    name="doctor_id"
                    control={control}
                    render={({ field }) => (
                      <Combobox
                        data={doctors}
                        placeholder="مشاور"
                        searchPlaceholder="جستجو..."
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.doctor_id && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.doctor_id.message}
                    </p>
                  )}
                </div>
              )}
              {doctors && (
                <div className="w-full">
                  <Label>سوپروایزر</Label>
                  <Controller
                    name="supervisor_id"
                    control={control}
                    render={({ field }) => (
                      <Combobox
                        data={supervisors}
                        placeholder="سوپروایزر"
                        searchPlaceholder="جستجو..."
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.supervisor_id && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.supervisor_id.message}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* اطلاعات پذیرش */}
        <div className="bg-white/45 rounded-sm p-4">
          <h3>اطلاعات پذیرش</h3>
          <div className="w-full mt-4 flex items-center justify-between gap-3">
            {admins && (
              <div className="w-full">
                <Label>پذیرش کننده</Label>
                <Controller
                  name="admin_id"
                  control={control}
                  render={({ field }) => (
                    <Combobox
                      data={admins}
                      placeholder="پذیرش کننده"
                      searchPlaceholder="جستجو..."
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.admin_id && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.admin_id.message}
                  </p>
                )}
              </div>
            )}
            <Controller
              name="admission_date"
              control={control}
              render={({ field }) => (
                <CustomDatePicker
                  value={dateConvert(field.value)}
                  onChange={(date) =>
                    field.onChange(convertBaseDate(date ?? new DateObject()))
                  }
                />
              )}
            />
            <Controller
              name="visit_date"
              control={control}
              render={({ field }) => (
                <CustomDatePicker
                  value={dateConvert(field.value)}
                  onChange={(date) =>
                    field.onChange(convertBaseDate(date ?? new DateObject()))
                  }
                />
              )}
            />
          </div>
        </div>

        {/* سایر بخش‌ها */}
        {fields.map(({ name, label }) => (
          <div key={name} className="w-full bg-white/45 p-4 rounded-sm">
            <h3>{label}</h3>
            <Textarea {...register(name)} rows={5} />
            {errors[name]?.message && (
              <p className="text-red-500 text-sm">{errors[name]?.message}</p>
            )}
          </div>
        ))}
      </div>

      {/* سایدبار راست */}
      <div className="w-[30%] space-y-4">
        <div className="w-full bg-white/45 rounded-sm p-4 space-y-3">
          <h3>ویرایش پرونده</h3>
          <Button type="submit" className="w-full cursor-pointer">
            ویرایش
          </Button>
        </div>

        <div className="w-full bg-white/45 rounded-sm p-4">
          <h3>تصاویر پرونده</h3>
          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <FileUploader
                className="flex-col"
                allowMultiple
                onFilesSelected={(files) => field.onChange(files)}
                images={record?.images ?? []}
              />
            )}
          />
          {errors.images && (
            <p className="text-red-500 text-sm mt-1">
              {errors.images?.message}
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default ClientRecord;
