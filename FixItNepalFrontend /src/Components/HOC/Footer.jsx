import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Rocket, Download, UserPlus } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-gray-300">

      {/* ================= BIG CTA SECTION ================= */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 py-32 text-center">
        
        <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
          Get FIX-IT NEPAL
        </h2>

        <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
          Join thousands of riders and mechanics already using Nepal's
          smartest moto rescue platform
        </p>

        <div className="flex flex-wrap justify-center gap-8 mt-14">
          
          <button className="flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white px-10 py-5 text-lg font-semibold rounded-xl transition shadow-lg">
            <Rocket size={22} />
            Get Started
          </button>

          <button className="flex items-center gap-3 bg-gray-200 hover:bg-gray-300 text-gray-800 px-10 py-5 text-lg font-semibold rounded-xl transition shadow-lg">
            <Download size={22} />
            Download App
          </button>

          <button className="flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 text-lg font-semibold rounded-xl transition shadow-lg">
            <UserPlus size={22} />
            Register as Mechanic
          </button>

        </div>
      </div>

      {/* ================= BIG LINKS SECTION ================= */}
      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-4 gap-16">

        <div>
          <h3 className="text-white text-2xl font-bold mb-6">
            FIX-IT NEPAL
          </h3>
          <p className="text-base leading-relaxed">
            Nepal's first smart moto rescue and roadside assistance platform.
          </p>
        </div>

        <div>
          <h4 className="text-white text-lg font-semibold mb-6">About</h4>
          <ul className="space-y-3 text-base">
            <li className="hover:text-white cursor-pointer">Our Story</li>
            <li className="hover:text-white cursor-pointer">Team</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer">Press</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-lg font-semibold mb-6">Features</h4>
          <ul className="space-y-3 text-base">
            <li className="hover:text-white cursor-pointer">For Riders</li>
            <li className="hover:text-white cursor-pointer">For Mechanics</li>
            <li className="hover:text-white cursor-pointer">For Partners</li>
            <li className="hover:text-white cursor-pointer">Pricing</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-lg font-semibold mb-6">Contact</h4>
          <ul className="space-y-3 text-base">
            <li className="hover:text-white cursor-pointer">Support</li>
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Terms</li>
            <li className="hover:text-white cursor-pointer">Privacy</li>
          </ul>
        </div>

      </div>

      {/* ================= BIG BOTTOM BAR ================= */}
      <div className="border-t border-slate-700 py-10 px-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">

        <p className="text-base">
          © 2024 FIX-IT NEPAL. All rights reserved.
        </p>

        <div className="flex gap-6 mt-6 md:mt-0">
          <div className="w-14 h-14 bg-slate-700 hover:bg-slate-600 flex items-center justify-center rounded-full cursor-pointer transition text-lg">
            <FaFacebookF />
          </div>
          <div className="w-14 h-14 bg-slate-700 hover:bg-slate-600 flex items-center justify-center rounded-full cursor-pointer transition text-lg">
            <FaTwitter />
          </div>
          <div className="w-14 h-14 bg-slate-700 hover:bg-slate-600 flex items-center justify-center rounded-full cursor-pointer transition text-lg">
            <FaInstagram />
          </div>
          <div className="w-14 h-14 bg-slate-700 hover:bg-slate-600 flex items-center justify-center rounded-full cursor-pointer transition text-lg">
            <FaLinkedinIn />
          </div>
        </div>

      </div>

    </footer>
  );
};

export default Footer;
