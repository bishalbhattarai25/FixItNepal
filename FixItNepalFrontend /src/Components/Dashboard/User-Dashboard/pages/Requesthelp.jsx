import React, { useState } from 'react';
import { MapPin, AlertTriangle, Zap, Car, Fuel, Send } from 'lucide-react';
export const Requesthelp = () => {

    const [problemType, setProblemType] = useState('Breakdown');
  const [emergencyMode, setEmergencyMode] = useState(false);

  const problemTypes = [
    { name: 'Breakdown', icon: AlertTriangle },
    { name: 'Puncture', icon: Zap },
    { name: 'Accident', icon: Car },
    { name: 'Out of Fuel', icon: Fuel },
  ];
  return (
    
        <div className="flex gap-6  bg-gray-50 font-sans">
      {/* Left Section: Form */}
      <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Request Help</h2>
        <p className="text-gray-600 mb-6">Submit your emergency request and get instant assistance</p>

        <h3 className="text-xl font-semibold text-gray-900 mb-4">Emergency Request Form</h3>

        {/* Location */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Location</label>
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-5 h-5 text-red-500" />
              <span className="font-medium">Thamel, Kathmandu (Auto-detected)</span>
            </div>
            <button className="text-red-500 font-semibold text-sm hover:text-red-600">Change</button>
          </div>
        </div>

        {/* Problem Type */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Problem Type</label>
          <div className="grid grid-cols-2 gap-3">
            {problemTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = problemType === type.name;
              return (
                <button
                  key={type.name}
                  onClick={() => setProblemType(type.name)}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-red-400 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-red-600' : 'text-gray-500'}`} />
                  <span className="font-medium text-gray-900">{type.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Notes (Optional)</label>
          <textarea
            rows="3"
            placeholder="Describe your situation..."
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-400 outline-none"
          />
        </div>

        {/* Emergency Mode Toggle */}
        <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg mb-6 border border-red-100">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <div>
              <p className="font-semibold text-gray-900">Emergency Mode</p>
              <p className="text-sm text-red-700">Priority response, higher charges apply</p>
            </div>
          </div>
          <button
            onClick={() => setEmergencyMode(!emergencyMode)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
              emergencyMode ? 'bg-red-500' : 'bg-gray-300'
            }`}
          >
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
              emergencyMode ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Submit Button */}
        <button className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors">
          <Send className="w-5 h-5" />
          SEND REQUEST
        </button>
      </div>

      {/* Right Section: Info Cards */}
      <div className="w-80 flex flex-col gap-6">
        {/* Response Time Card */}
        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-sm">
          <Zap className="w-8 h-8 mb-4" />
          <p className="text-lg font-medium">Average Response Time</p>
          <h1 className="text-6xl font-extrabold my-2">8 min</h1>
          <p className="text-sm opacity-90">Based on your location</p>
        </div>

        {/* How it Works Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-5">How It Works</h3>
          <div className="space-y-6">
            {[
              { step: '1', title: 'Submit Request', desc: 'Fill the form with your issue details' },
              { step: '2', title: 'Get Matched', desc: 'Nearest mechanic accepts your request' },
              { step: '3', title: 'Track Live', desc: "Monitor mechanic's arrival in real-time" },
              { step: '4', title: 'Get Fixed', desc: 'Service completed, pay securely' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">
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
      </div>
    </div>
  )
}
export default Requesthelp;
