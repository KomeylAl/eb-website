"use client";

import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { Button } from "../ui/button";
import CategoryItem from "./CategoryItem";
import { publicGet } from "@/lib/publicApi";

export default function CategoryList({
  initialData,
}: {
  initialData: any;
  initialSearch: string;
}) {
  const [categories, setCategories] = useState(initialData.data || []);
  const [page, setPage] = useState(initialData.meta?.current_page ?? 1);
  const [lastPage, setLastPage] = useState(initialData.meta?.last_page ?? 1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCategories(initialData.data);
    setPage(initialData.meta?.current_page ?? 1);
    setLastPage(initialData.meta?.last_page ?? 1);
    setLoading(false);
  }, [initialData]);

  const loadMore = async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const data = await publicGet("/categories", { page: nextPage });
      setCategories((prev: any[]) => [...prev, ...(data.data || [])]);
      setPage(data.meta.current_page);
      setLastPage(data.meta.last_page);
    } catch (err) {
      console.error("Error loading more", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="w-full flex flex-wrap items-center justify-start gap-16">
        {Array.isArray(categories) && categories.length === 0 && (
          <p className="text-gray-500">هیچ دسته بندی ای پیدا نشد.</p>
        )}

        {categories.map((item: any) => (
          <CategoryItem
            key={item.id}
            image={item.image_url || item.image}
            title={item.name}
            description={item.excerpt}
            slug={item.slug}
          />
        ))}
      </div>

      {page < lastPage && (
        <Button onClick={loadMore} disabled={loading}>
          {loading ? "در حال بارگذاری..." : "بارگذاری موارد بیشتر"}
        </Button>
      )}

      {loading && <PuffLoader color="#3b82f6" size={45} />}
    </div>
  );
}
