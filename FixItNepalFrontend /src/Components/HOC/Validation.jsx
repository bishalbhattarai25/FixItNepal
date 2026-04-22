
import * as Yup from "yup";

export const validationSchema = Yup.object({
    serviceType: Yup.string()
      .required("Service type is required"),
    vehicleType: Yup.string()
      .required("Vehicle type is required"),
    vehicleModel: Yup.string()
      .required("Vehicle model is required"),
    serviceDate: Yup.date()
      .min(new Date(), "Service date cannot be in the past")
      .required("Service date is required"),
    serviceTime: Yup.string()
      .required("Service time is required"),
    problemDescription: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .required("Problem description is required"),
    preferredLocation: Yup.string()
      .required("Preferred location is required"),
    estimatedBudget: Yup.number()
      .positive("Budget must be positive")
      .nullable(),
  });