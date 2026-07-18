import Header from "@/components/layout/Header";
import { publicGet } from "@/lib/publicApi";
import Image from "next/image";
import React from "react";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;
  const payload = await publicGet(`/categories/${slug}`);
  const category = payload?.data;

  return (
    <div>
      <Header
        pageTitle={category.name}
        bread="دسته بندی ها"
        breadLink="/posts"
      />
      <div className="w-full px-5 md:px-24 lg:px-48 py-12 space-y-6 flex flex-col items-center">
        <div className="w-full h-64">
          <Image
            src={category.image_url || category.image}
            alt={category.name}
            width={1200}
            height={400}
            unoptimized
            className="object-cover w-full h-64 rounded-lg"
          />
        </div>
        <div className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <h1 className="font-bold text-3xl">{category.name}</h1>
        </div>
        <div className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg space-y-4">
          <div
            className="text-justify leading-8"
            dangerouslySetInnerHTML={{ __html: category.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
