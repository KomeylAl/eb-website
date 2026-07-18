import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDoctors(
  page: number = 0,
  pageSize: number = 10,
  search: string = ""
) {
  return useQuery({
    queryKey: ["doctors", page, pageSize, search],
    queryFn: async () => {
      const res = await fetch(
        `/api/doctors?page=${page}&pageSize=${pageSize}&search=${search}`
      );
      if (res.status !== 200) {
        toast.error("خطا در دریافت اطلاعات");
      }
      return res.json();
    },
    // placeholderData: (prev) => prev,
  });
}

export function useGetDoctor(doctorId: string) {
  return useQuery({
    queryKey: ["doctor", doctorId],
    queryFn: async () => {
      const res = await fetch(`/api/doctors/${doctorId}`);
      if (res.status !== 200) {
        throw new Error("خطا در دریافت اطلاعات");
      }
      return res.json();
    },
  });
}

export function useGetDoctorResume(doctorId: string) {
  return useQuery({
    queryKey: ["doctorResume", doctorId],
    queryFn: async () => {
      const res = await fetch(`/api/doctors/${doctorId}/resume`);
      if (res.status !== 200) {
        throw new Error("خطا در دریافت اطلاعات");
      }
      const json = await res.json();
      // envelope: { message, data } — data may be null
      return json?.data !== undefined ? json.data : json;
    },
  });
}

export function useSaveDoctorResume(onDuccess: () => void) {
  return useMutation({
    mutationFn: async ({
      formData,
      doctorId,
    }: {
      formData: any;
      doctorId: string;
    }) => {
      const newData = new FormData();
      newData.append("title", formData.title ?? "");
      newData.append("bio", formData.bio ?? "");
      newData.append("specialization", formData.specialization ?? "");
      if (formData.content !== undefined) {
        newData.append("content", formData.content ?? "");
      }
      newData.append(
        "educations",
        JSON.stringify(formData.educations ?? [])
      );
      newData.append(
        "experiences",
        JSON.stringify(formData.experiences ?? [])
      );
      newData.append("skills", JSON.stringify(formData.skills ?? []));
      newData.append(
        "certifications",
        JSON.stringify(formData.certifications ?? [])
      );

      // social_links must be an array per API docs
      const socialLinks = Array.isArray(formData.social_links)
        ? formData.social_links
        : formData.social_links
          ? Object.entries(formData.social_links)
              .filter(([, v]) => v)
              .map(([platform, url]) => ({ platform, url }))
          : [];
      newData.append("social_links", JSON.stringify(socialLinks));

      if (formData.file && formData.file.length > 0) {
        newData.append("file", formData.file[0]);
      }

      const res = await fetch(`/api/doctors/${doctorId}/resume`, {
        method: "POST",
        body: newData,
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.message || "خطا در ذخیره رزومه");
      }

      return json;
    },
    onError(error) {
      console.log(error);
      toast.error("خطا در ذخیره رزومه");
    },
    onSuccess: () => {
      toast.success("رزومه با موفقیت ذخیره شد");
      onDuccess();
    },
  });
}

export function useDoctorSevenDays(
  doctorId: string,
  page: number = 0,
  pageSize: number = 10,
  search: string = ""
) {
  return useQuery({
    queryKey: ["doctorSevenDays", page, pageSize, search],
    queryFn: async () => {
      const res = await fetch(
        `/api/doctors/${doctorId}/sevenDays?page=${page}&size=${pageSize}&search=${search}`
      );
      if (res.status !== 200) {
        toast.error("خطا در دریافت اطلاعات");
      }
      return res.json();
    },
    placeholderData: (prev) => prev,
  });
}

export function useDoctorThirtyDays(
  doctorId: string,
  page: number = 0,
  pageSize: number = 10,
  search: string = ""
) {
  return useQuery({
    queryKey: ["doctorThirtyDays", page, pageSize, search],
    queryFn: async () => {
      const res = await fetch(
        `/api/doctors/${doctorId}/thirtyDays?page=${page}&size=${pageSize}&search=${search}`
      );
      if (res.status !== 200) {
        toast.error("خطا در دریافت اطلاعات");
      }
      return res.json();
    },
    placeholderData: (prev) => prev,
  });
}

/** Removed from backend — kept as stubs so imports do not break. */
export function useSendTodaySms(_doctorId: string) {
  return useQuery({
    queryKey: ["todaySms"],
    queryFn: async () => {
      toast.error("ارسال پیامک نوبت‌های امروز از بک‌اند حذف شده است.");
      throw new Error("Endpoint removed");
    },
    enabled: false,
    retry: false,
  });
}

export function useSendTomorrowSms(_doctorId: string) {
  return useQuery({
    queryKey: ["tomorrowSms"],
    queryFn: async () => {
      toast.error("ارسال پیامک نوبت‌های فردا از بک‌اند حذف شده است.");
      throw new Error("Endpoint removed");
    },
    enabled: false,
    retry: false,
  });
}

export function useAddDoctor(onDuccess: () => void) {
  return useMutation({
    mutationFn: async (formData: any) => {
      const newData = new FormData();
      newData.append("name", formData.name);
      newData.append("phone", formData.phone);
      newData.append("national_code", formData.national_code);
      if (formData.medical_number)
        newData.append("medical_number", formData.medical_number);
      if (formData.card_number)
        newData.append("card_number", formData.card_number);
      if (formData.birth_date)
        newData.append("birth_date", formData.birth_date);
      if (formData.email) newData.append("email", formData.email);
      if (formData.password) newData.append("password", formData.password);
      if (formData.sort_order !== undefined && formData.sort_order !== "") {
        newData.append("sort_order", String(formData.sort_order));
      }

      const days = Array.isArray(formData.days)
        ? formData.days
        : formData.days
          ? String(formData.days).split(",").map((d: string) => d.trim())
          : [];
      days.forEach((day: string) => newData.append("days[]", day));

      const times = Array.isArray(formData.times)
        ? formData.times
        : formData.times
          ? String(formData.times).split(",").map((t: string) => t.trim())
          : [];
      times.forEach((time: string) => newData.append("times[]", time));

      if (formData.department_ids) {
        formData.department_ids.forEach((id: string | number) => {
          newData.append("department_ids[]", String(id));
        });
      }

      if (formData.avatar && formData.avatar.length > 0) {
        newData.append("avatar", formData.avatar[0]);
      }

      const res = await fetch(`/api/doctors/`, {
        method: "POST",
        body: newData,
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.message || "خطا در افزودن مشاور");
      }

      return json;
    },
    onError(error) {
      console.log(error);
      toast.error("خطا در افزودن مشاور");
    },
    onSuccess: () => {
      toast.success("مشاور با موفقیت افزوده شد");
      onDuccess();
    },
  });
}

export function useEditDoctor(doctorId: string | number, onSuccess: () => void) {
  return useMutation({
    mutationFn: async (formData: any) => {
      const newData = new FormData();
      newData.append("name", formData.name);
      newData.append("phone", formData.phone);
      newData.append("national_code", formData.national_code);
      if (formData.medical_number)
        newData.append("medical_number", formData.medical_number);
      if (formData.card_number)
        newData.append("card_number", formData.card_number);
      if (formData.birth_date)
        newData.append("birth_date", formData.birth_date);
      if (formData.email) newData.append("email", formData.email);
      if (formData.sort_order !== undefined && formData.sort_order !== "") {
        newData.append("sort_order", String(formData.sort_order));
      }

      const days = Array.isArray(formData.days)
        ? formData.days
        : formData.days
          ? String(formData.days).split(",").map((d: string) => d.trim())
          : [];
      days.forEach((day: string) => newData.append("days[]", day));

      const times = Array.isArray(formData.times)
        ? formData.times
        : formData.times
          ? String(formData.times).split(",").map((t: string) => t.trim())
          : [];
      times.forEach((time: string) => newData.append("times[]", time));

      (formData.department_ids ?? []).forEach((id: string | number) => {
        newData.append("department_ids[]", String(id));
      });

      if (formData.avatar && formData.avatar.length > 0) {
        newData.append("avatar", formData.avatar[0]);
      }

      const res = await fetch(`/api/doctors/${doctorId}`, {
        method: "POST",
        body: newData,
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.message || "خطا در ویرایش مشاور");
      }

      return json;
    },
    onError() {
      toast.error("خطا در ویرایش مشاور");
    },
    onSuccess: () => {
      toast.success("مشاور با موفقیت ویرایش شد");
      onSuccess();
    },
  });
}

export function useDeleteDoctor(onDeletedTenant: () => void) {
  return useMutation({
    mutationFn: async (doctorId: string | number) => {
      const res = await fetch(`/api/doctors/${doctorId}`, {
        method: "DELETE",
      });
      if (!res.ok && res.status !== 204) {
        throw new Error("مشکلی در حذف مشاور پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("مشاور با موفقیت حذف شد");
      onDeletedTenant();
    },
  });
}

export function useSaveDoctorsPassword(onSuccess: () => void) {
  return useMutation({
    mutationFn: async ({
      doctorId,
      password,
    }: {
      doctorId: string;
      password: string;
    }) => {
      const res = await fetch(`/api/doctors/${doctorId}/password`, {
        method: "POST",
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(`${error?.message ?? "خطا در ذخیره رمز عبور!"}`);
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("رمز عبور با موفقیت ذخیره شد");
      onSuccess();
    },
  });
}
