import Header from "@/components/layout/Header";
import CommentSection from "@/components/layout/CommentSection";
import { publicGet } from "@/lib/publicApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { CiFolderOn } from "react-icons/ci";
import { CiShoppingTag } from "react-icons/ci";

interface PostPageProps {
  params: {
    slug: string;
  };
}

const PostPage = async ({ params }: PostPageProps) => {
  const { slug } = await params;
  const payload = await publicGet(`/posts/${slug}`);
  const post = payload?.data;

  return (
    <div>
      <Header pageTitle={post.title} bread="وبلاگ" breadLink="/posts" />
      <div className="w-full px-5 md:px-24 lg:px-48 py-12 space-y-6 flex flex-col items-center">
        <div className="w-full h-64">
          <Image
            src={post.thumbnail_url || post.thumbnail}
            alt={post.title}
            width={1200}
            height={400}
            unoptimized
            className="object-cover w-full h-64 rounded-lg"
          />
        </div>
        <div className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <h1 className="font-bold text-3xl">{post.title}</h1>
        </div>
        <div className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg space-y-4">
          <div className="w-full flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
              <CiFolderOn />
              <Link href={`/categories/${post.category.slug}`}>
                {post.category.name}
              </Link>
            </div>
            <div className="flex items-center gap-2 text-gray-600 ">
              <CiShoppingTag />
              {(post.tags || []).map((item: any) => (
                <Link
                  key={item.id}
                  className="hover:text-blue-500"
                  href={`/tags/${item.slug}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div
            className="text-justify leading-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
        <CommentSection
          commentableType="post"
          commentableId={post.id}
          initialComments={post.comments ?? []}
          commentsCount={post.comments_count}
          ratingAvg={post.rating_avg}
          title="نظرات درباره این مقاله"
        />
      </div>
    </div>
  );
};

export default PostPage;
