import React from "react";
import { CreditCard } from "lucide-react";

const paymentsData = [
  {
    id: 1,
    service: "FIR Filing Service",
    amount: "₹2,000",
    date: "10 Feb 2026",
    status: "Paid",
  },
  {
    id: 2,
    service: "Consultation Fee",
    amount: "₹1,000",
    date: "5 Feb 2026",
    status: "Paid",
  },
];

const PaymentsTab = () => {
  return (
    <div className="space-y-6">
      {paymentsData.map((payment) => (
        <div
          key={payment.id}
          className="bg-white rounded-xl shadow-sm p-6 border"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{payment.service}</h3>
              <p className="text-gray-500 text-sm">
                {payment.date}
              </p>
            </div>

            <span className="text-green-600 font-semibold">
              {payment.amount}
            </span>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
              {payment.status}
            </span>

            <button className="flex items-center gap-2 text-gray-600 hover:text-black">
              <CreditCard size={16} />
              View Receipt
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentsTab;
