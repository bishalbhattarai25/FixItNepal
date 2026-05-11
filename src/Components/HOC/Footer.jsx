import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Rocket, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-400">

      {/* CTA */}
      <div className="bg-gray-950 py-20 text-center px-6">
        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
          Ready to Get Started?
        </h2>
        <p className="mt-4 text-base text-gray-400 max-w-xl mx-auto">
          Join thousands of riders and mechanics already using Nepal's smartest moto rescue platform.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <button
            onClick={() => navigate("/register/user")}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-7 py-3 text-sm font-semibold rounded-xl transition shadow-sm"
          >
            <Rocket size={16} />
            Get Started
          </button>
          <button
            onClick={() => navigate("/register/mechanic")}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 text-sm font-semibold rounded-xl transition shadow-sm"
          >
            <UserPlus size={16} />
            Register as Mechanic
          </button>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-white text-lg font-black mb-4">
            FixIt<span className="text-red-500">Nepal</span>
          </h3>
          <p className="text-sm leading-relaxed">
            Nepal's first smart moto rescue and roadside assistance platform.
          </p>
        </div>

        {[
          { title: "About", links: ["Our Story", "Team", "Careers", "Press"] },
          { title: "Features", links: ["For Riders", "For Mechanics", "For Partners", "Pricing"] },
          { title: "Contact", links: ["Support", "Help Center", "Terms", "Privacy"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-widest">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link} className="text-sm hover:text-white cursor-pointer transition-colors">{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-6 px-6 flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto gap-4">
        <p className="text-xs">© 2024 FixIt Nepal. All rights reserved.</p>
        <div className="flex gap-3">
          {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
            <div key={i} className="w-9 h-9 bg-gray-800 hover:bg-gray-700 flex items-center justify-center rounded-full cursor-pointer transition text-sm">
              <Icon />
            </div>
          ))}
        </div>
      </div>

    </footer>
  );
};

export default Footer;
