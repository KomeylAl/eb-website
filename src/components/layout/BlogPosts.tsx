import Image from "next/image";
import { publicGet } from "@/lib/publicApi";
import { dateConvert } from "@/lib/utils";
import TransitionLink from "@/components/ui/TransitionLink";
import SectionHeading from "./SectionHeading";
import fallbackImage from "../../../public/images/hero2.webp";

function previewText(text: string, maxLength = 110) {
  if (!text) return "";
  if (text.length > maxLength) return `${text.slice(0, maxLength)}...`;
  return text;
}

const BlogPosts = async () => {
  const data = await publicGet("/posts", {
    page: 1,
    per_page: 4,
    status: "published",
  });

  const posts = data?.data || [];
  const [featured, ...rest] = posts;

  return (
    <section className="w-full bg-white px-5 py-20 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeading
          eyebrow="مجله ابراز"
          title="خواندنی‌های تازه"
          description="مقالات علمی و کاربردی برای خودآگاهی، رشد فردی و درک بهتر مسیر درمان."
          actionHref="/posts"
          actionLabel="مشاهده همه مقالات"
        />

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">هنوز مقاله‌ای منتشر نشده است.</p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-12">
            {featured && (
              <TransitionLink
                href={`/posts/${featured.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-gray-950 lg:col-span-7"
              >
                <div className="relative aspect-[16/11] lg:aspect-auto lg:min-h-[28rem]">
                  <Image
                    src={featured.thumbnail_url || featured.thumbnail || fallbackImage}
                    alt={featured.title}
                    fill
                    unoptimized
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 space-y-3 p-6 text-right sm:p-8">
                    {featured.category?.name && (
                      <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs text-beige backdrop-blur">
                        {featured.category.name}
                      </span>
                    )}
                    <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                      {featured.title}
                    </h3>
                    <p className="max-w-xl text-sm leading-7 text-white/75 sm:text-base">
                      {previewText(featured.excerpt, 140)}
                    </p>
                    {featured.published_at && (
                      <p className="text-xs text-white/55">
                        {dateConvert(featured.published_at)}
                      </p>
                    )}
                  </div>
                </div>
              </TransitionLink>
            )}

            <div className="flex flex-col gap-4 lg:col-span-5">
              {rest.map((post: any) => (
                <TransitionLink
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className="group flex gap-4 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/80 p-3 transition hover:border-[#2daa9e]/40 hover:bg-white"
                >
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-36">
                    <Image
                      src={post.thumbnail_url || post.thumbnail || fallbackImage}
                      alt={post.title}
                      fill
                      unoptimized
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="144px"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 text-right">
                    {post.category?.name && (
                      <p className="text-xs text-[#2daa9e]">{post.category.name}</p>
                    )}
                    <h3 className="line-clamp-2 font-semibold text-gray-900 transition group-hover:text-[#2daa9e]">
                      {post.title}
                    </h3>
                    <p className="line-clamp-2 text-sm leading-6 text-gray-600">
                      {previewText(post.excerpt, 90)}
                    </p>
                  </div>
                </TransitionLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPosts;
