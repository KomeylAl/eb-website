import { publicGet } from "@/lib/publicApi";
import HeroClient, {
  type HeroSettingsData,
  type HeroSlideData,
} from "./HeroClient";

function normalizeSlides(payload: any): HeroSlideData[] {
  const root = payload?.data ?? payload;
  const slides = root?.slides ?? root?.data?.slides ?? [];
  if (!Array.isArray(slides)) return [];

  return slides
    .map((slide: any) => ({
      id: String(slide.id),
      title: slide.title || "",
      body: slide.body ?? null,
      button_text: slide.button_text ?? null,
      button_link: slide.button_link ?? null,
      image_url: slide.image_url ?? null,
    }))
    .filter((s: HeroSlideData) => s.title);
}

function normalizeSettings(payload: any): HeroSettingsData | null {
  const root = payload?.data ?? payload;
  const settings = root?.settings ?? null;
  if (!settings || typeof settings !== "object") return null;
  return {
    background_url: settings.background_url ?? null,
    autoplay_ms: settings.autoplay_ms ?? 5000,
  };
}

export default async function Hero() {
  const payload = await publicGet("/hero");
  const settings = normalizeSettings(payload);
  const slides = normalizeSlides(payload);

  return <HeroClient settings={settings} slides={slides} />;
}
