"use client";

import { MdClass, MdDashboard, MdPayment } from "react-icons/md";
import { usePathname } from "next/navigation";
import { FiList } from "react-icons/fi";
import { LuCircleHelp } from "react-icons/lu";
import { GrArticle } from "react-icons/gr";
import { LuBell } from "react-icons/lu";
import { PuffLoader } from "react-spinners";
import { useUser } from "@/context/UserContext";
import { TbCategory2 } from "react-icons/tb";
import { IoPricetagOutline } from "react-icons/io5";
import TransitionLink from "@/components/ui/TransitionLink";
import { Bell, CalendarCheck, CalendarFold, CreditCard, LayoutDashboard, List, Mail, PersonStanding, Settings, TestTube, UserRound, Users } from "lucide-react";

const Navbar = () => {
  const links = [
    {
      title: "داشبورد",
      link: "/admin",
      access: ["manager", "boss"],
      icon: <LayoutDashboard />,
    },
    {
      title: "داشبورد محتوا",
      link: "/dashboard",
      access: ["author"],
      icon: <MdDashboard />,
    },
    {
      title: "نوبت ها",
      link: "/admin/appointments",
      access: ["manager", "boss"],
      icon: <CalendarCheck />,
    },
    {
      title: "ارزیابی ها",
      link: "/admin/assessments",
      access: ["manager", "boss"],
      icon: <CalendarFold />,
    },
    {
      title: "مراجعان",
      link: "/admin/clients",
      access: ["manager", "boss"],
      icon: <List />,
    },
    {
      title: "مشاورین",
      link: "/admin/doctors",
      access: ["manager", "boss"],
      icon: <UserRound />,
    },
    {
      title: "پرداخت ها",
      link: "/admin/payments",
      access: ["manager", "boss"],
      icon: <CreditCard />,
    },
    {
      title: "اعلانات",
      link: "/admin/notifications",
      access: ["manager", "boss"],
      icon: <Bell />,
    },
    {
      title: "پنل پیامک",
      link: "/admin/sms-panel",
      access: ["manager", "boss"],
      icon: <Mail />,
    },
    {
      title: "مدیران سایت",
      link: "/admin/admins",
      access: ["boss"],
      icon: <Users />,
    },
    {
      title: "دپارتمان ها",
      link: "/dashboard/departments",
      access: ["author"],
      icon: <FiList />,
    },
    {
      title: "پست ها",
      link: "/dashboard/posts",
      access: ["author"],
      icon: <GrArticle />,
    },
    {
      title: "دسته بندی ها ها",
      link: "/dashboard/categories",
      access: ["author"],
      icon: <TbCategory2 />,
    },
    {
      title: "برچسب ها",
      link: "/dashboard/tags",
      access: ["author"],
      icon: <IoPricetagOutline />,
    },
    {
      title: "کلاس ها و کارگاه ها",
      link: "/dashboard/workshops",
      access: ["author"],
      icon: <MdClass />,
    },
    {
      title: "اعلانات",
      link: "/dashboard/notifications",
      access: ["author"],
      icon: <LuBell />,
    },
    {
      title: "درباره",
      link: "/dashboard/about",
      access: ["author"],
      icon: <LuCircleHelp />,
    },
    {
      title: "تنظیمات",
      link: "/admin/settings",
      access: ["boss", "manager"],
      icon: <Settings />,
    },
  ];

  const pathName = usePathname();
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-4 w-full">
      {!user && (
        <div className="w-full h-full flex items-center justify-center">
          <PuffLoader color="#3b82f6" size={45} />
        </div>
      )}

      {user &&
        links.map(
          (link) =>
            link.access.includes(user.role) && (
              <TransitionLink
                key={link.link}
                href={link.link}
                className={`flex items-center gap-2 text-lg w-full px-4 py-2 ${
                  pathName === link.link
                    ? "bg-blue-100 dark:bg-blue-950 text-blue-600 font-semibold rounded-sm"
                    : "bg-transparent"
                }`}
              >
                {link.icon} {link.title}
              </TransitionLink>
            )
        )}
    </div>
  );
};

export default Navbar;
