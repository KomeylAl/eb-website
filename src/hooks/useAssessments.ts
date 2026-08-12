import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useStoreAssessment(onSuccess: () => void) {
  return useMutation({
    mutationFn: async (formData: any) => {
      const res = await fetch("/api/assessments", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.message || "خطا در افزودن نویت");
      }

      return json;
    },
    onSuccess: () => {
      toast.success("نوبت با موفقیت ثبت شد");
      onSuccess();
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
}
