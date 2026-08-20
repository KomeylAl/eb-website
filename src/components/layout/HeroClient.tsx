"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TransitionLink from "../ui/TransitionLink";
import { cn } from "@/lib/utils";

export type HeroSlideData = {
  id: string;
  title: string;
  body?: string | null;
  button_text?: string | null;
  button_link?: string | null;
  image_url?: string | null;
};

export type HeroSettingsData = {
  background_url?: string | null;
  autoplay_ms?: number | null;
};

type HeroClientProps = {
  settings?: HeroSettingsData | null;
  slides: HeroSlideData[];
};

const FALLBACK_BG = "/images/hero2.webp";

function isExternalOrSpecialLink(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:") ||
    href.startsWith("#")
  );
}

const HeroClient = ({ settings, slides }: HeroClientProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const backgroundUrl = settings?.background_url || FALLBACK_BG;
  const autoplayMs = Math.max(2000, Number(settings?.autoplay_ms) || 5000);
  const hasSlides = slides.length > 0;

  useEffect(() => {
    if (!hasSlides || slides.length < 2) return;
    const timer = setInterval(() => {
      if (!isHovered) {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }
    }, autoplayMs);
    return () => clearInterval(timer);
  }, [isHovered, slides.length, autoplayMs, hasSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const active = hasSlides ? slides[currentSlide] : null;

  return (
    <section className="relative h-dvh max-h-dvh w-full overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={backgroundUrl}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-l from-black/85 via-black/70 to-black/55" />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 flex h-full flex-col pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-28 lg:pb-16">
        <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 items-center px-5 sm:px-8 lg:px-12">
          {active ? (
            <div
              className="grid h-full max-h-full w-full items-center gap-6 lg:grid-cols-2 lg:gap-30"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Text + CTA */}
              <div
                key={active.id + "-content"}
                className="order-2 flex min-h-0 flex-col items-start justify-center text-right lg:order-1"
              >
                <div
                  key={active.id}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
                >
                  <p className="mb-3 text-sm tracking-wide text-beige/90">
                    کلینیک ابراز
                  </p>
                  <h1 className="max-w-xl text-2xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl xl:text-[3.1rem]">
                    {active.title}
                  </h1>
                  {active.body && (
                    <p className="mt-4 line-clamp-5 max-w-xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8 lg:text-lg">
                      {active.body}
                    </p>
                  )}
                  {active.button_text && active.button_link && (
                    <div className="mt-6">
                      {isExternalOrSpecialLink(active.button_link) ? (
                        <a
                          href={active.button_link}
                          className="btn-shimmer inline-flex min-w-40 items-center justify-center rounded-md border border-beige px-5 py-2.5 text-center text-sm text-beige transition duration-200 hover:bg-beige hover:text-black sm:min-w-44 sm:px-6 sm:py-3 sm:text-base"
                        >
                          <span>{active.button_text}</span>
                        </a>
                      ) : (
                        <TransitionLink
                          href={active.button_link}
                          className="btn-shimmer inline-flex min-w-40 items-center justify-center rounded-md border border-beige px-5 py-2.5 text-center text-sm text-beige transition duration-200 hover:bg-beige hover:text-black sm:min-w-44 sm:px-6 sm:py-3 sm:text-base"
                        >
                          <span>{active.button_text}</span>
                        </TransitionLink>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Slide image */}
              <div className="order-1 flex min-h-0 items-center justify-center lg:order-2 lg:justify-end">
                <div
                  key={active.id + "-image"}
                  className="relative h-[min(38dvh,18rem)] w-auto aspect-[4/5] max-w-full overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-2xl shadow-black/40 sm:h-[min(48dvh,22rem)] lg:h-[min(58dvh,28rem)] lg:ml-auto animate-in fade-in zoom-in-95 duration-700"
                >
                  {active.image_url ? (
                    <Image
                      src={active.image_url}
                      alt={active.title}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 90vw, 480px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/10 to-transparent text-sm text-white/50">
                      بدون تصویر اسلاید
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl text-center text-white">
              <h1 className="text-3xl font-semibold sm:text-5xl">
                مرکز جامع تخصصی مشاوره و رواندرمانی{" "}
                <span className="text-beige">ابراز</span>
              </h1>
              <p className="mt-6 text-lg text-white/80">
                با تاسیس و مدیریت دکتر علی محرابی
              </p>
            </div>
          )}
        </div>

        {/* Scroll hint */}
        {/* <div className="mt-4 flex shrink-0 justify-center sm:mt-6">
          <a href="#departments" aria-label="اسکرول به بخش بعدی">
            <div className="flex h-10 w-5 items-end justify-center rounded-full border border-shelfish text-shelfish animate-bounce sm:h-12">
              .
            </div>
          </a>
        </div> */}
      </div>

      {hasSlides && slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            className="absolute top-1/2 right-3 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition hover:bg-white/20 sm:right-6"
            aria-label="اسلاید قبلی"
          >
            <ChevronRight size={22} />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute top-1/2 left-3 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition hover:bg-white/20 sm:left-6"
            aria-label="اسلاید بعدی"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 sm:bottom-5">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === currentSlide ? "w-5 bg-beige" : "w-2 bg-white/45"
                )}
                aria-label={`رفتن به اسلاید ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default HeroClient;
