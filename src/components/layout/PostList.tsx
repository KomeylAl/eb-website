"use client";

import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import BlogPostItem from "./BlogPostItem";
import { Button } from "../ui/button";
import { publicGet } from "@/lib/publicApi";

export default function PostsList({
  initialData,
  initialSearch,
}: {
  initialData: any;
  initialSearch: string;
}) {
  const [posts, setPosts] = useState(initialData.data || []);
  const [page, setPage] = useState(initialData.meta?.current_page ?? 1);
  const [lastPage, setLastPage] = useState(initialData.meta?.last_page ?? 1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPosts(initialData.data);
    setPage(initialData.meta?.current_page ?? 1);
    setLastPage(initialData.meta?.last_page ?? 1);
    setLoading(false);
  }, [initialData]);

  const loadMore = async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const data = await publicGet("/posts", {
        page: nextPage,
        search: initialSearch || undefined,
        status: "published",
      });
      setPosts((prev: any[]) => [...prev, ...(data.data || [])]);
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
        {Array.isArray(posts) && posts.length === 0 && (
          <p className="text-gray-500">هیچ مطلبی پیدا نشد.</p>
        )}

        {posts.map((item: any) => (
          <BlogPostItem
            key={item.id}
            image={item.thumbnail_url || item.thumbnail}
            title={item.title}
            description={item.excerpt}
            date={item.published_at}
            slug={item.slug}
            category={item.category}
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
