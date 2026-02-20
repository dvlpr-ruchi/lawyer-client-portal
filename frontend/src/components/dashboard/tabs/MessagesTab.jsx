import React from "react";
import { MessageCircle } from "lucide-react";

const messagesData = [
  {
    id: 1,
    from: "Adv. Rajesh Kumar",
    message: "Please upload your ID proof.",
    time: "2 hours ago",
  },
  {
    id: 2,
    from: "Support Team",
    message: "Your FIR draft is under review.",
    time: "1 day ago",
  },
];

const MessagesTab = () => {
  return (
    <div className="space-y-6">
      {messagesData.map((msg) => (
        <div
          key={msg.id}
          className="bg-white rounded-xl shadow-sm p-6 border"
        >
          <div className="flex items-center gap-2 font-semibold">
            <MessageCircle size={18} />
            {msg.from}
          </div>

          <p className="mt-2 text-gray-600">{msg.message}</p>

          <p className="text-sm text-gray-400 mt-2">
            {msg.time}
          </p>

          <button className="mt-4 w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white py-2 rounded-lg">
            Open Chat
          </button>
        </div>
      ))}
    </div>
  );
};

export default MessagesTab;
