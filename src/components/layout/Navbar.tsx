"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HiMenuAlt4 } from "react-icons/hi";
import TransitionLink from "../ui/TransitionLink";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  LogIn,
  Stethoscope,
  UserRound,
  Sparkles,
  X,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import logo from "../../../public/images/logo-w.png";

import workshop from "../../../public/images/in1.jpg";
import blog from "../../../public/images/blog.webp";
import appointment from "../../../public/images/appointment.webp";
import organ from "../../../public/images/organ.webp";

const megaMenuData: any = {
  appointment: {
    title: "دریافت نوبت",
    desc: "دیدن نحوه دریافت نوبت و دریافت نوبت ارزیابی اولیه رایگان.",
    image: appointment,
    links: [
      { label: "رزرو نوبت جدید", href: "/appointment" },
      { label: "لیست روان‌درمانگران", href: "/psychologists" },
      {
        label: "دریافت نوبت ارزیابی اولیه رایگان",
        href: "/appointment/#assessment",
      },
    ],
  },
  departments: {
    title: "چارت سازمانی",
    desc: "مشاهده چارت سازمانی مرکز ابراز.",
    image: organ,
    links: [
      { label: "واحد تست و ارزیابی", href: "/appointment" },
      { label: "واحد مدیریت", href: "/psychologists" },
      {
        label: "دپارتمان ها",
        href: "/appointment/#assessment",
      },
    ],
  },
  workshops: {
    title: "کارگاه‌ها و رویدادها",
    desc: "کارگاه، وبینار و سمینارهای مرکز ابراز با مدرسین برجسته.",
    image: workshop,
    links: [
      { label: "کارگاه‌های عمومی", href: "/workshops?type=general" },
      { label: "کارگاه‌های تخصصی", href: "/workshops?type=specialized" },
      { label: "وبینارها", href: "/workshops?type=webinar" },
      { label: "سمینارها", href: "/workshops?type=seminar" },
    ],
  },
  posts: {
    title: "مجله ابراز",
    desc: "مطالب علمی، نکات روانشناسی، خودآگاهی و رشد فردی.",
    image: blog,
    links: [
      { label: "مطالب عمومی", href: "/posts?type=general" },
      { label: "مطالب تخصصی", href: "/posts?type=specialized" },
      { label: "اخبار روانشناسی", href: "/news" },
    ],
  },
};

const items = [
  {
    title: "دریافت نوبت",
    link: "appointment",
    mega: true,
    dataKey: "appointment",
  },
  { title: "چارت سازمانی", link: null, mega: true, dataKey: "departments" },
  { title: "کارگاه‌ها و رویدادها", link: "workshops", mega: true, dataKey: "workshops" },
  { title: "مجله ابراز", link: "posts", mega: true, dataKey: "posts" },
  { title: "متخصصان", link: "/psychologists" },
  { title: "درباره ابراز", link: "/about" },
];

const loginLinks = [
  {
    label: "مراجعین",
    href:
      process.env.NEXT_PUBLIC_CLIENT_LOGIN_URL ||
      "https://client.ebrazclinic.ir",
    icon: UserRound,
  },
  {
    label: "متخصصین",
    href:
      process.env.NEXT_PUBLIC_DOCTOR_LOGIN_URL || "https://psy.ebrazclinic.ir",
    icon: Stethoscope,
  },
  {
    label: "ابراز پلاس",
    href:
      process.env.NEXT_PUBLIC_PLUS_LOGIN_URL || "https://client.ebrazclinic.ir",
    icon: Sparkles,
  },
];

function LoginMenu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm font-medium text-shelfish transition-colors hover:border-beige/50 hover:bg-white/15 hover:text-beige lg:px-4 lg:text-base",
            className
          )}
          aria-haspopup="menu"
          aria-expanded={open}
        >
          <LogIn className="size-4 shrink-0" />
          <span>ورود</span>
          <ChevronDown
            className={cn(
              "size-3.5 shrink-0 transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={10}
        className="z-[1100] w-48 border-gray-200 bg-white p-1.5 text-gray-800 shadow-xl"
      >
        <ul className="flex flex-col gap-0.5" role="menu">
          {loginLinks.map((item) => {
            const Icon = item.icon;
            const isExternal = item.href.startsWith("http");

            return (
              <li key={item.label} role="none">
                <a
                  href={item.href}
                  role="menuitem"
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                  <Icon className="size-4 shrink-0 text-gray-500" />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [expandedMobileMenus, setExpandedMobileMenus] = useState<Set<string>>(
    new Set()
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setExpandedMobileMenus(new Set());
  };

  const toggleMobileMenu = (key: string) => {
    setExpandedMobileMenus((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  useEffect(() => {
    closeMobileMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className="relative p-4">
        <div className="z-1000! flex w-full items-center justify-between gap-4 rounded-lg bg-black/30 p-4 backdrop-blur-md lg:gap-8 lg:py-4 xl:px-28">
          {/* لوگو → صفحه اصلی */}
          <TransitionLink
            href="/"
            className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-90"
          >
            <Image src={logo} alt="لوگو کلینیک ابراز" width={30} height={100} />
            <p className="hidden text-xl font-semibold text-white xl:block">
              کلینیک ابراز
            </p>
          </TransitionLink>

          {/* منوی دسکتاپ */}
          <nav className="hidden min-w-0 flex-1 lg:block">
            <ul className="flex items-center justify-center gap-8 text-white xl:gap-12">
              {items.map((item) => (
                <li
                  key={item.title}
                  onMouseEnter={() => item.mega && setActiveMega(item.dataKey)}
                  onMouseLeave={() => item.mega && setActiveMega(null)}
                  className={cn(
                    "relative text-lg transition-all duration-200 hover:text-beige xl:text-xl",
                    pathname === item.link
                      ? "font-semibold text-beige"
                      : "text-shelfish",
                    item.mega ? "cursor-default" : "cursor-pointer"
                  )}
                >
                  {item.mega ? (
                    <span>{item.title}</span>
                  ) : (
                    <TransitionLink href={item.link!}>{item.title}</TransitionLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* ورود + همبرگر */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <LoginMenu />
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="inline-flex size-10 items-center justify-center rounded-lg text-shelfish transition-colors hover:bg-white/10 lg:hidden"
              aria-label="باز کردن منو"
            >
              <HiMenuAlt4 size={28} />
            </button>
          </div>
        </div>

        {/* مگامنو */}
        <AnimatePresence>
          {activeMega && (
            <div className="relative w-full px-4 pt-2">
              <motion.div
                key={activeMega}
                onMouseEnter={() => setActiveMega(activeMega)}
                onMouseLeave={() => setActiveMega(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute top-full left-0 z-10 flex h-96 w-full overflow-hidden rounded-lg bg-shelfish shadow-xl"
              >
                <motion.div
                  initial={{ scale: 1.05, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.05, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative h-full w-1/2"
                >
                  <Image
                    src={megaMenuData[activeMega].image}
                    alt=""
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </motion.div>

                <div className="flex w-1/2 flex-col justify-center gap-6 p-12">
                  <motion.h2
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.25 }}
                    className="text-3xl font-bold text-gray-800"
                  >
                    {megaMenuData[activeMega].title}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    className="leading-7 text-gray-600"
                  >
                    {megaMenuData[activeMega].desc}
                  </motion.p>

                  <motion.div
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.08,
                          delayChildren: 0.1,
                        },
                      },
                    }}
                    className="mt-4 flex flex-col gap-3"
                  >
                    {megaMenuData[activeMega].links.map((link: any) => (
                      <motion.div
                        key={link.href}
                        variants={{
                          hidden: { opacity: 0, x: 10 },
                          show: { opacity: 1, x: 0 },
                        }}
                      >
                        <TransitionLink
                          href={link.href}
                          className="text-lg text-primary transition-all hover:text-beige"
                        >
                          {link.label}
                        </TransitionLink>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* منوی موبایل — portal تا به لبه viewport بچسبد */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isMenuOpen && (
              <>
                <motion.div
                  key="backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-[100] bg-black/45 backdrop-blur-[2px] lg:hidden"
                  onClick={closeMobileMenu}
                  aria-hidden
                />

                <motion.aside
                  key="drawer"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 320 }}
                  className="fixed inset-y-0 right-0 z-[110] flex h-dvh w-[min(20rem,88vw)] flex-col bg-white shadow-2xl lg:hidden"
                  role="dialog"
                  aria-modal="true"
                  aria-label="منوی اصلی"
                >
                  <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
                    <TransitionLink
                      href="/"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-2"
                    >
                      <Image
                        src={logo}
                        alt="لوگو"
                        width={28}
                        height={28}
                        className="brightness-0"
                      />
                      <span className="font-semibold text-gray-900">
                        کلینیک ابراز
                      </span>
                    </TransitionLink>
                    <button
                      type="button"
                      onClick={closeMobileMenu}
                      className="inline-flex size-10 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
                      aria-label="بستن منو"
                    >
                      <X className="size-5" />
                    </button>
                  </div>

                  <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                    <ul className="flex flex-col gap-1">
                      {items.map((item) => (
                        <li key={item.title} className="w-full">
                          {item.mega ? (
                            <div className="rounded-xl">
                              <button
                                type="button"
                                onClick={() => toggleMobileMenu(item.dataKey)}
                                className={cn(
                                  "flex w-full items-center justify-between rounded-xl px-3 py-3 text-right text-base font-semibold transition-colors",
                                  expandedMobileMenus.has(item.dataKey)
                                    ? "bg-gray-50 text-gray-900"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                )}
                              >
                                {item.title}
                                <ChevronDown
                                  className={cn(
                                    "size-4 shrink-0 text-gray-400 transition-transform duration-200",
                                    expandedMobileMenus.has(item.dataKey) &&
                                      "rotate-180"
                                  )}
                                />
                              </button>
                              <div
                                className={cn(
                                  "grid transition-[grid-template-rows] duration-300 ease-in-out",
                                  expandedMobileMenus.has(item.dataKey)
                                    ? "grid-rows-[1fr]"
                                    : "grid-rows-[0fr]"
                                )}
                              >
                                <div className="overflow-hidden">
                                  <ul className="mt-1 mb-2 mr-3 space-y-0.5 border-r-2 border-gray-200 pr-3">
                                    {megaMenuData[item.dataKey].links.map(
                                      (link: any) => (
                                        <li key={link.href}>
                                          <TransitionLink
                                            href={link.href}
                                            onClick={closeMobileMenu}
                                            className="block rounded-lg px-3 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                                          >
                                            {link.label}
                                          </TransitionLink>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <TransitionLink
                              href={item.link!}
                              onClick={closeMobileMenu}
                              className={cn(
                                "block rounded-xl px-3 py-3 text-base font-semibold transition-colors",
                                pathname === item.link
                                  ? "bg-gray-50 text-gray-900"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                              )}
                            >
                              {item.title}
                            </TransitionLink>
                          )}
                        </li>
                      ))}
                    </ul>
                  </nav>
                </motion.aside>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default Navbar;
