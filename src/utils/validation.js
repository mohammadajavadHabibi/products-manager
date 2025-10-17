import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد")
    .max(20, "نام کاربری نمی‌تواند بیش از ۲۰ کاراکتر باشد")
    .required("نام کاربری الزامی است"),

  password: Yup.string()
    .min(4, "رمز عبور باید حداقل 4 کاراکتر باشد")
    .required("رمز عبور الزامی است"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "رمز عبور و تکرار آن یکسان نیستند")
    .required("تکرار رمز عبور الزامی است"),
});
