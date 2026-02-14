import React, { useEffect, useState } from "react";
import api from "../../network/api";
import { MapPin, Phone, CheckCircle, Star } from "lucide-react";

const AllLawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLawyers();
  }, []);

  const fetchLawyers = async () => {
  try {
    setLoading(true);
    const response = await api.get("/api/v1/comman/lawyers");

    console.log("all lawyers", response.data);

    setLawyers(response.data.lawyers); // ✅ FIXED

  } catch (err) {
    setError("Failed to fetch lawyers");
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg font-semibold">
        Loading lawyers...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Verified Lawyers</h1>

      {lawyers.length === 0 ? (
        <div className="text-center text-gray-500">
          No verified lawyers available.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {lawyers.map((lawyer) => (
            <div
              key={lawyer._id}
              className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition duration-300"
            >
              <img
                src={lawyer.image}
                alt={lawyer.name}
                className="w-24 h-24 rounded-full mx-auto object-cover mb-4"
              />

              <h2 className="text-xl font-semibold text-center">
                {lawyer.name}
              </h2>

              {lawyer.isVerified && (
                <div className="flex justify-center items-center gap-1 text-green-600 mt-1">
                  <CheckCircle size={16} />
                  <span className="text-sm">Verified</span>
                </div>
              )}

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                {lawyer.state && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {lawyer.state}
                  </div>
                )}

                {lawyer.contactNumber && (
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    {lawyer.contactNumber}
                  </div>
                )}

                {lawyer.yearOfExperince && (
                  <div>
                    <strong>Experience:</strong> {lawyer.yearOfExperince} years
                  </div>
                )}

                {lawyer.fee && (
                  <div>
                    <strong>Consultation Fee:</strong> ₹{lawyer.fee}
                  </div>
                )}
              </div>

              <button className="mt-5 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                Book Consultation
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllLawyers;
