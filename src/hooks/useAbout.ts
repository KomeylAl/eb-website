import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useAbout() {
  return useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const res = await fetch(`/api/about`);
      if (res.status !== 200) {
        toast.error("خطا در دریافت اطلاعات");
        return null;
      }
      const json = await res.json();
      // envelope { message, data }
      return json?.data ?? json;
    },
  });
}

export function useUpdateAbout() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (formData: any) => {
      const newData = new FormData();
      newData.append("title", formData.title);
      newData.append("about", formData.about);
      newData.append("address", formData.address);
      newData.append("phones", formData.phones);
      newData.append(
        "mobile_phones",
        formData.mobile_phones ?? formData.mobile_numbers ?? ""
      );
      newData.append(
        "latitude",
        formData.latitude ?? formData.lat ?? ""
      );
      newData.append(
        "longitude",
        formData.longitude ?? formData.long ?? ""
      );
      const logo = formData.logo ?? formData.image;
      if (logo) {
        newData.append("logo", logo);
      }

      const response = await fetch("/api/about", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: newData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }

      return response.json();
    },

    onSuccess: () => {
      toast.success("اطلاعات با موفقیت بروزرسانی شد");
      router.push("/dashboard");
    },

    onError: (error: any) => {
      console.error(error);
      if (error?.errors) {
        Object.values(error.errors).forEach((errMsgs: any) => {
          (errMsgs as string[]).forEach((msg: string) => toast.error(msg));
        });
      } else {
        toast.error(error?.message || "خطا در بروزرسانی اطلاعات");
      }
    },
  });
}
