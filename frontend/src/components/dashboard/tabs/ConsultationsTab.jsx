import React from "react";
import { Calendar, User, Clock } from "lucide-react";

const consultationsData = [
  {
    id: 1,
    lawyer: "Adv. Rajesh Kumar",
    date: "15 Feb 2026",
    time: "4:00 PM",
    type: "Video Call",
    status: "Upcoming",
  },
  {
    id: 2,
    lawyer: "Adv. Priya Sharma",
    date: "10 Feb 2026",
    time: "2:00 PM",
    type: "Office Visit",
    status: "Completed",
  },
];

const ConsultationsTab = () => {
  return (
    <div className="space-y-6">
      {consultationsData.map((consultation) => (
        <div
          key={consultation.id}
          className="bg-white rounded-xl shadow-sm p-6 border"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {consultation.lawyer}
            </h3>
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                consultation.status === "Upcoming"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {consultation.status}
            </span>
          </div>

          <div className="space-y-2 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {consultation.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              {consultation.time}
            </div>
            <div className="flex items-center gap-2">
              <User size={16} />
              {consultation.type}
            </div>
          </div>

          <button className="mt-4 w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white py-2 rounded-lg">
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default ConsultationsTab;
