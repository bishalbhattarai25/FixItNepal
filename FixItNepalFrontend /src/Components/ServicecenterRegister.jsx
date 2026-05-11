import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Eye, EyeOff, ChevronLeft, Building2, MapPin, FileText, User } from "lucide-react";
import instance from "../Server/Axios";
import { validationSchema } from "./ValidationSchema";
import FileUploadField from "./Filehandler";

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

const inputBase = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all";
const inputError = "border-red-400 focus:border-red-400 focus:ring-red-100";

const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">{label}</label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const SectionTitle = ({ icon: Icon, title, color = "text-blue-500", bg = "bg-blue-50" }) => (
  <div className="flex items-center gap-2 mb-5">
    <div className={`w-7 h-7 ${bg} rounded-lg flex items-center justify-center`}>
      <Icon className={`w-3.5 h-3.5 ${color}`} />
    </div>
    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest">{title}</h3>
  </div>
);

export const ServiceCenterRegister = () => {
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
              latitude: parseFloat(values.address.locationCoordinatePoint.latitude),
              longitude: parseFloat(values.address.locationCoordinatePoint.longitude),
            },
          },
          documentMediaFiles: [{ imageId: values.documentId }],
        };
        await instance.post("/api/garage", payload);
        alert("Registration Successful");
        navigate("/login");
      } catch (err) {
        alert(err.response?.data?.title || "Registration Failed");
      } finally {
        setLoading(false);
      }
    },
  });

  const f = formik;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">

        <button onClick={() => navigate("/register")} className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-6 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

          {/* Header */}
          <div className="mb-8 pb-6 border-b border-gray-100">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
              <Building2 className="w-5 h-5 text-orange-500" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Register Service Center</h1>
            <p className="text-gray-400 text-sm mt-1">List your workshop and start receiving service requests</p>
          </div>

          <form onSubmit={f.handleSubmit} className="space-y-8">

            {/* Documents */}
            <div>
              <SectionTitle icon={FileText} title="Required Documents" color="text-orange-500" bg="bg-orange-50" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                  <FileUploadField label="Workshop Logo" type="Logo" fieldName="logoId" formik={f} />
                  <p className="text-xs text-gray-400 mt-2">JPG or PNG format</p>
                </div>
                <div className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                  <FileUploadField label="Registration Certificate" type="Document" fieldName="documentId" formik={f} />
                  <p className="text-xs text-gray-400 mt-2">Company registration (PDF)</p>
                </div>
              </div>
            </div>

            {/* Business Info */}
            <div>
              <SectionTitle icon={User} title="Business Information" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Workshop Name" error={f.touched.name && f.errors.name}>
                  <input placeholder="e.g. Sharma Auto Works" className={`${inputBase} ${f.touched.name && f.errors.name ? inputError : ""}`} {...f.getFieldProps("name")} />
                </Field>
                <Field label="Email Address" error={f.touched.emailAddress && f.errors.emailAddress}>
                  <input type="email" placeholder="workshop@example.com" className={`${inputBase} ${f.touched.emailAddress && f.errors.emailAddress ? inputError : ""}`} {...f.getFieldProps("emailAddress")} />
                </Field>
                <Field label="Phone Number" error={f.touched.phoneNumber && f.errors.phoneNumber}>
                  <input placeholder="98XXXXXXXX" className={`${inputBase} ${f.touched.phoneNumber && f.errors.phoneNumber ? inputError : ""}`} {...f.getFieldProps("phoneNumber")} />
                </Field>
                <Field label="Password" error={f.touched.passWord && f.errors.passWord}>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`${inputBase} pr-10 ${f.touched.passWord && f.errors.passWord ? inputError : ""}`}
                      {...f.getFieldProps("passWord")}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </Field>
              </div>
            </div>

            {/* Address */}
            <div>
              <SectionTitle icon={MapPin} title="Address" color="text-red-500" bg="bg-red-50" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Tole / Street" error={f.touched.address?.tole && f.errors.address?.tole}>
                  <input placeholder="Tole or street name" className={`${inputBase} ${f.touched.address?.tole && f.errors.address?.tole ? inputError : ""}`} {...f.getFieldProps("address.tole")} />
                </Field>
                <Field label="City" error={f.touched.address?.city && f.errors.address?.city}>
                  <input placeholder="Kathmandu" className={`${inputBase} ${f.touched.address?.city && f.errors.address?.city ? inputError : ""}`} {...f.getFieldProps("address.city")} />
                </Field>
                <Field label="Province" error={f.touched.address?.province && f.errors.address?.province}>
                  <input placeholder="Bagmati" className={`${inputBase} ${f.touched.address?.province && f.errors.address?.province ? inputError : ""}`} {...f.getFieldProps("address.province")} />
                </Field>
                <Field label="Postal Code">
                  <input placeholder="44600" className={inputBase} {...f.getFieldProps("address.postalCode")} />
                </Field>
              </div>
            </div>

            {/* Coordinates */}
            <div>
              <SectionTitle icon={MapPin} title="Location Coordinates" color="text-green-500" bg="bg-green-50" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Latitude" error={f.touched.address?.locationCoordinatePoint?.latitude && f.errors.address?.locationCoordinatePoint?.latitude}>
                  <input placeholder="e.g. 27.7172" className={`${inputBase} ${f.touched.address?.locationCoordinatePoint?.latitude && f.errors.address?.locationCoordinatePoint?.latitude ? inputError : ""}`} {...f.getFieldProps("address.locationCoordinatePoint.latitude")} />
                </Field>
                <Field label="Longitude" error={f.touched.address?.locationCoordinatePoint?.longitude && f.errors.address?.locationCoordinatePoint?.longitude}>
                  <input placeholder="e.g. 85.3240" className={`${inputBase} ${f.touched.address?.locationCoordinatePoint?.longitude && f.errors.address?.locationCoordinatePoint?.longitude ? inputError : ""}`} {...f.getFieldProps("address.locationCoordinatePoint.longitude")} />
                </Field>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || f.isSubmitting}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white py-3 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Register Service Center"}
            </button>

            <p className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <button type="button" onClick={() => navigate("/login")} className="text-orange-500 font-semibold hover:underline underline-offset-2">
                Log in
              </button>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};
