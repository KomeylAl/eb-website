"use client";

import React, { useEffect, useState, useRef } from "react";
import PsyItem from "@/components/layout/PsyItem";
import { PuffLoader } from "react-spinners";
import { publicGet } from "@/lib/publicApi";

function doctorAvatar(item: any): string {
  return (
    item?.doctor_profile?.avatar_url ||
    item?.avatar_url ||
    item?.avatar ||
    ""
  );
}

function doctorDays(item: any): string {
  const days = item?.doctor_profile?.days ?? item?.days;
  if (Array.isArray(days)) return days.join("، ");
  return days || "";
}

export default function PsyList({
  initialData,
}: {
  initialData: any;
  initialSearch: string;
}) {
  const [doctors, setDoctors] = useState(initialData.data || []);
  const [page, setPage] = useState(initialData.meta?.current_page ?? 1);
  const [lastPage, setLastPage] = useState(initialData.meta?.last_page ?? 1);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setDoctors(initialData.data);
    setPage(initialData.meta?.current_page ?? 1);
    setLastPage(initialData.meta?.last_page ?? 1);
    setLoading(false);
  }, [initialData]);

  const loadMore = async () => {
    if (loading || page >= lastPage) return;

    setLoading(true);
    try {
      const nextPage = page + 1;
      const data = await publicGet("/doctors", {
        page: nextPage,
        sort_direction: "asc",
      });
      setDoctors((prev: any[]) => [...prev, ...(data.data || [])]);
      setPage(data.meta.current_page);
      setLastPage(data.meta.last_page);
    } catch (err) {
      console.error("Error loading more", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loaderRef, page, lastPage, loading]);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="w-full flex flex-wrap items-center justify-center gap-6">
        {Array.isArray(doctors) && doctors.length === 0 && (
          <p className="text-gray-500">هیچ مشاوری پیدا نشد.</p>
        )}

        {doctors.map((item: any, index: number) => (
          <PsyItem
            key={index}
            id={item.id}
            name={item.name}
            image={doctorAvatar(item)}
            resume={item.resume}
            departments={item.departments || []}
            days={doctorDays(item)}
          />
        ))}
      </div>

      <div ref={loaderRef} className="h-10 w-full"></div>

      {loading && (
        <div className="flex flex-col items-center justify-center gap-3">
          <PuffLoader color="#3b82f6" size={45} />
          <p>در حال بارگزاری موارد بیشتر...</p>
        </div>
      )}
    </div>
  );
}
