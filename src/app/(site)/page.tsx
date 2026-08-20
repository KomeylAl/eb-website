import BlogPosts from "@/components/layout/BlogPosts";
import Comments from "@/components/layout/Comments";
import Departments from "@/components/layout/Departments";
import Hero from "@/components/layout/Hero";
import HomeCtaBand from "@/components/layout/HomeCtaBand";
import HomeServices from "@/components/layout/HomeServices";
import PsychologistsPreview from "@/components/layout/PsychologistsPreview";
import WorkShops from "@/components/layout/WorkShops";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "خانه - مرکز تخصصی مشاوره و رواندرمانی ابراز",
  description:
    "با تاسیس و مدیریت دکتر علی محرابی، متخصص روانشناسی بالینی و عضو هیئت علمی دانشگاه اصفهان",
};

export default function Home() {
  return (
    <main className="bg-white">
      <Hero />
      <HomeServices />
      <Departments />
      <PsychologistsPreview />
      <BlogPosts />
      <WorkShops />
      <Comments />
      <HomeCtaBand />
    </main>
  );
}
