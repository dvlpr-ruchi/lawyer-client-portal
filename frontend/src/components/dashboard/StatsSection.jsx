import React from "react";
import { TrendingUp, Activity, CheckCircle2 } from "lucide-react";

const icons = [TrendingUp, Activity, CheckCircle2];

const StatsSection = ({ selectedTab }) => {
  const stats = {
    fir: [
      { label: "Total Requests", value: 7, trend: "+2 this week" },
      { label: "In Progress", value: 2, trend: "Active" },
      { label: "Completed", value: 5, trend: "+1 today" },
    ],
  };

  if (!stats[selectedTab]) return null;

  return (
    <div className="grid grid-cols-3 gap-4 px-6 py-5 bg-black border-b border-white/8">
      {stats[selectedTab].map((stat, i) => {
        const Icon = icons[i];
        return (
          <div
            key={i}
            className="relative p-5 bg-neutral-950 rounded-2xl border border-white/8 hover:border-yellow-500/30 transition-colors duration-300 overflow-hidden group"
          >
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/3 rounded-2xl transition-colors duration-300" />

            {/* Icon */}
            <div className="w-8 h-8 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-4">
              <Icon size={15} className="text-yellow-400" />
            </div>

            {/* Label */}
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
              {stat.label}
            </p>

            {/* Value + Trend */}
            <div className="flex items-end justify-between mt-1">
              <h2 className="text-4xl font-black text-white tracking-tight leading-none">
                {stat.value}
              </h2>
              <span className="text-yellow-500 text-xs font-bold bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-1 rounded-full mb-0.5">
                {stat.trend}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsSection;