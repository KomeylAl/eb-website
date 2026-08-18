import Header from "@/components/layout/Header";
import WorkshopsList from "@/components/layout/WorkshopsList";
import { publicGet } from "@/lib/publicApi";
import React from "react";

const TYPE_META: Record<
  string,
  { title: string; subtitle: string }
> = {
  general: {
    title: "کارگاه‌های عمومی",
    subtitle: "فهرست کارگاه‌های عمومی مرکز ابراز",
  },
  specialized: {
    title: "کارگاه‌های تخصصی",
    subtitle: "فهرست کارگاه‌های تخصصی مرکز ابراز",
  },
  special: {
    title: "کارگاه‌های تخصصی",
    subtitle: "فهرست کارگاه‌های تخصصی مرکز ابراز",
  },
  webinar: {
    title: "وبینارها",
    subtitle: "فهرست وبینارهای مرکز ابراز",
  },
  seminar: {
    title: "سمینارها",
    subtitle: "فهرست سمینارهای مرکز ابراز",
  },
};

interface PageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

const Workshops = async ({ searchParams }: PageProps) => {
  const params = (await searchParams) || {};
  const rawType = params.type;
  const type = Array.isArray(rawType) ? rawType[0] : rawType || "";
  const meta = TYPE_META[type] || {
    title: "کلاس‌ها و کارگاه‌ها",
    subtitle: "مشاهده فهرست کلاس و کارگاه‌های در حال برگزاری و آینده",
  };

  const data = await publicGet("/workshops", {
    page: 1,
    ...(type ? { type } : {}),
  });

  return (
    <div>
      <Header pageTitle={meta.title} />
      <div className="w-full px-5 md:px-24 lg:px-48 py-12 space-y-6 flex flex-col items-center">
        <h2 className="text-3xl font-semibold">{meta.title}</h2>
        <p>{meta.subtitle}</p>
        <WorkshopsList initialData={data} initialSearch="" type={type} />
      </div>
    </div>
  );
};

export default Workshops;
