import {
  CalendarCheck,
  ClipboardList,
  PhoneCall,
  UsersRound,
} from "lucide-react";
import TransitionLink from "@/components/ui/TransitionLink";
import SectionHeading from "./SectionHeading";

const services = [
  {
    title: "ارزیابی اولیه رایگان",
    description:
      "برای شناخت دقیق نیاز درمانی و معرفی مناسب‌ترین متخصص، یک ارزیابی اولیه انجام می‌شود.",
    href: "/appointment/#assessment",
    icon: ClipboardList,
  },
  {
    title: "رزرو نوبت آنلاین",
    description:
      "نوبت مشاوره حضوری یا آنلاین را سریع و بدون تماس تلفنی رزرو کنید.",
    href: "/appointment",
    icon: CalendarCheck,
  },
  {
    title: "مشاوره با متخصصان",
    description:
      "با تیم روان‌درمانگران تخصصی ابراز آشنا شوید و مسیر درمان خود را انتخاب کنید.",
    href: "/psychologists",
    icon: UsersRound,
  },
  {
    title: "روانشناس آنکال",
    description:
      "در شرایط بحرانی، در ساعات کاری با روانشناس آنکال مرکز تماس بگیرید.",
    href: "tel:09228728245",
    icon: PhoneCall,
    external: true,
  },
];

export default function HomeServices() {
  return (
    <section className="w-full bg-white px-5 py-16 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      <div className="mx-auto max-w-7xl space-y-10">
        <SectionHeading
          eyebrow="شروع از اینجا"
          title="چطور می‌توانیم کمکتان کنیم؟"
          description="چهار مسیر اصلی برای شروع درمان، رزرو نوبت و ارتباط سریع با مرکز."
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((item) => {
            const Icon = item.icon;
            const className =
              "group flex h-full flex-col gap-4 rounded-2xl border border-gray-200 bg-gradient-to-b from-niceblue-100/50 to-white p-5 text-right transition hover:-translate-y-1 hover:border-[#2daa9e]/40 hover:shadow-lg hover:shadow-[#2daa9e]/10";

            const content = (
              <>
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-white text-[#2daa9e] shadow-sm ring-1 ring-[#2daa9e]/20 transition group-hover:bg-[#2daa9e] group-hover:text-white">
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-7 text-gray-600">
                    {item.description}
                  </p>
                </div>
                <span className="mt-auto pt-2 text-sm text-[#2daa9e] transition group-hover:translate-x-[-3px]">
                  ادامه ←
                </span>
              </>
            );

            if (item.external) {
              return (
                <a key={item.title} href={item.href} className={className}>
                  {content}
                </a>
              );
            }

            return (
              <TransitionLink
                key={item.title}
                href={item.href}
                className={className}
              >
                {content}
              </TransitionLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}
