import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import WorkshopItem from "./WorkshopItem";
import { WorkshopType } from "@/lib/types";
import { publicGet } from "@/lib/publicApi";
import SectionHeading from "./SectionHeading";
import TransitionLink from "@/components/ui/TransitionLink";

const WorkShops = async () => {
  let workshops: WorkshopType[] = [];
  try {
    const data = await publicGet("/workshops", {
      page: 1,
      per_page: 10,
    });
    workshops = data?.data || [];
  } catch {
    workshops = [];
  }

  return (
    <section className="workshop relative w-full overflow-hidden">
      <div className="absolute inset-0 bg-black/80" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 md:px-12 lg:px-16">
        <SectionHeading
          tone="dark"
          eyebrow="یادگیری و تجربه گروهی"
          title="کلاس‌ها و کارگاه‌ها"
          description="کارگاه‌های تخصصی و عمومی برای رشد مهارت‌های فردی و حرفه‌ای، با مدرسین مجرب مرکز ابراز."
          actionHref="/workshops"
          actionLabel="همه کارگاه‌ها"
        />

        <div className="mt-12">
          {workshops.length === 0 ? (
            <p className="text-center text-white/70">هنوز کارگاهی اضافه نشده است.</p>
          ) : (
            <Carousel
              opts={{
                align: "start",
                axis: "x",
                direction: "rtl",
              }}
            >
              <CarouselContent className="text-black">
                {workshops.map((item) => (
                  <CarouselItem
                    className="basis-[85%] sm:basis-1/2 xl:basis-1/3 2xl:basis-1/4"
                    key={item.id}
                  >
                    <WorkshopItem
                      title={item.title}
                      image={item.image_url || item.img_path || ""}
                      day={item.week_day || ""}
                      id={item.id}
                      organizers={item.organizers || ""}
                      endDate={item.end_date || ""}
                      registrationAvailable={(item as any).registration_available}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext className="hidden border-white/20 bg-white/90 text-black md:flex" />
              <CarouselPrevious className="hidden border-white/20 bg-white/90 text-black md:flex" />
            </Carousel>
          )}
        </div>

        <div className="mt-10 flex justify-center md:hidden">
          <TransitionLink
            href="/workshops"
            className="rounded-md border border-beige px-5 py-2.5 text-sm text-beige"
          >
            مشاهده همه کارگاه‌ها
          </TransitionLink>
        </div>
      </div>
    </section>
  );
};

export default WorkShops;
