import Header from "@/components/layout/Header";
import { publicGet } from "@/lib/publicApi";
import Image from "next/image";
import React from "react";

interface DepPageProps {
  params: {
    slug: string;
  };
}

const Department = async ({ params }: DepPageProps) => {
  const { slug } = await params;
  const payload = await publicGet(`/departments/${slug}`);
  const department = payload?.data;

  return (
    <div>
      <Header
        pageTitle={department.title}
        bread="دپارتمان ها"
        breadLink="/departments"
      />
      <div className="w-full px-5 md:px-24 lg:px-48 py-12 space-y-6 flex flex-col items-center">
        <div className="w-full h-64">
          <Image
            src={department.thumbnail_url || department.thumbnail}
            alt={department.title}
            width={1200}
            height={400}
            unoptimized
            className="object-cover w-full h-64 rounded-lg"
          />
        </div>
        <div className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <h1 className="font-bold text-3xl">{department.title}</h1>
        </div>
        <div className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg space-y-4">
          <div
            className="text-justify leading-8"
            dangerouslySetInnerHTML={{ __html: department.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default Department;
