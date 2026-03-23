import React, { useState, useRef, useEffect } from "react";
import { ShieldCheck, RefreshCw, ArrowRight } from "lucide-react";

const OTPVerification = ({ length = 6, onVerify, onResend, email = "user@example.com" }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);

  // Handle Countdown Timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto-focus next input
    if (element.value !== "" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Backspace logic: Focus previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const otpValue = otp.join("");
    if (otpValue.length === length) {
      onVerify(otpValue);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center">
      {/* Icon & Title */}
      <div className="mb-6">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldCheck size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Verify your email</h2>
        <p className="text-gray-500 mt-2 text-sm">
          We've sent a code to <span className="font-semibold text-gray-700">{email}</span>
        </p>
      </div>

      {/* OTP Inputs */}
      <div className="flex justify-center gap-2 mb-8">
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            ref={(el) => (inputRefs.current[index] = el)}
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-14 text-2xl font-bold text-center border-2 rounded-xl focus:border-blue-600 focus:ring-0 outline-none transition-all bg-gray-50"
          />
        ))}
      </div>

      {/* Verify Button */}
      <button
        onClick={handleVerify}
        disabled={otp.includes("")}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center group"
      >
        Verify Account
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Resend Logic */}
      <div className="mt-8">
        {timer > 0 ? (
          <p className="text-sm text-gray-400">
            Resend code in <span className="font-bold text-gray-600">{timer}s</span>
          </p>
        ) : (
          <button
            onClick={() => { setTimer(30); onResend(); }}
            className="text-blue-600 font-bold text-sm hover:underline flex items-center justify-center mx-auto"
          >
            <RefreshCw size={14} className="mr-2" /> Resend Code
          </button>
        )}
      </div>
    </div>
  );
};

export default OTPVerification;