"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Label from "../common/Label";
import { useStoreAssessment } from "@/hooks/useAssessments";
import { EntityType } from "@/lib/types";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { assessmentSchema } from "@/validation";
import toast from "react-hot-toast";

const OnlineAppointment = () => {
  const [, setDoctors] = useState<EntityType[]>([]);
  const { mutate: storeAssessment, isPending } = useStoreAssessment(() => {});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(assessmentSchema),
  });

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const response = await axios.get(`/api/doctors?page=1&per_page=100`);
        const entities = (response.data.data || []).map((item: any) => ({
          label: item.name,
          value: String(item.id),
        }));
        setDoctors(entities);
      } catch (err: any) {
        toast.error(err.message);
      }
    };
    getDoctors();
  }, []);

  const onSubmit = (data: any) => {
    storeAssessment(data);
  };

  return (
    <div className="w-full" id="assessment">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col lg:flex-row items-start justify-center gap-6"
      >
        <div className="w-full md:w-2/3 flex flex-col items-start gap-4">
          <p>
            لطفا نام و نام خانوادگی و شماره تلفن همراه خود را ثبت کرده و منتظر
            تماس همکاران ما بمانید. با تشکر.
          </p>
          <div className="w-full flex flex-col items-start space-y-2">
            <Label>نام و نام خانوادگی</Label>
            <Input
              {...register("client.name")}
              placeholder="مثلا: علی احمدی"
              className="bg-white"
            />
            {errors.client?.name && (
              <p className="text-red-500 text-sm">
                {errors.client.name.message}
              </p>
            )}
          </div>
          <div className="w-full flex flex-col items-start space-y-2">
            <Label>شماره تماس</Label>
            <Input
              {...register("client.phone")}
              placeholder="مثلا: 09123456789"
              className="bg-white"
            />
            {errors.client?.phone && (
              <p className="text-red-500 text-sm">
                {errors.client.phone.message}
              </p>
            )}
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "در حال ثبت" : "ثبت نوبت"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OnlineAppointment;
