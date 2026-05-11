import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Calendar, Wrench, DollarSign, CheckCircle,
  MapPin, ChevronRight, Building2, User,
} from "lucide-react";
import instance from "../../../../Server/Axios";
import { validationSchema } from "../../../HOC/Validation";
import { serviceTypes, problemTypes, vehicleTypes } from "../../../HOC/lib/Datalist";

// ── Helpers ──────────────────────────────────────────────────────────────────

const inputCls = (touched, error) =>
  `w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-200 ${
    touched && error ? "border-red-500" : "border-gray-200"
  }`;

const FieldError = ({ touched, error }) =>
  touched && error ? <p className="text-red-500 text-sm mt-1">{error}</p> : null;

const buildPayload = (values, location, selectedSlot) => ({
  customerId: values.customerId,
  requestType: values.requestType,
  problemType: values.problemType,
  vehicleType: values.vehicleType,
  vehicleModel: values.vehicleModel,
  scheduledDate: new Date(`${values.scheduledDate}T${selectedSlot}:00`).toISOString(),
  problemDescription: values.problemDescription,
  estimatedBudget: values.estimatedBudget ? parseFloat(values.estimatedBudget) : 0,
  locationCoordinates: { latitude: location.latitude, longitude: location.longitude },
  radiusInKm:10,
});

// ── Step Indicator ────────────────────────────────────────────────────────────

const STEP_LABELS = ["Service Details", "Choose Provider", "Select Slot"];

const StepIndicator = ({ current }) => (
  <div className="flex items-center mb-6">
    {STEP_LABELS.map((label, i) => {
      const step = i + 1;
      const done = current > step;
      const active = current === step;
      return (
        <React.Fragment key={step}>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
              ${done ? "bg-green-500 text-white" : active ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"}`}>
              {done ? "✓" : step}
            </div>
            <span className={`text-sm font-medium ${active ? "text-blue-600" : "text-gray-400"}`}>{label}</span>
          </div>
          {i < STEP_LABELS.length - 1 && <ChevronRight className="w-4 h-4 text-gray-300 mx-2" />}
        </React.Fragment>
      );
    })}
  </div>
);

// ── Step 1: Service Details ───────────────────────────────────────────────────

const ServiceDetailsForm = ({ formik, locationStatus, location, onNext }) => {
  const { values, touched, errors, handleChange, handleBlur, setFieldValue } = formik;
  return (
    <div>
      {/* Request Type */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Request Type</label>
        <div className="grid grid-cols-2 gap-3">
          {serviceTypes.map((type) => (
            <button type="button" key={type.value}
              onClick={() => setFieldValue("requestType", type.value)}
              className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                values.requestType === type.value
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-gray-300 text-gray-700"
              }`}>
              {type.label}
            </button>
          ))}
        </div>
        <FieldError touched={touched.requestType} error={errors.requestType} />
      </div>

      {/* Problem Type */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Problem Type</label>
        <select name="problemType" value={values.problemType} onChange={handleChange} onBlur={handleBlur}
          className={inputCls(touched.problemType, errors.problemType)}>
          <option value="">Select problem type</option>
          {problemTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        <FieldError touched={touched.problemType} error={errors.problemType} />
      </div>

      {/* Vehicle Type & Model */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Vehicle Type</label>
          <select name="vehicleType" value={values.vehicleType} onChange={handleChange} onBlur={handleBlur}
            className={inputCls(touched.vehicleType, errors.vehicleType)}>
            <option value="">Select vehicle type</option>
            {vehicleTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          <FieldError touched={touched.vehicleType} error={errors.vehicleType} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Vehicle Model</label>
          <input type="text" name="vehicleModel" value={values.vehicleModel}
            onChange={handleChange} onBlur={handleBlur} placeholder="e.g., Honda CB350"
            className={inputCls(touched.vehicleModel, errors.vehicleModel)} />
          <FieldError touched={touched.vehicleModel} error={errors.vehicleModel} />
        </div>
      </div>

      {/* Scheduled Date */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          <Calendar className="inline w-4 h-4 mr-1" /> Service Date
        </label>
        <input type="date" name="scheduledDate" value={values.scheduledDate}
          onChange={handleChange} onBlur={handleBlur}
          min={new Date().toISOString().split("T")[0]}
          className={inputCls(touched.scheduledDate, errors.scheduledDate)} />
        <FieldError touched={touched.scheduledDate} error={errors.scheduledDate} />
      </div>

      {/* Problem Description */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          <Wrench className="inline w-4 h-4 mr-1" /> Problem Description
        </label>
        <textarea name="problemDescription" rows="3" value={values.problemDescription}
          onChange={handleChange} onBlur={handleBlur}
          placeholder="Describe the issue or maintenance needed..."
          className={inputCls(touched.problemDescription, errors.problemDescription)} />
        <FieldError touched={touched.problemDescription} error={errors.problemDescription} />
      </div>

      {/* Estimated Budget */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          <DollarSign className="inline w-4 h-4 mr-1" /> Estimated Budget (Optional)
        </label>
        <input type="number" name="estimatedBudget" value={values.estimatedBudget}
          onChange={handleChange} onBlur={handleBlur} placeholder="Enter your budget"
          className={inputCls(touched.estimatedBudget, errors.estimatedBudget)} />
        <FieldError touched={touched.estimatedBudget} error={errors.estimatedBudget} />
      </div>

      {/* GPS Status */}
      <div className="mb-5 p-3 rounded-lg border border-gray-200 flex items-center gap-2 text-sm">
        <MapPin className="w-4 h-4 text-gray-400" />
        <div className={`w-2.5 h-2.5 rounded-full ${
          locationStatus === "detecting" ? "bg-yellow-400 animate-pulse" :
          locationStatus === "detected"  ? "bg-green-500" : "bg-red-500"
        }`} />
        <span className={locationStatus === "denied" ? "text-red-600" : "text-gray-600"}>
          {locationStatus === "detecting" && "Detecting your location..."}
          {locationStatus === "detected"  && `Location detected: ${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`}
          {locationStatus === "denied"    && "Location access denied. Coordinates will default to 0."}
        </span>
      </div>

      <button type="button" onClick={onNext}
        className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
        Find Nearby Providers <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

// ── Step 2: Nearby Providers ──────────────────────────────────────────────────

const NearbyProviders = ({ providers, onSelect, onBack }) => {
  const { nearbyGarages = [], nearbyMechanics = [] } = providers;
  const all = [
    ...nearbyGarages.map((g) => ({ ...g, providerType: "Garage" })),
    ...nearbyMechanics.map((m) => ({ ...m, providerType: "Mechanic" })),
  ];

  if (all.length === 0)
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 mb-4">No nearby providers found in your area.</p>
        <button onClick={onBack} className="text-blue-500 underline text-sm">Go back</button>
      </div>
    );

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">{all.length} provider(s) found. Select one to continue.</p>
      <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
        {all.map((provider) => (
          <button key={provider.id} type="button" onClick={() => onSelect(provider)}
            className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center gap-4">
            {provider.logo?.accessUrl ? (
              <img src={provider.logo.accessUrl} alt={provider.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-200" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                {provider.providerType === "Garage"
                  ? <Building2 className="w-6 h-6 text-blue-500" />
                  : <User className="w-6 h-6 text-blue-500" />}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{provider.name}</p>
              <p className="text-sm text-gray-500">{provider.address?.city}, {provider.address?.tole}</p>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                provider.providerType === "Garage" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"
              }`}>
                {provider.providerType}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
          </button>
        ))}
      </div>
      <button type="button" onClick={onBack} className="mt-4 text-sm text-gray-500 underline">← Back</button>
    </div>
  );
};

// ── Step 3: Available Slots ───────────────────────────────────────────────────

const AvailableSlots = ({ provider, slots, selectedSlot, onSlotSelect, onSubmit, onBack, isSubmitting }) => (
  <div>
    <div className="flex items-center gap-3 mb-5 p-3 bg-blue-50 rounded-xl border border-blue-100">
      {provider.logo?.accessUrl ? (
        <img src={provider.logo.accessUrl} alt={provider.name} className="w-10 h-10 rounded-full object-cover" />
      ) : (
        <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
          <Building2 className="w-5 h-5 text-blue-600" />
        </div>
      )}
      <div>
        <p className="font-semibold text-gray-900">{provider.name}</p>
        <p className="text-sm text-gray-500">{provider.address?.city}</p>
      </div>
    </div>

    <p className="text-sm font-medium text-gray-700 mb-3">Select an available time slot:</p>

    {slots.length === 0 ? (
      <p className="text-gray-500 text-sm py-4 text-center">No available slots for this date.</p>
    ) : (
      <div className="grid grid-cols-3 gap-2 mb-6">
        {slots.map((slot) => (
          <button key={slot.time} type="button"
            disabled={!slot.isAvailable}
            onClick={() => slot.isAvailable && onSlotSelect(slot.time)}
            className={`p-2.5 rounded-lg border text-sm font-medium transition-all ${
              !slot.isAvailable
                ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                : selectedSlot === slot.time
                ? "border-blue-500 bg-blue-500 text-white"
                : "border-gray-200 hover:border-blue-300 text-gray-700"
            }`}>
            {slot.time}
          </button>
        ))}
      </div>
    )}

    <button type="button" onClick={onSubmit} disabled={!selectedSlot || isSubmitting}
      className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed">
      <CheckCircle className="w-5 h-5" />
      {isSubmitting ? "Submitting..." : "Confirm Booking"}
    </button>
    <button type="button" onClick={onBack} className="mt-3 w-full text-sm text-gray-500 underline">
      ← Back to providers
    </button>
  </div>
);

// ── Right Sidebar ─────────────────────────────────────────────────────────────

const InfoSidebar = () => {
  const steps = [
    { step: "1", title: "Fill Details",     desc: "Enter your vehicle and service info" },
    { step: "2", title: "Choose Provider",  desc: "Pick a nearby garage or mechanic" },
    { step: "3", title: "Select Slot",      desc: "Choose an available time slot" },
    { step: "4", title: "Service Complete", desc: "Get your vehicle serviced" },
  ];
  const intervals = [
    { label: "Oil Change",    value: "5,000 km" },
    { label: "Tire Rotation", value: "10,000 km" },
    { label: "Brake Check",   value: "20,000 km" },
    { label: "Full Service",  value: "50,000 km" },
  ];

  return (
    <div className="w-80 flex flex-col gap-6">
      <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-sm">
        <Wrench className="w-8 h-8 mb-4" />
        <p className="text-lg font-medium">Benefits of Scheduled Maintenance</p>
        <ul className="mt-4 space-y-2 text-sm">
          {["Prevent major breakdowns", "Extend vehicle lifespan", "Better fuel efficiency", "Maintain warranty coverage"].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-blue-200">•</span><span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-5">How It Works</h3>
        <div className="space-y-5">
          {steps.map(({ step, title, desc }) => (
            <div key={step} className="flex gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">{step}</div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{title}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-2xl shadow-sm border border-green-100">
        <h3 className="text-lg font-semibold text-green-900 mb-4">Recommended Intervals</h3>
        <div className="space-y-3 text-sm">
          {intervals.map(({ label, value }) => (
            <div key={label} className="flex justify-between">
              <span className="text-green-700">{label}</span>
              <span className="font-medium text-green-900">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────

const STEP_TITLES = {
  1: { title: "Schedule Maintenance", sub: "Fill in your vehicle and service details" },
  2: { title: "Choose a Provider",    sub: "Select a nearby garage or mechanic" },
  3: { title: "Select a Time Slot",   sub: "Choose an available slot for your date" },
};

export const Maintence = () => {
  const navigate = useNavigate();

  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [locationStatus, setLocationStatus] = useState("detecting");
  const [step, setStep] = useState(1);
  const [providers, setProviders] = useState({});
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-detect GPS on mount
  useEffect(() => {
    if (!navigator.geolocation) { setLocationStatus("denied"); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        setLocationStatus("detected");
      },
      () => setLocationStatus("denied")
    );
  }, []);

  const formik = useFormik({
    initialValues: {
      customerId: localStorage.getItem("userId") || "",
      requestType: "Scheduled",
      problemType: "",
      vehicleType: "",
      vehicleModel: "",
      scheduledDate: "",
      problemDescription: "",
      estimatedBudget: "",
    },
    validationSchema,
    onSubmit: () => {},
  });

  // Step 1 → 2: validate then fetch nearby providers
  const handleFindProviders = async () => {
    const errors = await formik.validateForm();
    formik.setTouched(Object.keys(formik.values).reduce((acc, k) => ({ ...acc, [k]: true }), {}));
    if (Object.keys(errors).length > 0) return;

    setIsLoading(true);
    try {
      const { data } = await instance.post("/nearby-services", {
        latitude: location.latitude,
        longitude: location.longitude,
      }, { params: { radiusInKm: 10 } });
      setProviders(data);
      setStep(2);
    } catch {
      toast.error("Failed to fetch nearby providers.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2 → 3: fetch available slots
  const handleSelectProvider = async (provider) => {
    setSelectedProvider(provider);
    setIsLoading(true);
    try {
      const { data } = await instance.get(`/availableslots/${provider.id}`, {
        params: { date: new Date(`${formik.values.scheduledDate}T00:00:00`).toISOString() },
      });
      setSlots(data);
      setStep(3);
    } catch {
      toast.error("Failed to fetch available slots.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: submit booking
  const handleSubmit = async () => {
    if (!selectedSlot) return;
    setIsSubmitting(true);
    try {
      await instance.post("/api/servicerequest", buildPayload(formik.values, location, selectedSlot));
      toast.success("Booking confirmed!", {
        duration: 3000, position: "top-center",
        style: { background: "#10B981", color: "#fff", fontWeight: "bold" },
      });
      navigate("/userdashboard/servicehistory");
    } catch (err) {
      toast.error(err.response?.data?.title || "Failed to submit booking.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex gap-6 bg-gray-50 font-sans min-h-screen p-6">
      <Toaster />

      {isLoading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3" />
            <p className="text-gray-700 font-medium">
              {step === 1 ? "Finding nearby providers..." : "Loading available slots..."}
            </p>
          </div>
        </div>
      )}

      <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">{STEP_TITLES[step].title}</h2>
        <p className="text-gray-500 mb-5">{STEP_TITLES[step].sub}</p>

        <StepIndicator current={step} />

        {step === 1 && (
          <ServiceDetailsForm
            formik={formik}
            locationStatus={locationStatus}
            location={location}
            onNext={handleFindProviders}
          />
        )}
        {step === 2 && (
          <NearbyProviders
            providers={providers}
            onSelect={handleSelectProvider}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <AvailableSlots
            provider={selectedProvider}
            slots={slots}
            selectedSlot={selectedSlot}
            onSlotSelect={setSelectedSlot}
            onSubmit={handleSubmit}
            onBack={() => setStep(2)}
            isSubmitting={isSubmitting}
          />
        )}
      </div>

      <InfoSidebar />
    </div>
  );
};

export default Maintence;
