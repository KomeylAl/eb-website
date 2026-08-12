"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { commentSchema } from "@/validation";
import { Comment, CommentableType } from "@/types";
import { dateConvert } from "@/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { MessageSquarePlus, Star, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

type FormData = yup.InferType<typeof commentSchema>;

interface CommentSectionProps {
  commentableType: CommentableType;
  commentableId: string;
  initialComments?: Comment[];
  commentsCount?: number;
  ratingAvg?: number | null;
  title?: string;
}

function StarDisplay({
  value,
  size = 16,
}: {
  value: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-0.5" dir="ltr">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < Math.round(value)
              ? "fill-primary text-primary"
              : "fill-transparent text-gray-300"
          }
        />
      ))}
    </div>
  );
}

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-1" dir="ltr">
      {Array.from({ length: 5 }).map((_, i) => {
        const rating = i + 1;
        const active = rating <= (hovered || value);
        return (
          <button
            key={rating}
            type="button"
            onMouseEnter={() => setHovered(rating)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(rating)}
            className="p-0.5 transition-transform hover:scale-110"
            aria-label={`${rating} ستاره`}
          >
            <Star
              size={28}
              className={
                active
                  ? "fill-primary text-primary"
                  : "fill-transparent text-gray-300"
              }
            />
          </button>
        );
      })}
    </div>
  );
}

const CommentSection = ({
  commentableType,
  commentableId,
  initialComments = [],
  commentsCount,
  ratingAvg,
  title = "نظرات و امتیازها",
}: CommentSectionProps) => {
  const comments = useMemo(
    () => (Array.isArray(initialComments) ? initialComments : []),
    [initialComments]
  );

  const count = commentsCount ?? comments.length;
  const avg =
    ratingAvg ??
    (comments.length
      ? comments.reduce((sum, c) => sum + (c.rating || 0), 0) / comments.length
      : null);

  const [showForm, setShowForm] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(commentSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      body: "",
      rating: 5,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsPending(true);
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...data,
          commentable_type: commentableType,
          commentable_id: commentableId,
        }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(json?.message || "خطا در ثبت نظر");
        return;
      }

      toast.success(
        "نظر شما ثبت شد و پس از تأیید نمایش داده می‌شود."
      );
      reset({
        first_name: "",
        last_name: "",
        phone: "",
        body: "",
        rating: 5,
      });
      setShowForm(false);
    } catch {
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className="w-full space-y-6" dir="rtl">
      <div className="w-full bg-white/40 border border-gray-300 rounded-lg p-5 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              {title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              {avg != null && !Number.isNaN(Number(avg)) ? (
                <div className="flex items-center gap-2">
                  <StarDisplay value={Number(avg)} size={18} />
                  <span className="font-medium text-primary">
                    {Number(avg).toFixed(1)}
                  </span>
                </div>
              ) : (
                <span>هنوز امتیازی ثبت نشده است</span>
              )}
              <span className="text-gray-400">|</span>
              <span>{count} نظر</span>
            </div>
          </div>

          <Button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="bg-primary hover:bg-primary/90 text-shelfish gap-2"
          >
            <MessageSquarePlus size={18} />
            {showForm ? "بستن فرم" : "ثبت نظر"}
          </Button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 pt-6 border-t border-gray-200 space-y-5"
          >
            <p className="text-sm text-gray-500">
              نظر شما پس از بررسی و تأیید در سایت نمایش داده می‌شود.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">نام</label>
                <Input
                  {...register("first_name")}
                  className="bg-white"
                  placeholder="نام"
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.first_name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  نام خانوادگی
                </label>
                <Input
                  {...register("last_name")}
                  className="bg-white"
                  placeholder="نام خانوادگی"
                />
                {errors.last_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                شماره موبایل
              </label>
              <Input
                {...register("phone")}
                className="bg-white"
                placeholder="09121234567"
                dir="ltr"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">امتیاز</label>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <StarPicker
                    value={field.value || 0}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.rating && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.rating.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">متن نظر</label>
              <Textarea
                {...register("body")}
                className="bg-white min-h-28"
                placeholder="تجربه خود را بنویسید..."
              />
              {errors.body && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.body.message}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                انصراف
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-primary hover:bg-primary/90 text-shelfish"
              >
                {isPending ? "در حال ثبت..." : "ارسال نظر"}
              </Button>
            </div>
          </form>
        )}
      </div>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="w-full bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
            هنوز نظری ثبت نشده است. اولین نفر باشید!
          </div>
        ) : (
          comments.map((comment) => (
            <article
              key={comment.id}
              className="w-full bg-white/50 border border-gray-300 rounded-lg p-5 transition-shadow hover:shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-11 h-11 rounded-full bg-beige/60 border border-beige flex items-center justify-center text-primary">
                  <UserRound size={22} />
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {comment.author_name ||
                          `${comment.first_name} ${comment.last_name}`}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {comment.created_at
                          ? dateConvert(comment.created_at)
                          : ""}
                      </p>
                    </div>
                    <StarDisplay value={comment.rating || 0} />
                  </div>
                  <p className="text-gray-700 leading-7 text-justify whitespace-pre-wrap">
                    {comment.body}
                  </p>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default CommentSection;
