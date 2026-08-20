import TransitionLink from "@/components/ui/TransitionLink";

export default function HomeCtaBand() {
  return (
    <section className="relative w-full overflow-hidden bg-niceblue-primary px-5 py-16 sm:px-8 md:px-16 lg:px-24">
      <div className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-beige/20 blur-2xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-[#2daa9e]/35 blur-2xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 text-right lg:flex-row lg:items-center">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm text-beige">آماده شروع هستید؟</p>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            همین امروز ارزیابی اولیه رایگان خود را رزرو کنید
          </h2>
          <p className="text-sm leading-7 text-white/75 sm:text-base">
            برای انتخاب بهترین مسیر درمان، یک گفتگوی کوتاه اولیه کافی است تا
            متخصص مناسب شما معرفی شود.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <TransitionLink
            href="/appointment/#assessment"
            className="btn-shimmer inline-flex items-center justify-center rounded-md border border-beige bg-beige px-6 py-3 text-center text-sm font-medium text-gray-900 transition hover:bg-white"
          >
            <span>رزرو ارزیابی رایگان</span>
          </TransitionLink>
          <a
            href="tel:03191095184"
            className="inline-flex items-center justify-center rounded-md border border-white/35 px-6 py-3 text-center text-sm text-white transition hover:bg-white/10"
          >
            تماس با پذیرش
          </a>
        </div>
      </div>
    </section>
  );
}
