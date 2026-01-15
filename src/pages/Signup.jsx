import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Recycle, Leaf } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const validate = () => {
    const next = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.name.trim()) next.name = "Full name is required";
    if (!formData.email.trim()) next.email = "Email is required";
    else if (!emailRegex.test(formData.email)) next.email = "Enter a valid email";
    if (!formData.password) next.password = "Password is required";
    else if (formData.password.length < 6) next.password = "Password must be at least 6 characters";
    if (!formData.confirmPassword) next.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) next.confirmPassword = "Passwords do not match";
    if (!formData.agreedToTerms) next.agreedToTerms = "You must agree to the terms and conditions";
    
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      console.log("Signup submitted", formData);
      navigate("/onboarding");
    }, 800);
  };

  const handleGoogle = () => {
    console.log("Google signup (placeholder)");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-eco-green-50 via-white to-white flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Recycle className="w-8 h-8 text-eco-green-600" role="img" aria-label="Recycle icon" />
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900">EcoRecycle</h1>
                <p className="text-sm text-gray-500 -mt-0.5">Recycle your e-waste responsibly</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
            <p className="text-sm text-gray-600 mb-6">Join the EcoRecycle community</p>

            <form onSubmit={handleSubmit} noValidate aria-label="Signup form">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  aria-required="true"
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    errors.name 
                      ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100" 
                      : "border-gray-200 focus:border-eco-green-500 focus:ring-4 focus:ring-eco-green-100"
                  } focus:outline-none bg-white text-gray-900 transition-all duration-200 placeholder:text-gray-400`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p id="name-error" role="alert" className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-required="true"
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    errors.email 
                      ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100" 
                      : "border-gray-200 focus:border-eco-green-500 focus:ring-4 focus:ring-eco-green-100"
                  } focus:outline-none bg-white text-gray-900 transition-all duration-200 placeholder:text-gray-400`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "password-error" : undefined}
                    aria-required="true"
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      errors.password 
                        ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100" 
                        : "border-gray-200 focus:border-eco-green-500 focus:ring-4 focus:ring-eco-green-100"
                    } focus:outline-none bg-white text-gray-900 transition-all duration-200 pr-12 placeholder:text-gray-400`}
                    placeholder="At least 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-green-400 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" role="alert" className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-800 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                    aria-required="true"
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      errors.confirmPassword 
                        ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100" 
                        : "border-gray-200 focus:border-eco-green-500 focus:ring-4 focus:ring-eco-green-100"
                    } focus:outline-none bg-white text-gray-900 transition-all duration-200 pr-12 placeholder:text-gray-400`}
                    placeholder="Re-enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((s) => !s)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    aria-pressed={showConfirmPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-green-400 transition-colors duration-200"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p id="confirmPassword-error" role="alert" className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreedToTerms"
                    checked={formData.agreedToTerms}
                    onChange={handleChange}
                    aria-invalid={!!errors.agreedToTerms}
                    aria-describedby={errors.agreedToTerms ? "terms-error" : undefined}
                    className="mt-1 w-4 h-4 text-eco-green-600 border-gray-300 rounded focus:ring-2 focus:ring-eco-green-500"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the{" "}
                    <a href="#terms" className="text-eco-green-600 hover:text-eco-green-700 font-medium underline">
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#privacy" className="text-eco-green-600 hover:text-eco-green-700 font-medium underline">
                      Privacy Policy
                    </a>
                  </span>
                </label>
                {errors.agreedToTerms && (
                  <p id="terms-error" role="alert" className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    {errors.agreedToTerms}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                aria-busy={loading}
                className="w-full bg-eco-green-600 hover:bg-eco-green-700 active:bg-eco-green-800 text-white font-bold text-lg py-4 rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-eco-green-300 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  "Sign Up"
                )}
              </button>

              <div className="flex items-center my-6" role="separator" aria-label="or">
                <div className="flex-grow h-px bg-gray-200" />
                <span className="px-3 text-sm text-gray-500 font-medium">or</span>
                <div className="flex-grow h-px bg-gray-200" />
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleGoogle}
                  aria-label="Sign up with Google"
                  className="w-full inline-flex items-center justify-center gap-3 border-2 border-gray-200 bg-white text-gray-700 py-3 rounded-lg hover:shadow-md hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] font-medium"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M23.99 12.23c0-.78-.07-1.53-.21-2.26H12v4.28h6.62c-.29 1.5-1.17 2.77-2.5 3.63v3.02h4.04c2.36-2.17 3.73-5.38 3.73-8.67z" fill="#4285F4"/>
                    <path d="M12 24c3.24 0 5.96-1.08 7.95-2.93l-4.04-3.02c-1.13.76-2.58 1.21-3.91 1.21-3 0-5.55-2.02-6.46-4.74H1.86v2.97C3.86 21.73 7.69 24 12 24z" fill="#34A853"/>
                    <path d="M5.54 14.52c-.26-.77-.41-1.59-.41-2.52s.15-1.75.41-2.52V6.5H1.86A11.98 11.98 0 000 12c0 1.95.45 3.8 1.26 5.5l4.28-3z" fill="#FBBC05"/>
                    <path d="M12 4.76c1.76 0 3.35.61 4.59 1.8l3.44-3.44C17.95 1.07 15.24 0 12 0 7.69 0 3.86 2.27 1.86 5.5l4.28 3.02C6.45 6.78 9 4.76 12 4.76z" fill="#EA4335"/>
                  </svg>
                  Sign up with Google
                </button>
              </div>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <a 
                href="/login" 
                className="text-eco-green-600 font-semibold hover:text-eco-green-700 transition-colors duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-eco-green-400 rounded px-1"
              >
                Log in
              </a>
            </p>
          </div>

          <aside className="hidden md:flex w-1/2 bg-gradient-to-br from-eco-green-50 to-eco-blue-50 items-center justify-center p-8" aria-label="Benefits of EcoRecycle">
            <div className="max-w-xs text-center">
              <Leaf className="w-20 h-20 mx-auto mb-6 text-eco-green-600" role="img" aria-label="Plant icon" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Start your eco journey</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Join our community and make a positive impact on the environment through responsible e-waste recycling.
              </p>
              <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <ul className="text-left text-gray-800 space-y-3 text-sm" role="list" aria-label="EcoRecycle features">
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <span className="text-eco-green-600 font-bold" aria-hidden="true">✓</span>
                    Free pickup service
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <span className="text-eco-green-600 font-bold" aria-hidden="true">✓</span>
                    Earn rewards for recycling
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <span className="text-eco-green-600 font-bold" aria-hidden="true">✓</span>
                    Track environmental impact
                  </li>
                  <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">
                    <span className="text-eco-green-600 font-bold" aria-hidden="true">✓</span>
                    Join a green community
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
    </>
  );
};

export default Signup;
