import React, { useEffect, useState } from "react";
import api from "../../network/api";

const Terms = () => {
  const [terms, setTerms] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await api.get("/api/v1/terms/latest");
        setTerms(res.data.data);
      } catch (error) {
        console.error("Error fetching terms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500 text-lg">Loading Terms...</p>
      </div>
    );
  }

  if (!terms) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500 text-lg">No Terms Found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {terms.title}
        </h1>

        {/* Version */}
        <p className="text-sm text-gray-500 mb-6">
          Version: {terms.version}
        </p>

        {/* Content */}
        <div
          className="prose max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: terms.content }}
        />

      </div>
    </div>
  );
};

export default Terms;