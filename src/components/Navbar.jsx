import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Recycle } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-stone-50 shadow-sm sticky top-0 z-50 border-b border-stone-200">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
            <Recycle className="w-7 h-7 text-emerald-600" />
            <h1 className="text-2xl font-bold text-emerald-700">EcoRecycle</h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-600 hover:text-emerald-700 font-medium transition">
              Home
            </Link>
            <Link to="/schedule-pickup" className="text-slate-600 hover:text-emerald-700 font-medium transition">
              Schedule Pickup
            </Link>
            <Link to="/rewards" className="text-slate-600 hover:text-emerald-700 font-medium transition">
              Rewards
            </Link>
            <Link to="#learn" className="text-slate-600 hover:text-emerald-700 font-medium transition">
              Learn
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              to="/login"
              className="text-emerald-700 hover:text-emerald-800 font-medium transition"
            >
              Login
            </Link>
            <Link 
              to="/signup"
              className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition shadow-sm"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
