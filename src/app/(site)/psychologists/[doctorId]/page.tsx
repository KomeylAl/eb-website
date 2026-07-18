import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Briefcase,
  Link as LinkIcon,
  FileText,
} from "lucide-react";
import Header from "@/components/layout/Header";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

import Script from "next/script";
import { Metadata } from "next";
import Link from "next/link";
import { publicGet } from "@/lib/publicApi";

interface DoctorProfileProps {
  params: {
    doctorId: string;
  };
}

function getDoctorAvatar(doctor: any): string {
  return (
    doctor?.doctor_profile?.avatar_url ||
    doctor?.avatar_url ||
    doctor?.avatar ||
    "/default-avatar.jpg"
  );
}

function getResourceHref(resource: any): string {
  if (resource?.type === "link") return resource.link || "#";
  return resource?.file_url || resource?.url || "#";
}

export async function generateMetadata({
  params,
}: DoctorProfileProps): Promise<Metadata> {
  const { doctorId } = await params;

  try {
    const doctorData = await publicGet(`/doctors/${doctorId}`);
    const doctor = doctorData?.data;

    return {
      title: `${doctor?.name ?? "مشاور"} - کلینیک ابراز`,
      description:
        doctor?.resume?.bio ??
        `صفحه معرفی و رزومه ${doctor?.name ?? "مشاور"} در کلینیک ابراز.`,
      openGraph: {
        title: `${doctor?.name ?? "مشاور"} - کلینیک ابراز`,
        description: doctor?.resume?.bio ?? "",
        images: [getDoctorAvatar(doctor)],
      },
    };
  } catch {
    return {
      title: "مشاور یافت نشد | کلینیک ابراز",
      description: "این صفحه در حال حاضر در دسترس نیست.",
    };
  }
}

const DoctorProfile = async ({ params }: DoctorProfileProps) => {
  const { doctorId } = await params;

  let doctor: any;
  try {
    const data = await publicGet(`/doctors/${doctorId}`);
    doctor = data.data;
  } catch {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-500">
        اطلاعات پزشک یافت نشد.
      </div>
    );
  }

  const resume = doctor?.resume ?? {};
  const avatar = getDoctorAvatar(doctor);
  console.log(avatar);

  const skills = resume?.skills ?? [];
  const educations = resume?.educations ?? [];
  const social = resume?.social_links ?? {};
  const resources = doctor?.doctor_resources ?? [];

  return (
    <div className="bg-niceblue-50 min-h-screen">
      <Header
        pageTitle={doctor.name}
        bread="متخصصان"
        breadLink="/psychologists"
      />

      <Script
        id="doctor-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: doctor.name,
            jobTitle: resume?.specialization,
            description: resume?.bio,
            image: avatar,
            url: `https://ebrazclinic.ir/psychologists/${doctor.id}`,
            sameAs: Object.values(social ?? {}),
          }),
        }}
      />

      <div className="w-full flex flex-col lg:flex-row items-start gap-4 px-4 md:px-12 lg:px-32 py-10 space-y-4 lg:space-y-0">
        <div className="w-full lg:w-1/3 flex flex-col items-center justify-center gap-4 lg:sticky lg:top-28">
          <Image
            src={avatar}
            alt={doctor.name}
            width={400}
            height={400}
            unoptimized
            className="w-full rounded-md object-cover border-gray-300"
            sizes="(max-width: 768px) 100vw, 400px"
          />

          <div className="w-full bg-white/30 border border-gray-300 rounded-md p-6 space-y-3">
            <div className="w-full flex gap-4 justify-between items-center">
              <Link
                href={social?.linkedin ?? ""}
                target="_blank"
                className="text-gray-700 hover:scale-110 transition-transform"
              >
                <FaLinkedinIn size={25} />
              </Link>
              <Link
                href={social?.instagram ?? ""}
                target="_blank"
                className="text-gray-700 hover:scale-110 transition-transform"
              >
                <FaInstagram size={25} />
              </Link>
              <Link
                href={social?.twitter ?? ""}
                target="_blank"
                className="text-gray-700 hover:scale-110 transition-transform"
              >
                <FaTwitter size={25} />
              </Link>
              <Link
                href={social?.website ?? ""}
                target="_blank"
                className="text-gray-700 hover:scale-110 transition-transform"
              >
                <TbWorld size={25} />
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full space-y-4 flex-1">
          <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="w-full bg-white/30 border border-gray-300 rounded-md p-6">
              <h2 className="text-xl font-semibold mb-3">تخصص اصلی</h2>
              <p className="text-primary">{resume?.specialization ?? "—"}</p>
            </div>

            <div className="w-full bg-white/30 border border-gray-300 rounded-md p-6">
              <h2 className="text-xl font-semibold mb-3">
                رویکرد های درمان / مشاوره
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills?.length > 0 ? (
                  skills.map((skill: string, i: number) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="px-3 py-1 bg-primary text-shelfish"
                    >
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p className="text-gray-500">مهارتی ثبت نشده است.</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white/30 border border-gray-300 rounded-md p-6">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              تحصیلات
            </h2>

            {educations?.length > 0 ? (
              <ul className="list-disc pr-5 space-y-2 text-primary">
                {educations.map((edu: any, i: number) => (
                  <li key={i}>
                    {edu.degree} - {edu.institution}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">تحصیلاتی ثبت نشده است.</p>
            )}
          </div>

          <div className="bg-white/30 border border-gray-300 rounded-md p-6">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" /> رزومه
            </h2>
            {resume?.content ? (
              <div
                className="text-justify leading-8"
                dangerouslySetInnerHTML={{ __html: resume?.content }}
              />
            ) : (
              <p className="text-gray-500">رزومه ثبت نشده است.</p>
            )}
          </div>

          <section className="bg-white/30 border border-gray-300 rounded-md p-6">
            <h3 className="text-lg font-bold mb-2">منابع پیشنهادی درمانگر</h3>

            <ul className="space-y-2">
              {resources.map((r: any) => (
                <li key={r.id} className="flex items-start gap-2">
                  {r.type === "link" ? <LinkIcon /> : <FileText />}
                  <div>
                    <a
                      href={getResourceHref(r)}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      {r.title}
                    </a>
                    {r.description && (
                      <p className="text-sm text-gray-500">{r.description}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
