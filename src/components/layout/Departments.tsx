import Image from "next/image";
import { publicGet } from "@/lib/publicApi";
import TransitionLink from "@/components/ui/TransitionLink";
import SectionHeading from "./SectionHeading";

const Departments = async () => {
  let departments: any[] = [];
  try {
    const payload = await publicGet("/departments");
    departments = payload?.data || [];
  } catch {
    departments = [];
  }

  return (
    <section
      id="departments"
      className="relative w-full overflow-hidden bg-gradient-to-b from-niceblue-100/40 via-white to-white px-5 py-20 sm:px-8 md:px-16 lg:px-24 xl:px-32"
    >
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-[#2daa9e]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl space-y-12">
        <SectionHeading
          eyebrow="مسیر تخصصی درمان"
          title="دپارتمان‌های کلینیک ابراز"
          description="هر دپارتمان با تمرکز روی یک حوزه تخصصی، مسیر درمان را دقیق‌تر و موثرتر می‌کند."
        />

        {departments.length === 0 ? (
          <p className="text-center text-gray-500">در حال بارگذاری اطلاعات...</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {departments.map((d: any, index: number) => (
              <TransitionLink
                key={d.id}
                href={`/departments/${d.slug}`}
                className="group relative block overflow-hidden rounded-2xl bg-gray-900 shadow-lg shadow-black/10"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={d.thumbnail_url || d.thumbnail || "/images/hero2.webp"}
                    alt={d.title}
                    fill
                    unoptimized
                    className="object-cover saturate-[0.35] transition duration-700 group-hover:scale-105 group-hover:saturate-100"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-right">
                    <p className="mb-1 text-xs text-beige/80">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-lg font-semibold text-white sm:text-xl">
                      {d.title}
                    </h3>
                    {d.excerpt && (
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/70">
                        {d.excerpt}
                      </p>
                    )}
                    <span className="mt-4 inline-flex text-sm text-beige transition group-hover:translate-x-[-4px]">
                      مشاهده دپارتمان ←
                    </span>
                  </div>
                </div>
              </TransitionLink>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Departments;
