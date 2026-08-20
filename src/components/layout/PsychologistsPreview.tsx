import Image from "next/image";
import { publicGet } from "@/lib/publicApi";
import TransitionLink from "@/components/ui/TransitionLink";
import SectionHeading from "./SectionHeading";

function getAvatar(doctor: any) {
  return (
    doctor?.doctor_profile?.avatar_url ||
    doctor?.avatar_url ||
    doctor?.avatar ||
    "/images/hero2.webp"
  );
}

function getSpecialty(doctor: any) {
  return doctor?.departments?.[0]?.title || "روان‌درمانگر";
}

export default async function PsychologistsPreview() {
  const payload = await publicGet("/doctors", {
    page: 1,
    per_page: 4,
  });
  const doctors = Array.isArray(payload?.data) ? payload.data.slice(0, 4) : [];

  if (doctors.length === 0) return null;

  return (
    <section className="w-full bg-gradient-to-b from-white to-niceblue-100/30 px-5 py-20 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeading
          eyebrow="تیم درمان"
          title="با متخصصان ابراز آشنا شوید"
          description="انتخاب درمانگر مناسب، مهم‌ترین گام شروع مسیر درمان است."
          actionHref="/psychologists"
          actionLabel="مشاهده همه متخصصان"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor: any) => (
            <TransitionLink
              key={doctor.id}
              href={`/psychologists/${doctor.id}`}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <Image
                  src={getAvatar(doctor)}
                  alt={doctor.name || "درمانگر"}
                  fill
                  unoptimized
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-right text-white">
                  <h3 className="text-lg font-semibold">{doctor.name}</h3>
                  <p className="mt-1 text-sm text-white/75">
                    {getSpecialty(doctor)}
                  </p>
                </div>
              </div>
            </TransitionLink>
          ))}
        </div>
      </div>
    </section>
  );
}
