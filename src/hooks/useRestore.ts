import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

async function postRestore(path: string, data: any) {
  const body =
    Array.isArray(data)
      ? { data }
      : data?.data
        ? data
        : { data: data ?? [] };

  const res = await fetch(path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "خطا در بازگردانی");
  }
  return res.json().catch(() => ({}));
}

export function useRestoreDoctors() {
  return useMutation({
    mutationKey: ["restoreDoctors"],
    mutationFn: async (data: any) => postRestore("/api/restore/doctors", data),
    onError: (error) => toast.error(`${error.message}`),
    onSuccess: () => toast.success("بازگردانی انجام شد."),
  });
}

export function useRestoreClients() {
  return useMutation({
    mutationKey: ["restoreClients"],
    mutationFn: async (data: any) => postRestore("/api/restore/clients", data),
    onError: (error) => toast.error(`${error.message}`),
    onSuccess: () => toast.success("بازگردانی انجام شد."),
  });
}

export function useRestoreAdmins() {
  return useMutation({
    mutationKey: ["restoreAdmins"],
    mutationFn: async (data: any) => postRestore("/api/restore/admins", data),
    onError: (error) => toast.error(`${error.message}`),
    onSuccess: () => toast.success("بازگردانی انجام شد."),
  });
}

export function useRestoreDoctorResumes() {
  return useMutation({
    mutationKey: ["restoreDoctorResumes"],
    mutationFn: async () => {
      throw new Error(
        "پشتیبان‌گیری/بازگردانی رزومه پزشکان از بک‌اند حذف شده است."
      );
    },
    onError: (error) => toast.error(`${error.message}`),
  });
}

export function useRestorePosts() {
  return useMutation({
    mutationKey: ["restorePosts"],
    mutationFn: async (data: any) => postRestore("/api/restore/posts", data),
    onError: (error) => toast.error(`${error.message}`),
    onSuccess: () => toast.success("بازگردانی انجام شد."),
  });
}

export function useRestoreCategories() {
  return useMutation({
    mutationKey: ["restoreCategories"],
    mutationFn: async (data: any) =>
      postRestore("/api/restore/categories", data),
    onError: (error) => toast.error(`${error.message}`),
    onSuccess: () => toast.success("بازگردانی انجام شد."),
  });
}

export function useRestoreTags() {
  return useMutation({
    mutationKey: ["restoreTags"],
    mutationFn: async (data: any) => postRestore("/api/restore/tags", data),
    onError: (error) => toast.error(`${error.message}`),
    onSuccess: () => toast.success("بازگردانی انجام شد."),
  });
}

export function useRestoreWorkshops() {
  return useMutation({
    mutationKey: ["restoreWorkshops"],
    mutationFn: async (data: any) =>
      postRestore("/api/restore/workshops", data),
    onError: (error) => toast.error(`${error.message}`),
    onSuccess: () => toast.success("بازگردانی انجام شد."),
  });
}

export function useRestoreAbout() {
  return useMutation({
    mutationKey: ["restoreAbout"],
    mutationFn: async (data: any) => postRestore("/api/restore/about", data),
    onError: (error) => toast.error(`${error.message}`),
    onSuccess: () => toast.success("بازگردانی انجام شد."),
  });
}
