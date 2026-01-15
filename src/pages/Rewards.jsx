import React, { useState } from "react";
import { Gift, Recycle, Users, Trophy } from "lucide-react";
import Navbar from "../components/Navbar";

const Rewards = () => {
  const rewardsData = [
    {
      id: 1,
      title: "10% Off Next Pickup",
      description: "Get 10% discount on your next e-waste pickup service",
      image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&h=300&fit=crop",
      couponCode: "ECO10OFF"
    },
    {
      id: 2,
      title: "Free Pickup Service",
      description: "One free pickup service for any e-waste item",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop",
      couponCode: "FREEPICK"
    },
    {
      id: 3,
      title: "₹500 Store Voucher",
      description: "Use this voucher at any partnered electronics store",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      couponCode: "SAVE500"
    },
    {
      id: 4,
      title: "Premium Membership",
      description: "Unlock 1 month of premium features and benefits",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop",
      couponCode: "PREMIUM30"
    },
    {
      id: 5,
      title: "Plant a Tree",
      description: "We'll plant a tree in your name for every 5 items recycled",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop",
      couponCode: "TREE5X"
    },
    {
      id: 6,
      title: "20% Electronics Discount",
      description: "Get 20% off on refurbished electronics from our partners",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
      couponCode: "REFURB20"
    }
  ];

  const [scratchedCards, setScratchedCards] = useState({});
  const [copiedCode, setCopiedCode] = useState(null);

  const handleScratch = (id) => {
    setScratchedCards(prev => ({
      ...prev,
      [id]: true
    }));
  };

  const handleCopyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
            Your Rewards
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Scratch the cards below to reveal exclusive rewards and discounts for being an eco-conscious citizen!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rewardsData.map((reward) => (
            <div
              key={reward.id}
              className="relative bg-stone-50 rounded-3xl shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-stone-200"
            >
              {!scratchedCards[reward.id] ? (
                <div
                  onClick={() => handleScratch(reward.id)}
                  className="relative h-96 cursor-pointer group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600 flex flex-col items-center justify-center p-6">
                    <div className="text-white text-center">
                      <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Gift className="w-20 h-20 mx-auto" />
                      </div>
                      <h3 className="text-3xl font-bold mb-3">Mystery Reward</h3>
                      <p className="text-sm opacity-90 mb-8">Click to scratch and reveal</p>
                      <div className="inline-block bg-white bg-opacity-20 backdrop-blur-sm px-8 py-4 rounded-xl border-2 border-white border-dashed group-hover:bg-opacity-30 transition-all">
                        <span className="text-white font-bold text-lg">TAP TO REVEAL</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 opacity-0 group-hover:opacity-15 transition-opacity duration-300"></div>
                </div>
              ) : (
                <div className="h-96 flex flex-col group">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={reward.image}
                      alt={reward.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                        {reward.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col bg-stone-50">
                    <p className="text-sm text-slate-700 mb-4 flex-1 leading-relaxed">
                      {reward.description}
                    </p>
                    {reward.couponCode && (
                      <div className="space-y-3">
                        <div className="bg-emerald-50 border-2 border-emerald-200 border-dashed rounded-xl p-4 text-center">
                          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Coupon Code</p>
                          <p className="text-2xl font-black text-emerald-700 tracking-widest font-mono">
                            {reward.couponCode}
                          </p>
                        </div>
                        <button
                          onClick={() => handleCopyCoupon(reward.couponCode)}
                          className={`w-full py-3 px-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 ${
                            copiedCode === reward.couponCode
                              ? "bg-emerald-600 text-white shadow-sm"
                              : "bg-stone-200 text-slate-800 hover:bg-emerald-600 hover:text-white hover:shadow-sm"
                          }`}
                        >
                          {copiedCode === reward.couponCode ? "✓ Copied to Clipboard!" : "Copy Code"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-stone-50 rounded-2xl shadow-sm p-8 text-center border border-stone-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            How to Earn More Rewards?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="p-4">
              <div className="mb-3 flex justify-center">
                <Recycle className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Recycle More</h3>
              <p className="text-sm text-slate-600">
                Every item you recycle earns you points toward new rewards
              </p>
            </div>
            <div className="p-4">
              <div className="mb-3 flex justify-center">
                <Users className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Refer Friends</h3>
              <p className="text-sm text-slate-600">
                Invite friends and earn bonus rewards when they recycle
              </p>
            </div>
            <div className="p-4">
              <div className="mb-3 flex justify-center">
                <Trophy className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Complete Challenges</h3>
              <p className="text-sm text-slate-600">
                Participate in monthly challenges for exclusive rewards
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Rewards;
