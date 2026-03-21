import React from 'react';
import { ShieldAlert, Loader2 } from 'lucide-react';

const EmergencyLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Ring */}
        <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
        
        {/* Spinning Border */}
        <Loader2 className="w-20 h-20 text-red-600 animate-spin" strokeWidth={1} />
        
        {/* Center Icon */}
        <div className="absolute flex items-center justify-center bg-red-600 rounded-full p-4 shadow-lg">
          <ShieldAlert className="w-8 h-8 text-white" />
        </div>
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase">
          Sending Emergency Signal
        </h3>
        <p className="text-gray-500 text-sm font-medium mt-1 animate-pulse">
          Locating nearest available technicians...
        </p>
      </div>

      {/* Progress bar effect */}
      <div className="mt-6 w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-red-600 animate-[loading_2s_ease-in-out_infinite]" 
             style={{ width: '30%' }}></div>
      </div>
      
      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
};

export default EmergencyLoader;