import React, { useState } from "react";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import instance from "../../../../Server/Axios";
import { useNavigate } from "react-router-dom";
import { Calendar, Wrench, DollarSign, Clock, CheckCircle } from "lucide-react";
import { validationSchema } from "../../../HOC/Validation";
import{serviceTypes, vehicleTypes, timeSlots} from "../../../HOC/lib/Datalist"

export const Maintence = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const customerId = localStorage.getItem("userId");

  

  const formik = useFormik({
    initialValues: {
      customerId: customerId || "",
      serviceType: "",
      vehicleType: "",
      vehicleModel: "",
      serviceDate: "",
      serviceTime: "",
      problemDescription: "",
      preferredLocation: "",
      estimatedBudget: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const payload = {
          customerId: values.customerId,
          serviceType: values.serviceType,
          vehicleType: values.vehicleType,
          vehicleModel: values.vehicleModel,
          serviceDate: new Date(values.serviceDate).toISOString(),
          serviceTime: values.serviceTime,
          problemDescription: values.problemDescription,
          preferredLocation: values.preferredLocation,
          estimatedBudget: values.estimatedBudget ? parseFloat(values.estimatedBudget) : null,
        };

        await instance.post("/api/servicerequest", payload);

        toast.success("Maintenance request submitted successfully!", {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#10B981",
            color: "#fff",
            fontWeight: "bold",
          },
        });

        navigate("/userdashboard/servicehistory");
        formik.resetForm();
      } catch (err) {
        toast.error(err.response?.data?.title || "Failed to submit request");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  

  

  

  return (
    <div className="flex gap-6 bg-gray-50 font-sans min-h-screen p-6">
      <Toaster />

      {isSubmitting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3"></div>
            <p className="text-gray-700 font-medium">Submitting your request...</p>
          </div>
        </div>
      )}

      {/* Left Section: Form */}
      <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Schedule Maintenance</h2>
        <p className="text-gray-600 mb-6">
          Book a scheduled maintenance service for your vehicle
        </p>

        <form onSubmit={formik.handleSubmit}>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Maintenance Request Form
          </h3>

          {/* Service Type */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Service Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {serviceTypes.map((type) => (
                <button
                  type="button"
                  key={type.value}
                  onClick={() => formik.setFieldValue("serviceType", type.value)}
                  className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                    formik.values.serviceType === type.value
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
            {formik.touched.serviceType && formik.errors.serviceType && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.serviceType}</p>
            )}
          </div>

          {/* Vehicle Type & Model */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Vehicle Type
              </label>
              <select
                name="vehicleType"
                value={formik.values.vehicleType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-200 ${
                  formik.touched.vehicleType && formik.errors.vehicleType
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
              >
                <option value="">Select vehicle type</option>
                {vehicleTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {formik.touched.vehicleType && formik.errors.vehicleType && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.vehicleType}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Vehicle Model
              </label>
              <input
                type="text"
                name="vehicleModel"
                value={formik.values.vehicleModel}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="e.g., Toyota Camry 2020"
                className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-200 ${
                  formik.touched.vehicleModel && formik.errors.vehicleModel
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
              />
              {formik.touched.vehicleModel && formik.errors.vehicleModel && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.vehicleModel}</p>
              )}
            </div>
          </div>

          {/* Service Date & Time */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <Calendar className="inline w-4 h-4 mr-1" />
                Service Date
              </label>
              <input
                type="date"
                name="serviceDate"
                value={formik.values.serviceDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                min={new Date().toISOString().split("T")[0]}
                className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-200 ${
                  formik.touched.serviceDate && formik.errors.serviceDate
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
              />
              {formik.touched.serviceDate && formik.errors.serviceDate && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.serviceDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <Clock className="inline w-4 h-4 mr-1" />
                Service Time
              </label>
              <select
                name="serviceTime"
                value={formik.values.serviceTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-200 ${
                  formik.touched.serviceTime && formik.errors.serviceTime
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
              >
                <option value="">Select time slot</option>
                {timeSlots.map((slot) => (
                  <option key={slot.value} value={slot.value}>
                    {slot.label}
                  </option>
                ))}
              </select>
              {formik.touched.serviceTime && formik.errors.serviceTime && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.serviceTime}</p>
              )}
            </div>
          </div>

          {/* Problem Description */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              <Wrench className="inline w-4 h-4 mr-1" />
              Problem Description
            </label>
            <textarea
              name="problemDescription"
              rows="4"
              value={formik.values.problemDescription}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Describe the maintenance needed or any specific issues..."
              className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-200 ${
                formik.touched.problemDescription && formik.errors.problemDescription
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
            />
            {formik.touched.problemDescription && formik.errors.problemDescription && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.problemDescription}</p>
            )}
          </div>

          {/* Preferred Location */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Preferred Service Location
            </label>
            <input
              type="text"
              name="preferredLocation"
              value={formik.values.preferredLocation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="e.g., Kathmandu, Pokhara, or specific address"
              className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-200 ${
                formik.touched.preferredLocation && formik.errors.preferredLocation
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
            />
            {formik.touched.preferredLocation && formik.errors.preferredLocation && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.preferredLocation}</p>
            )}
          </div>

          {/* Estimated Budget */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              <DollarSign className="inline w-4 h-4 mr-1" />
              Estimated Budget (Optional)
            </label>
            <input
              type="number"
              name="estimatedBudget"
              value={formik.values.estimatedBudget}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your estimated budget"
              className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-200 ${
                formik.touched.estimatedBudget && formik.errors.estimatedBudget
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
            />
            {formik.touched.estimatedBudget && formik.errors.estimatedBudget && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.estimatedBudget}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            <CheckCircle className="w-5 h-5" />
            {isSubmitting ? "Submitting..." : "SCHEDULE SERVICE"}
          </button>
        </form>
      </div>

      {/* Right Section: Info Cards */}
      <div className="w-80 flex flex-col gap-6">
        {/* Why Schedule Card */}
        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-sm">
          <Wrench className="w-8 h-8 mb-4" />
          <p className="text-lg font-medium">Benefits of Scheduled Maintenance</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-200">•</span>
              <span>Prevent major breakdowns</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-200">•</span>
              <span>Extend vehicle lifespan</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-200">•</span>
              <span>Better fuel efficiency</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-200">•</span>
              <span>Maintain warranty coverage</span>
            </li>
          </ul>
        </div>

        {/* How it Works Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-5">
            How It Works
          </h3>
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Schedule Service",
                desc: "Fill the form with your maintenance needs",
              },
              {
                step: "2",
                title: "Get Matched",
                desc: "We find the best service center for you",
              },
              {
                step: "3",
                title: "Drop Off Vehicle",
                desc: "Bring your vehicle at scheduled time",
              },
              {
                step: "4",
                title: "Service Complete",
                desc: "Pick up your vehicle after service",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Interval Card */}
        <div className="bg-green-50 p-6 rounded-2xl shadow-sm border border-green-100">
          <h3 className="text-lg font-semibold text-green-900 mb-4">
            Recommended Maintenance Intervals
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-green-700">Oil Change</span>
              <span className="font-medium text-green-900">5,000 km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Tire Rotation</span>
              <span className="font-medium text-green-900">10,000 km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Brake Check</span>
              <span className="font-medium text-green-900">20,000 km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Full Service</span>
              <span className="font-medium text-green-900">50,000 km</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintence;
