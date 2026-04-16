import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, Recycle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://localhost:5000/leaderboard");
        if (!response.ok) throw new Error("Failed to fetch leaderboard data");
        const data = await response.json();
        console.log("LEADERBOARD RESPONSE MAP:", data);
        setLeaderboardData(data);
      } catch (err) {
        console.error("Error fetching leaderboard map:", err);
        setError("Unable to load leaderboard. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 1: return <Medal className="w-6 h-6 text-gray-400" />;
      case 2: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <span className="font-bold text-gray-500 w-6 text-center">{index + 1}</span>;
    }
  };

  const getRowStyle = (index) => {
    switch (index) {
      case 0: return "bg-yellow-50 border-yellow-200";
      case 1: return "bg-gray-50 border-gray-200";
      case 2: return "bg-orange-50 border-orange-200";
      default: return "bg-white border-gray-100 hover:bg-emerald-50";
    }
  };

  const getRankColor = (index) => {
    switch (index) {
      case 0: return "text-yellow-600";
      case 1: return "text-gray-600";
      case 2: return "text-amber-700";
      default: return "text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50/30 dark:bg-slate-900 transition-colors duration-300">
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white mb-4 tracking-tight">
            Eco <span className="text-emerald-600">Leaderboard</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            See who is making the biggest impact. Recycle more e-waste to climb the ranks and be recognized as a top eco-warrior in your community!
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-emerald-100 dark:border-slate-700 transition-colors duration-300">
          <div className="bg-emerald-600 dark:bg-emerald-700 px-6 py-4 flex items-center justify-between text-white">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-300" />
              Top Recyclers
            </h2>
            <div className="text-emerald-100 text-sm font-medium">
              Ranked by Items Recycled
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-900 text-gray-500 dark:text-slate-300 text-sm uppercase tracking-wider border-b border-gray-200 dark:border-slate-700">
                  <th className="px-6 py-4 font-semibold w-24 text-center">Rank</th>
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold text-right">Items Recycled</th>
                  <th className="px-6 py-4 font-semibold text-right">Impact Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/50 dark:divide-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500 dark:text-slate-300 font-medium h-48">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="w-8 h-8 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin"></div>
                        Calculating Leaderboard...
                      </div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-red-500 font-medium h-48 bg-red-50/50">
                      {error}
                    </td>
                  </tr>
                ) : !leaderboardData || !Array.isArray(leaderboardData) || leaderboardData.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500 dark:text-slate-300 font-medium h-48">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Trophy className="w-10 h-10 text-gray-300" />
                        <p>No recyclers found yet.</p>
                        <p className="text-sm">Complete your first pickup to claim the #1 spot!</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  leaderboardData.map((user, index) => (
                    <tr
                      key={user?.id || index}
                      className={`transition-colors duration-200 border-b last:border-0 ${getRowStyle(index)}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex justify-center items-center">
                          {getRankIcon(index)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`font-bold ${getRankColor(index)} text-lg flex items-center gap-3 dark:text-slate-100`}>
                          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold border border-emerald-200 shrink-0">
                            {user?.name && typeof user.name === 'string' ? user.name.charAt(0).toUpperCase() : '?'}
                          </div>
                          {user?.name || 'Anonymous User'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2 text-emerald-600 font-bold text-lg">
                          <Recycle className="w-5 h-5" />
                          {user?.items || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="font-semibold text-slate-700 dark:text-slate-200 text-lg">
                          {((user?.items || 0) * 10).toLocaleString()} <span className="text-sm text-slate-400 dark:text-slate-400 font-normal">pts</span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 dark:bg-slate-900 p-6 border-t border-gray-100 dark:border-slate-700 text-center">
            <p className="text-slate-600 dark:text-slate-300">
              Want to see your name here? <Link to="/schedule-pickup" className="text-emerald-600 font-semibold hover:text-emerald-700 underline underline-offset-2">Schedule a pickup today!</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
