import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

const radiationData = [
  { day: 0, dose: 0 },
  { day: 5, dose: 12 },
  { day: 10, dose: 22 },
  { day: 15, dose: 34 },
  { day: 20, dose: 50 },
  { day: 30, dose: 72 },
];

const boneDensityData = [
  { name: "Astronaut A", pre: 100, post: 85 },
  { name: "Astronaut B", pre: 100, post: 82 },
  { name: "Control", pre: 100, post: 99 },
];

const sleepPatternData = [
  { day: 1, hours: 6 },
  { day: 2, hours: 5 },
  { day: 3, hours: 7 },
  { day: 4, hours: 4 },
  { day: 5, hours: 6.5 },
  { day: 6, hours: 5.5 },
  { day: 7, hours: 7.2 },
];

const HealthDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-cyan-400 mb-10 text-center">
        Astronaut Health Dashboard
      </h1>

      {/* Radiation Exposure */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
          Radiation Exposure (mSv)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={radiationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="day" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none" }} />
            <Line type="monotone" dataKey="dose" stroke="#06b6d4" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bone Density Loss */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
          Bone Density Pre vs Post Flight
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={boneDensityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none" }} />
            <Bar dataKey="pre" fill="#3b82f6" />
            <Bar dataKey="post" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Sleep Pattern */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
          Sleep Patterns (Hours per Night)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={sleepPatternData}>
            <defs>
              <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none" }} />
            <Area
              type="monotone"
              dataKey="hours"
              stroke="#06b6d4"
              fillOpacity={1}
              fill="url(#colorSleep)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HealthDashboard;