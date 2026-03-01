import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Recycle, Truck, Trophy, Globe } from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState("forward");

  const onboardingSteps = [
    {
      id: 0,
      icon: "Recycle",
      title: "Welcome to EcoRecycle",
      subtitle: "Recycle e-waste responsibly and protect the planet",
      description: "Join thousands of eco-conscious individuals making a real difference in reducing electronic waste and building a sustainable future.",
      buttonText: "Get Started"
    },
    {
      id: 1,
      icon: "Truck",
      title: "Free Doorstep Pickup",
      subtitle: "Convenient and hassle-free",
      description: "Schedule a pickup at your convenience. Our trained professionals will collect your e-waste right from your doorstep—completely free of charge.",
      buttonText: "Next"
    },
    {
      id: 2,
      icon: "Trophy",
      title: "Climb the Leaderboard",
      subtitle: "Get rewarded for doing good",
      description: "Earn points for every item you recycle. Compete with others on the leaderboard and become a top eco-warrior in your community.",
      buttonText: "Next"
    },
    {
      id: 3,
      icon: "Globe",
      title: "Track Your Environmental Impact",
      subtitle: "See the difference you're making",
      description: "Monitor your contribution to the planet. Track the amount of e-waste recycled, CO₂ emissions saved, and resources conserved.",
      buttonText: "Start Recycling"
    }
  ];

  // Helper function to render icon components
  const renderIcon = (iconName, className) => {
    const icons = {
      Recycle: <Recycle className={className} />,
      Truck: <Truck className={className} />,
      Trophy: <Trophy className={className} />,
      Globe: <Globe className={className} />
    };
    return icons[iconName] || null;
  };

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setDirection("forward");
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/");
    }
  };

  const handleBack = () => {
    setDirection("backward");
    setCurrentStep(currentStep - 1);
  };

  const handleSkip = () => {
    navigate("/");
  };

  const handleDotClick = (index) => {
    setDirection(index > currentStep ? "forward" : "backward");
    setCurrentStep(index);
  };

  const currentData = onboardingSteps[currentStep];

  return (
    <main className="min-h-screen bg-gradient-to-b from-eco-green-50 via-white to-eco-blue-50 flex items-center justify-center p-4 md:p-6 overflow-hidden">
      <div className="w-full max-w-2xl">
        {currentStep < onboardingSteps.length - 1 && (
          <div className="flex justify-end mb-4 animate-fadeIn">
            <button
              onClick={handleSkip}
              aria-label="Skip onboarding"
              className="text-sm text-gray-500 hover:text-gray-700 font-medium transition-all duration-200 px-5 py-2 rounded-lg hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-white"
            >
              Skip onboarding →
            </button>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 transition-all duration-500">
          <div className="text-center mb-8">
            <div
              key={`icon-${currentStep}`}
              className={`inline-block mb-6 transition-all duration-700 ${direction === "forward" ? "animate-slideInRight" : "animate-slideInLeft"
                }`}
            >
              {renderIcon(currentData.icon, 'w-24 h-24 text-eco-green-600')}
            </div>
          </div>

          <div
            key={`content-${currentStep}`}
            className={`text-center mb-10 transition-all duration-500 ${direction === "forward" ? "animate-fadeSlideUp" : "animate-fadeSlideDown"
              }`}
          >
            {currentStep === 0 && (
              <div className="flex items-center justify-center gap-3 mb-6 animate-fadeIn">
                <Recycle className="w-10 h-10 text-eco-green-600" role="img" aria-label="Recycle icon" />
                <h1 className="text-3xl font-extrabold text-gray-900">EcoRecycle</h1>
              </div>
            )}

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {currentData.title}
            </h2>
            <p className="text-lg md:text-xl text-eco-green-600 font-semibold mb-4">
              {currentData.subtitle}
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-xl mx-auto">
              {currentData.description}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-8" role="group" aria-label="Onboarding progress">
            {onboardingSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to step ${index + 1}`}
                aria-current={index === currentStep ? "step" : undefined}
                className={`transition-all duration-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-500 ${index === currentStep
                    ? "w-12 h-3 bg-eco-green-600 shadow-lg scale-110"
                    : index < currentStep
                      ? "w-3 h-3 bg-eco-green-500 hover:bg-eco-green-600 hover:scale-125 shadow-md"
                      : "w-3 h-3 bg-gray-300 hover:bg-gray-400 hover:scale-110"
                  }`}
              />
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleNext}
              aria-label={currentData.buttonText}
              className="w-full bg-eco-green-600 hover:bg-eco-green-700 active:bg-eco-green-800 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-eco-green-300 transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.97] hover:-translate-y-0.5"
            >
              {currentData.buttonText}
            </button>

            {currentStep > 0 && (
              <button
                onClick={handleBack}
                aria-label="Go back to previous step"
                className="w-full bg-transparent border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600 hover:text-gray-800 font-medium py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400"
              >
                Back
              </button>
            )}
          </div>
        </div>

        <div className="text-center mt-6 animate-fadeIn">
          <p className="text-sm text-gray-500 font-medium" aria-live="polite">
            Step {currentStep + 1} of {onboardingSteps.length}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeSlideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-fadeSlideUp {
          animation: fadeSlideUp 0.6s ease-out;
        }
        .animate-fadeSlideDown {
          animation: fadeSlideDown 0.6s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.7s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.7s ease-out;
        }
      `}</style>
    </main>
  );
};

export default Onboarding;
