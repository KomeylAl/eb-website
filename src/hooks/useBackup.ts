import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function downloadBackup(data: any, filename: string) {
  const url = data?.url ?? data?.data?.url;
  if (!url) {
    toast.error("آدرس فایل پشتیبان دریافت نشد");
    return;
  }
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  toast.success("پشتیبان گیری انجام شد.");
}

async function fetchBackup(path: string) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error("خطا در تهیه کپی پشتیبان");
  return res.json();
}

export function useBackupDoctors() {
  return useMutation({
    mutationKey: ["backupDoctors"],
    mutationFn: () => fetchBackup("/api/backup/doctors"),
    onError: (error) => toast.error(`${error.message}`),
    onSuccess: (data) => downloadBackup(data, "doctors_backup.json"),
  });
}

export function useBackupClients() {
  return useMutation({
    mutationKey: ["backupClients"],
    mutationFn: () => fetchBackup("/api/backup/clients"),
    onError: (error) => toast.error(`${error.message}`),
    onSuccess: (data) => downloadBackup(data, "clients_backup.json"),
  });
}

export function useBackupAdmins() {
  return useMutation({
    mutationKey: ["backupAdmins"],
    mutationFn: () => fetchBackup("/api/backup/admins"),
    onError: (error) => toast.error(`${error.message}`),
    onSuccess: (data) => downloadBackup(data, "admins_backup.json"),
  });
}

export function useBackupDoctorResumes() {
  return useMutation({
    mutationKey: ["backupDoctorResumes"],
    mutationFn: async () => {
      throw new Error("پشتیبان‌گیری رزومه پزشکان از بک‌اند حذف شده است.");
    },
    onError: (error) => toast.error(`${error.message}`),
  });
}

export function useBackupPosts() {
  return useMutation({
    mutationKey: ["backupPosts"],
    mutationFn: () => fetchBackup("/api/backup/posts"),
    onError: (error) => toast.error(`${error.message}`),
    onSuccess: (data) => downloadBackup(data, "posts_backup.json"),
  });
}

export function useBackupCategoties() {
  return useMutation({
    mutationKey: ["backupCategories"],
    mutationFn: () => fetchBackup("/api/backup/categories"),
    onError: (error) => toast.error(`${error.message}`),
    onSuccess: (data) => downloadBackup(data, "categories_backup.json"),
  });
}

export function useBackupTags() {
  return useMutation({
    mutationKey: ["backupTags"],
    mutationFn: () => fetchBackup("/api/backup/tags"),
    onError: (error) => toast.error(`${error.message}`),
    onSuccess: (data) => downloadBackup(data, "tags_backup.json"),
  });
}

export function useBackupWorkshops() {
  return useMutation({
    mutationKey: ["backupWorkshops"],
    mutationFn: () => fetchBackup("/api/backup/workshops"),
    onError: (error) => toast.error(`${error.message}`),
    onSuccess: (data) => downloadBackup(data, "workshops_backup.json"),
  });
}

export function useBackupAbout() {
  return useMutation({
    mutationKey: ["backupAbout"],
    mutationFn: () => fetchBackup("/api/backup/about"),
    onError: (error) => toast.error(`${error.message}`),
    onSuccess: (data) => downloadBackup(data, "about_backup.json"),
  });
}
