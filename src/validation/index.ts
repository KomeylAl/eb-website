import * as yup from "yup";

import { assessmentSchema } from "./assessmentsValidations";

export const workshopParticipantSchema = yup.object().shape({
  name: yup.string().required("نام الزامی است"),
  name_en: yup.string().required("نام انگلیسی الزامی است"),
  phone: yup
    .string()
    .required("تلفن الزامی است")
    .max(15, "تلفن نمیتواند بیشتر از 15 رقم باشد"),
  national_code: yup
    .string()
    .required("کد ملی الزامی است")
    .min(10, "کد ملی حدقا باید 10 رقم باشد")
    .max(10, "کد ملی نمیتواند بیشتر از 10 رقم باشد."),
  gender: yup.string().required("جنسیت الزامی است"),
  approved: yup.boolean().nullable(),
});

export const commentSchema = yup.object().shape({
  first_name: yup
    .string()
    .required("نام الزامی است")
    .max(255, "نام نمی‌تواند بیشتر از ۲۵۵ کاراکتر باشد"),
  last_name: yup
    .string()
    .required("نام خانوادگی الزامی است")
    .max(255, "نام خانوادگی نمی‌تواند بیشتر از ۲۵۵ کاراکتر باشد"),
  phone: yup
    .string()
    .required("شماره موبایل الزامی است")
    .max(20, "شماره موبایل نمی‌تواند بیشتر از ۲۰ کاراکتر باشد")
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست (مثال: 09121234567)"),
  body: yup
    .string()
    .required("متن نظر الزامی است")
    .min(10, "متن نظر باید حداقل ۱۰ کاراکتر باشد"),
  rating: yup
    .number()
    .typeError("امتیاز الزامی است")
    .required("امتیاز الزامی است")
    .min(1, "حداقل امتیاز ۱ است")
    .max(5, "حداکثر امتیاز ۵ است"),
});

export { assessmentSchema };
