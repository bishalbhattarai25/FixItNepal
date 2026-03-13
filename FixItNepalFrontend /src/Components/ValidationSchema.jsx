import * as Yup from "yup";

export const validationSchema = Yup.object({

  name: Yup.string().required("Name is required"),

  emailAddress: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  phoneNumber: Yup.string().required("Phone required"),

  passWord: Yup.string()
    .min(1)
    .max(20)
    .required("Password required"),

  address: Yup.object({
    city: Yup.string().required("City required"),
    province: Yup.string().required("Province required"),
    country: Yup.string().required(),
  }),

  documentMediaFiles: Yup.array().of(
    Yup.object({
      imageId: Yup.string().nullable()
    })
  )

});