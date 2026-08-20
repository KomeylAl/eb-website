import { Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";

const items = [
  {
    name: "مسلم زراعتکار",
    comment:
      "سلام و درود بسیار از کلینیک شما سپاسگزارم و به دوستان با اطمینان کامل پیشنهاد می‌کنم به کلینیک شما مراجعه کنند.",
  },
  {
    name: "مریم",
    comment:
      "می‌شود گفت متفاوت‌ترین کلینیک. وقتی توی این کلینیک تجربه درمان داشته باشی تازه می‌فهمی چقدر تجربه تراپی می‌تواند خاص و موثر باشد.",
  },
  {
    name: "نازنین فرخانی",
    comment:
      "یکی از بهترین مراکز روانشناختی که به شدت روی روان‌درمانگرانشان حساس هستند. می‌شود به جرات گفت این کلینیک در سطح استانداردهای جهانی کار می‌کند.",
  },
];

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=%DA%A9%D9%84%DB%8C%D9%86%DB%8C%DA%A9+%D8%AA%D8%AE%D8%B5%D8%B5%DB%8C+%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87+%D9%88+%D8%B1%D9%88%D8%A7%D9%86%D8%AF%D8%B1%D9%85%D8%A7%D9%86%DB%8C+%D8%A7%D8%A8%D8%B1%D8%A7%D8%B2";

const Comments = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-niceblue-100/35 to-white px-5 py-20 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-beige/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl space-y-12">
        <SectionHeading
          eyebrow="اعتماد مراجعین"
          title="آنچه مراجعین می‌گویند"
          description="تجربه واقعی کسانی که مسیر درمان را در کلینیک ابراز طی کرده‌اند."
        />

        <div className="flex justify-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#2daa9e] underline-offset-4 hover:underline"
          >
            مشاهده نظرات در گوگل
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <figure
              key={item.name}
              className="relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white/90 p-6 text-right shadow-[0_20px_50px_-35px_rgba(0,0,0,0.35)]"
            >
              <Quote className="mb-4 size-8 text-beige" strokeWidth={1.5} />
              <blockquote className="text-sm leading-7 text-gray-700 sm:text-base">
                {item.comment}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-4">
                <span className="flex size-10 items-center justify-center rounded-full bg-niceblue-200 text-sm font-semibold text-niceblue-primary">
                  {item.name.slice(0, 1)}
                </span>
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">مراجع کلینیک ابراز</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Comments;
