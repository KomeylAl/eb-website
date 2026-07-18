import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useAdmins(
  page: number = 1,
  pageSize: number = 10,
  search: string = ""
) {
  return useQuery({
    queryKey: ["admins", page, pageSize, search],
    queryFn: async () => {
      const res = await fetch(
        `/api/admins?page=${page}&pageSize=${pageSize}&search=${search}`
      );
      if (res.status !== 200) {
        toast.error("خطا در دریافت اطلاعات");
      }
      return res.json();
    },
  });
}

export function useAddAdmin(onAddedAdmin: () => void) {
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(`/api/admins/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          birth_date: data.birth_date,
          password: data.password,
          admin_role: data.admin_role ?? data.role,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "مشکلی در افزودن مدیر پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("مدیر با موفقت افزودن شد");
      onAddedAdmin();
    },
  });
}

export function useUpdateAdmin(adminId: string, onSuccess: () => void) {
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(`/api/admins/${adminId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          birth_date: data.birth_date,
          admin_role: data.admin_role ?? data.role,
          ...(data.password ? { password: data.password } : {}),
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "مشکلی در ویرایش مدیر پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("مدیر با موفقت ویرایش شد");
      onSuccess();
    },
  });
}

export function useDeleteAdmin(onDeletedTenant: () => void) {
  return useMutation({
    mutationFn: async (adminId: string) => {
      const res = await fetch(`/api/admins/${adminId}`, {
        method: "DELETE",
      });
      if (!res.ok && res.status !== 204) {
        throw new Error("مشکلی در حذف مدیر پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("مدیر با موفقیت حذف شد");
      onDeletedTenant();
    },
  });
}
