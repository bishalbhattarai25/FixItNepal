import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import instance from "../Server/Axios";
import { validationSchema } from "./ValidationSchema";
import FileUploadField from "./Filehandler";

import { FiUpload } from "react-icons/fi";
import { GiMechanicGarage } from "react-icons/gi";
import { MdLocationPin } from "react-icons/md";
import { FaRegMap } from "react-icons/fa6";

const initialValues = {
  name: "",
  logoId: "",
  phoneNumber: "",
  emailAddress: "",
  passWord: "",
  documentId: "",
  address: {
    tole: "",
    city: "",
    province: "",
    country: "Nepal",
    postalCode: "",
    locationCoordinatePoint: { latitude: "", longitude: "" },
  },
};

export const MachineRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const payload = {
          name: values.name,
          phoneNumber: values.phoneNumber,
          logoId: values.logoId,
          emailAddress: values.emailAddress,
          passWord: values.passWord,
          address: {
            ...values.address,
            locationCoordinatePoint: {
              latitude: values.address.locationCoordinatePoint.latitude,
              longitude: values.address.locationCoordinatePoint.longitude,
            },
          },
          documentMediaFiles: [{ imageId: values.documentId }],
        };

        await instance.post("/api/mechanic", payload);
        alert("Registration Successful");
        navigate("/login");
      } catch (err) {
        alert(err.response?.data?.title || "Registration Failed");
      } finally {
        setLoading(false);
      }
    },
  });

  const inputStyle =
    "w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 flex justify-center items-center font-sans">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-4xl border border-white/50"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-r from-blue-600 to-red-400 rounded-2xl shadow-lg mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 to-red-400 bg-clip-text text-transparent">
              Register
            </span>
            <span className="text-gray-800"> Mechanic</span>
          </h2>
          <p className="text-gray-500 mt-2">Join as a professional Mechanic</p>
        </div>

        {/* File Upload Section - Now at the top */}
        <div className="mb-10 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-dashed border-blue-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-2xl text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <FiUpload />
            </svg>
            Required Documents
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <FileUploadField
                label="Upload Logo"
                type="Logo"
                fieldName="logoId"
                formik={formik}
              />
              <p className="text-xs text-gray-400 mt-2 ml-1">
                Upload your workshop logo (JPG, PNG)
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm">
              <FileUploadField
                label="Registration Document"
                type="Document"
                fieldName="documentId"
                formik={formik}
              />
              <p className="text-xs text-gray-400 mt-2 ml-1">
                Company registration certificate (PDF)
              </p>
            </div>
          </div>
        </div>

        {/* Business Information Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-2xl text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <GiMechanicGarage />
            </svg>
            Business Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <input
                placeholder="Workshop Name *"
                className={`${inputStyle} ${formik.touched.name && formik.errors.name ? "border-red-500 focus:ring-red-500" : ""}`}
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {formik.errors.name}
                </p>
              )}
            </div>

            <div>
              <input
                placeholder="Email Address *"
                type="email"
                className={`${inputStyle} ${formik.touched.emailAddress && formik.errors.emailAddress ? "border-red-500 focus:ring-red-500" : ""}`}
                {...formik.getFieldProps("emailAddress")}
              />
              {formik.touched.emailAddress && formik.errors.emailAddress && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {formik.errors.emailAddress}
                </p>
              )}
            </div>

            <div>
              <input
                placeholder="Phone Number *"
                className={`${inputStyle} ${formik.touched.phoneNumber && formik.errors.phoneNumber ? "border-red-500 focus:ring-red-500" : ""}`}
                {...formik.getFieldProps("phoneNumber")}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {formik.errors.phoneNumber}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password *"
                className={`${inputStyle} pr-12 ${formik.touched.passWord && formik.errors.passWord ? "border-red-500 focus:ring-red-500" : ""}`}
                {...formik.getFieldProps("passWord")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
              {formik.touched.passWord && formik.errors.passWord && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {formik.errors.passWord}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-2xl text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <MdLocationPin />
            </svg>
            Address Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              placeholder="Tole/Street *"
              className={`${inputStyle} ${formik.touched.address?.tole && formik.errors.address?.tole ? "border-red-500 focus:ring-red-500" : ""}`}
              {...formik.getFieldProps("address.tole")}
            />
            <input
              placeholder="City *"
              className={`${inputStyle} ${formik.touched.address?.city && formik.errors.address?.city ? "border-red-500 focus:ring-red-500" : ""}`}
              {...formik.getFieldProps("address.city")}
            />
            <input
              placeholder="Province *"
              className={`${inputStyle} ${formik.touched.address?.province && formik.errors.address?.province ? "border-red-500 focus:ring-red-500" : ""}`}
              {...formik.getFieldProps("address.province")}
            />
            <input
              placeholder="Postal Code"
              className={inputStyle}
              {...formik.getFieldProps("address.postalCode")}
            />
          </div>
        </div>

        {/* Location Coordinates Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-2xl text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <FaRegMap />
            </svg>
            Location Coordinates
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <input
                placeholder="Latitude (e.g., 27.7172)"
                className={`${inputStyle} ${formik.touched.address?.locationCoordinatePoint?.latitude && formik.errors.address?.locationCoordinatePoint?.latitude ? "border-red-500 focus:ring-red-500" : ""}`}
                {...formik.getFieldProps(
                  "address.locationCoordinatePoint.latitude",
                )}
              />
              <p className="text-xs text-gray-400 mt-1 ml-1">
                Example: 27.7172
              </p>
            </div>
            <div>
              <input
                placeholder="Longitude (e.g., 85.3240)"
                className={`${inputStyle} ${formik.touched.address?.locationCoordinatePoint?.longitude && formik.errors.address?.locationCoordinatePoint?.longitude ? "border-red-500 focus:ring-red-500" : ""}`}
                {...formik.getFieldProps(
                  "address.locationCoordinatePoint.longitude",
                )}
              />
              <p className="text-xs text-gray-400 mt-1 ml-1">
                Example: 85.3240
              </p>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="space-y-4">
          <button
            type="submit"
            disabled={loading || formik.isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Registering...</span>
              </div>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Register Service Center
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            )}
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-600">
            Already registered?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold hover:text-purple-600 transition-colors"
            >
              Sign in here
            </button>
          </p>
        </div>

        {/* Required Fields Note */}
        <p className="text-center text-xs text-gray-400 mt-4">
          * Required fields
        </p>
      </form>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};
