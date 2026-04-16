import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Recycle, Globe, Leaf } from "lucide-react";

const AuthSwitcher = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-eco-green-50 via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {isLoginActive ? (
          <LoginForm onSwitchToSignup={() => setIsLoginActive(false)} />
        ) : (
          <SignupForm onSwitchToLogin={() => setIsLoginActive(true)} />
        )}
      </div>
    </main>
    </>
  );
};

const LoginForm = ({ onSwitchToSignup }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const next = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) next.email = "Email is required";
    else if (!emailRegex.test(formData.email)) next.email = "Enter a valid email";
    if (!formData.password) next.password = "Password is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log("Login submitted", formData);
      navigate("/");
    }, 800);
  };

  const handleGoogle = () => {
    console.log("Google login");
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-transparent dark:border-slate-700 transition-colors duration-300 dark:[&_h1]:text-white dark:[&_h2]:text-white dark:[&_h3]:text-white dark:[&_p]:text-slate-300 dark:[&_label]:text-slate-200 dark:[&_input]:bg-slate-800 dark:[&_input]:text-white dark:[&_input]:border-slate-700 dark:[&_input]:placeholder:text-slate-400 dark:[&_button]:text-slate-200 dark:[&_.divider-line]:bg-slate-700">
      <div className="w-full md:w-1/2 p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <Recycle className="w-8 h-8 text-eco-green-600" />
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">EcoRecycle</h1>
            <p className="text-sm text-gray-500 -mt-0.5">Recycle your e-waste responsibly</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-sm text-gray-600 mb-6">Log in to your account</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="login-email" className="block text-sm font-semibold text-gray-800 mb-2">
              Email Address
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 ${
                errors.email
                  ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  : "border-gray-200 focus:border-eco-green-500 focus:ring-4 focus:ring-eco-green-100"
              } focus:outline-none bg-white text-gray-900`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600 font-medium">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="login-password" className="block text-sm font-semibold text-gray-800 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.password
                    ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    : "border-gray-200 focus:border-eco-green-500 focus:ring-4 focus:ring-eco-green-100"
                } focus:outline-none bg-white text-gray-900 pr-12`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 rounded-md"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600 font-medium">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-eco-green-600 hover:bg-eco-green-700 text-white font-bold text-lg py-4 rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-eco-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Logging in...
              </span>
            ) : (
              "Log In"
            )}
          </button>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-200" />
            <span className="px-3 text-sm text-gray-500 font-medium">or</span>
            <div className="flex-grow h-px bg-gray-200" />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            className="w-full inline-flex items-center justify-center gap-3 border-2 border-gray-200 bg-white text-gray-700 py-3 rounded-lg hover:shadow-md hover:bg-gray-50"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M23.99 12.23c0-.78-.07-1.53-.21-2.26H12v4.28h6.62c-.29 1.5-1.17 2.77-2.5 3.63v3.02h4.04c2.36-2.17 3.73-5.38 3.73-8.67z" fill="#4285F4"/>
              <path d="M12 24c3.24 0 5.96-1.08 7.95-2.93l-4.04-3.02c-1.13.76-2.58 1.21-3.91 1.21-3 0-5.55-2.02-6.46-4.74H1.86v2.97C3.86 21.73 7.69 24 12 24z" fill="#34A853"/>
              <path d="M5.54 14.52c-.26-.77-.41-1.59-.41-2.52s.15-1.75.41-2.52V6.5H1.86A11.98 11.98 0 000 12c0 1.95.45 3.8 1.26 5.5l4.28-3z" fill="#FBBC05"/>
              <path d="M12 4.76c1.76 0 3.35.61 4.59 1.8l3.44-3.44C17.95 1.07 15.24 0 12 0 7.69 0 3.86 2.27 1.86 5.5l4.28 3.02C6.45 6.78 9 4.76 12 4.76z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToSignup}
            className="text-eco-green-600 font-semibold hover:text-eco-green-700 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>

      <aside className="hidden md:flex w-1/2 bg-gradient-to-br from-eco-green-50 to-eco-blue-50 dark:from-slate-800 dark:to-slate-700 items-center justify-center p-8 transition-colors duration-300">
        <div className="max-w-xs text-center">
          <Globe className="w-20 h-20 mx-auto mb-6 text-eco-green-600" />
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Welcome back</h3>
          <p className="text-gray-700 leading-relaxed">
            Continue your journey towards a greener planet.
          </p>
        </div>
      </aside>
    </div>
  );
};

const SignupForm = ({ onSwitchToLogin }) => {
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
    if (!formData.agreedToTerms) next.agreedToTerms = "You must agree to the terms";
    
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
    console.log("Google signup");
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-transparent dark:border-slate-700 transition-colors duration-300 dark:[&_h1]:text-white dark:[&_h2]:text-white dark:[&_h3]:text-white dark:[&_p]:text-slate-300 dark:[&_label]:text-slate-200 dark:[&_input]:bg-slate-800 dark:[&_input]:text-white dark:[&_input]:border-slate-700 dark:[&_input]:placeholder:text-slate-400 dark:[&_button]:text-slate-200 dark:[&_.divider-line]:bg-slate-700">
      <div className="w-full md:w-1/2 p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <Recycle className="w-8 h-8 text-eco-green-600" />
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">EcoRecycle</h1>
            <p className="text-sm text-gray-500 -mt-0.5">Recycle your e-waste responsibly</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
        <p className="text-sm text-gray-600 mb-6">Join the EcoRecycle community</p>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="signup-name" className="block text-sm font-semibold text-gray-800 mb-2">
              Full Name
            </label>
            <input
              id="signup-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 ${
                errors.name 
                  ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100" 
                  : "border-gray-200 focus:border-eco-green-500 focus:ring-4 focus:ring-eco-green-100"
              } focus:outline-none bg-white text-gray-900`}
              placeholder="John Doe"
            />
            {errors.name && <p className="mt-2 text-sm text-red-600 font-medium">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="signup-email" className="block text-sm font-semibold text-gray-800 mb-2">
              Email Address
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 ${
                errors.email 
                  ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100" 
                  : "border-gray-200 focus:border-eco-green-500 focus:ring-4 focus:ring-eco-green-100"
              } focus:outline-none bg-white text-gray-900`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-2 text-sm text-red-600 font-medium">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="signup-password" className="block text-sm font-semibold text-gray-800 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="signup-password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.password 
                    ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100" 
                    : "border-gray-200 focus:border-eco-green-500 focus:ring-4 focus:ring-eco-green-100"
                } focus:outline-none bg-white text-gray-900 pr-12`}
                placeholder="At least 6 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 rounded-md"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <p className="mt-2 text-sm text-red-600 font-medium">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="signup-confirmPassword" className="block text-sm font-semibold text-gray-800 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="signup-confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.confirmPassword 
                    ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100" 
                    : "border-gray-200 focus:border-eco-green-500 focus:ring-4 focus:ring-eco-green-100"
                } focus:outline-none bg-white text-gray-900 pr-12`}
                placeholder="Re-enter your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 rounded-md"
              >
                {showConfirmPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-2 text-sm text-red-600 font-medium">{errors.confirmPassword}</p>}
          </div>

          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-eco-green-600 border-gray-300 rounded focus:ring-2 focus:ring-eco-green-500"
              />
              <span className="text-sm text-gray-700">
                I agree to the{" "}
                <a href="#terms" className="text-eco-green-600 hover:text-eco-green-700 font-medium underline">
                  Terms & Conditions
                </a>
              </span>
            </label>
            {errors.agreedToTerms && <p className="mt-2 text-sm text-red-600 font-medium">{errors.agreedToTerms}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-eco-green-600 hover:bg-eco-green-700 text-white font-bold text-lg py-4 rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-eco-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Creating account...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-200" />
            <span className="px-3 text-sm text-gray-500 font-medium">or</span>
            <div className="flex-grow h-px bg-gray-200" />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            className="w-full inline-flex items-center justify-center gap-3 border-2 border-gray-200 bg-white text-gray-700 py-3 rounded-lg hover:shadow-md hover:bg-gray-50"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M23.99 12.23c0-.78-.07-1.53-.21-2.26H12v4.28h6.62c-.29 1.5-1.17 2.77-2.5 3.63v3.02h4.04c2.36-2.17 3.73-5.38 3.73-8.67z" fill="#4285F4"/>
              <path d="M12 24c3.24 0 5.96-1.08 7.95-2.93l-4.04-3.02c-1.13.76-2.58 1.21-3.91 1.21-3 0-5.55-2.02-6.46-4.74H1.86v2.97C3.86 21.73 7.69 24 12 24z" fill="#34A853"/>
              <path d="M5.54 14.52c-.26-.77-.41-1.59-.41-2.52s.15-1.75.41-2.52V6.5H1.86A11.98 11.98 0 000 12c0 1.95.45 3.8 1.26 5.5l4.28-3z" fill="#FBBC05"/>
              <path d="M12 4.76c1.76 0 3.35.61 4.59 1.8l3.44-3.44C17.95 1.07 15.24 0 12 0 7.69 0 3.86 2.27 1.86 5.5l4.28 3.02C6.45 6.78 9 4.76 12 4.76z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-eco-green-600 font-semibold hover:text-eco-green-700 hover:underline"
          >
            Log in
          </button>
        </p>
      </div>

      <aside className="hidden md:flex w-1/2 bg-gradient-to-br from-eco-green-50 to-eco-blue-50 items-center justify-center p-8">
        <div className="max-w-xs text-center">
          <Leaf className="w-20 h-20 mx-auto mb-6 text-eco-green-600" />
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Start your eco journey</h3>
          <p className="text-gray-700 leading-relaxed">
            Join our community and make a positive impact on the environment.
          </p>
        </div>
      </aside>
    </div>
  );
};

export default AuthSwitcher;