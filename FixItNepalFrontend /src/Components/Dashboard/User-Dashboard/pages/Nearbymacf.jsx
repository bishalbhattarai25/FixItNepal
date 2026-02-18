import React, { useState } from 'react';
import { Search, MapPin, Star, Clock, Filter, ChevronDown } from 'lucide-react';
import { Map } from '../../../HOC/Map';

const mechanicsData = [
  {
    id: 1,
    name: 'Bikash Auto Service',
    rating: 4.9,
    reviews: 256,
    distance: '1.2 km away',
    services: ['Breakdown', 'Puncture', 'Oil Change', 'Battery'],
    avgResponse: '6 min',
    status: 'OPEN',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100'
  },
  {
    id: 2,
    name: 'Suresh Moto Works',
    rating: 4.7,
    reviews: 189,
    distance: '2.8 km away',
    services: ['Accident Repair', 'Towing', 'Full Service'],
    avgResponse: '10 min',
    status: 'OPEN',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100'
  },
  {
    id: 3,
    name: 'Rapid Rescue Center',
    rating: 4.8,
    reviews: 312,
    distance: '3.5 km away',
    services: ['24/7 Emergency', 'All Services'],
    avgResponse: '6:00 AM',
    status: 'CLOSED',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100'
  },
];

const Nearbymecf = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Section: List and Filters */}
        <div className="xl:col-span-2">
          {/* Search and Filters Header */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-4 items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search mechanics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:border-red-400 outline-none"
              />
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              <span>Distance</span>
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50">
              <span>All Services</span>
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>
          </div>

          {/* Mechanics List */}
          <div className="space-y-6">
            {mechanicsData.map((mech) => (
              <div key={mech.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4">
                    <img src={mech.image} alt={mech.name} className="w-16 h-16 rounded-full object-cover" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{mech.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="font-semibold text-gray-800">{mech.rating}</span>
                          <span>({mech.reviews})</span>
                        </div>
                        <span className="text-gray-300">|</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{mech.distance}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    mech.status === 'OPEN' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {mech.status}
                  </span>
                </div>

                {/* Services Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {mech.services.map((service) => (
                    <span key={service} className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-md font-medium">
                      {service}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Avg. response: <span className="font-semibold text-gray-800">{mech.avgResponse}</span></span>
                  </div>
                  <button className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                    mech.status === 'OPEN'
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                  }`}>
                    {mech.status === 'OPEN' ? 'Request Service' : 'Currently Closed'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Map Placeholder */}
        <div className="xl:col-span-1">
          <div className="sticky top-6 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 h-[500px] ">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nearbymecf;