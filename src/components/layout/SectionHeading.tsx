import TransitionLink from "@/components/ui/TransitionLink";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "right";
  tone?: "light" | "dark";
  className?: string;
  actionHref?: string;
  actionLabel?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
  actionHref,
  actionLabel,
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" ? "text-center mx-auto" : "text-right",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-sm tracking-wide",
            isDark ? "text-beige/90" : "text-[#2daa9e]"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-2xl font-semibold sm:text-3xl lg:text-4xl",
          isDark ? "text-white" : "text-gray-900"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-base leading-8 sm:text-lg",
            align === "center" && "mx-auto",
            isDark ? "text-white/75" : "text-gray-600"
          )}
        >
          {description}
        </p>
      )}
      {actionHref && actionLabel && (
        <div className={cn(align === "center" && "flex justify-center", "pt-2")}>
          <TransitionLink
            href={actionHref}
            className={cn(
              "inline-flex items-center rounded-md border px-5 py-2.5 text-sm transition",
              isDark
                ? "border-beige text-beige hover:bg-beige hover:text-black"
                : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
            )}
          >
            {actionLabel}
          </TransitionLink>
        </div>
      )}
    </div>
  );
}
