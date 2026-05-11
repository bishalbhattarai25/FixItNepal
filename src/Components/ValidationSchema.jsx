import * as Yup from "yup";


const passwordRules = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;

export const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Workshop name is required"),

  emailAddress: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),

  passWord: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password is too long")
    .matches(passwordRules, { 
      message: "Password must contain at least one uppercase letter and one special character"})
    .required("Password is required"),

  logoId: Yup.string()
    .required("Workshop logo is required"),

  documentId: Yup.string()
    .required("Registration document is required"),

  address: Yup.object({
    tole: Yup.string().required("Tole/Street is required"),
    city: Yup.string().required("City is required"),
    province: Yup.string().required("Province is required"),
    country: Yup.string().required("Country is required"),
    postalCode: Yup.string().nullable(),
    locationCoordinatePoint: Yup.object({
    }),
  }),
});