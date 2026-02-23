import React, { useState } from 'react';
import { Camera, Edit2, Mail, Phone, Lock, ShieldCheck, LogOut, Plus } from 'lucide-react';

const Profile = () => {
  // Mock data - in a real app, this would come from an API/Context
  const [vehicleData, setVehicleData] = useState({
    model: "Honda CB Hornet 160R",
    registration: "BA 12 PA 5678",
    year: "2021",
    color: "Red"
  });

  const contacts = [
    { name: "Sita Sharma", phone: "+977 9851234567" },
    { name: "Hari Thapa", phone: "+977 9861234567" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile & Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Profile & Status */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
          <div className="relative mb-4">
            <img 
              src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=150" 
              alt="Ram Sharma"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Ram Sharma</h2>
          <div className="text-gray-500 space-y-1 mt-1 text-sm">
            <p className="flex items-center justify-center gap-1.5"><Mail className="w-4 h-4" /> ram.sharma@email.com</p>
            <p className="flex items-center justify-center gap-1.5"><Phone className="w-4 h-4" /> +977 9841234567</p>
          </div>
          <button className="mt-4 text-red-500 font-semibold text-sm flex items-center gap-1.5 hover:text-red-600">
            <Camera className="w-4 h-4" /> Change Photo
          </button>

          <div className="w-full mt-8 border-t border-gray-100 pt-6 space-y-4 text-left">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Member since</span>
              <span className="font-semibold text-gray-900">Jan 2023</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Total services</span>
              <span className="font-semibold text-gray-900">47</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Account status</span>
              <span className="font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs">Active</span>
            </div>
          </div>
        </div>

        {/* Column 2: Vehicle Details */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Vehicle Details</h3>
          <div className="space-y-4">
            {[
              { label: 'Bike Model', key: 'model' },
              { label: 'Registration Number', key: 'registration' },
              { label: 'Year', key: 'year' },
              { label: 'Color', key: 'color' },
            ].map(field => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                <input
                  type="text"
                  value={vehicleData[field.key]}
                  onChange={(e) => setVehicleData({...vehicleData, [field.key]: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:border-red-400 outline-none"
                />
              </div>
            ))}
          </div>
          <button className="w-full mt-8 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors">
            Update Vehicle Info
          </button>
        </div>

        {/* Column 3: Emergency Contacts & Security */}
        <div className="flex flex-col gap-6">
          {/* Emergency Contacts */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Emergency Contacts</h3>
              <button className="text-red-500 hover:text-red-600">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {contacts.map((contact, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <p className="font-semibold text-gray-900">{contact.name}</p>
                    <p className="text-sm text-gray-500">{contact.phone}</p>
                  </div>
                  <button className="text-sm text-red-500 font-semibold hover:text-red-600">Edit</button>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 flex items-center justify-center gap-2 text-sm text-gray-600 border-2 border-dashed border-gray-200 py-3 rounded-xl hover:border-gray-300">
              <Plus className="w-4 h-4" /> Add Contact
            </button>
          </div>

          {/* Security */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Security</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50">
                <Lock className="w-5 h-5 text-gray-400" />
                <span className="font-medium">Change Password</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50">
                <ShieldCheck className="w-5 h-5 text-gray-400" />
                <span className="font-medium">Two-Factor Auth</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 bg-red-50 hover:bg-red-100">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;