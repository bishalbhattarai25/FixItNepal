import * as Yup from "yup";

export const validationSchema = Yup.object({
  requestType: Yup.string().required("Request type is required"),
  problemType: Yup.string().required("Problem type is required"),
  vehicleType: Yup.string().required("Vehicle type is required"),
  vehicleModel: Yup.string().required("Vehicle model is required"),
  scheduledDate: Yup.date()
    .min(new Date(), "Date cannot be in the past")
    .required("Scheduled date is required"),
  problemDescription: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .required("Problem description is required"),
  estimatedBudget: Yup.number().positive("Budget must be positive").nullable(),
});
