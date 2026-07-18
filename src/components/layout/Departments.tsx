import React from "react";
import Image from "next/image";
import Link from "next/link";
import { publicGet } from "@/lib/publicApi";

const Departments = async () => {
  let departments: any[] = [];
  try {
    const payload = await publicGet("/departments");
    departments = payload?.data || [];
  } catch (e: any) {
    console.log(e);
  }

  return (
    <div
      className="w-full px-5 md:px-24 lg:px-48 py-12 space-y-6 text-center"
      id="departments"
    >
      <h2 className="text-3xl font-semibold">دپارتمان های کلینیک ابراز</h2>
      <p className="text-xl">
        دپارتمان های تخصصی مرکز مشاوره و رواندرمانی ابراز
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {departments.length === 0 && <p>در حال بارگزاری اطلاعات...</p>}
        {departments.map((d: any) => (
          <Link key={d.id} href={`/departments/${d.slug}`}>
            <Image
              src={d.thumbnail_url || d.thumbnail}
              width={600}
              height={300}
              alt={d.title}
              className="object-cover w-80 saturate-0 hover:saturate-100 transition-all duration-500"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Departments;
