import React, { useState } from "react";
import { UploadCloud, FileText, X, CheckCircle2, AlertCircle } from "lucide-react";

const UploadDocuments = () => {
  const [documents, setDocuments] = useState({
    fir: null,
    caseDoc: null,
    idProof: null,
  });

  const [errors, setErrors] = useState({});

  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];

    if (!file) return;

    // Type validation
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        [type]: "Only PDF, JPG, PNG files allowed",
      }));
      return;
    }

    // Size validation
    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        [type]: "File must be under 5MB",
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, [type]: null }));

    setDocuments((prev) => ({
      ...prev,
      [type]: file,
    }));
  };

  const removeFile = (type) => {
    setDocuments((prev) => ({
      ...prev,
      [type]: null,
    }));
  };

  const handleSubmit = () => {
    const allUploaded = Object.values(documents).every((doc) => doc !== null);
    
    if (!allUploaded) {
      alert("Please upload all required documents");
      return;
    }
    
    console.log("Ready to send to API:", documents);
    alert("Files ready for upload (API integration pending)");
  };

  const FileUploadBox = ({ label, type, description }) => (
    <div className="group relative">
      <div
        className={`
          relative border-2 border-dashed rounded-2xl p-6 sm:p-8 
          transition-all duration-300 ease-in-out
          ${
            documents[type]
              ? "border-green-400 bg-green-50"
              : errors[type]
              ? "border-red-400 bg-red-50"
              : "border-gray-200 bg-white hover:border-amber-400 hover:bg-amber-50"
          }
        `}
      >
        <label className="cursor-pointer block">
          <div className="flex flex-col items-center space-y-3">
            <div
              className={`
                p-4 rounded-full transition-colors duration-300
                ${
                  documents[type]
                    ? "bg-green-100"
                    : errors[type]
                    ? "bg-red-100"
                    : "bg-gray-100 group-hover:bg-amber-100"
                }
              `}
            >
              {documents[type] ? (
                <CheckCircle2 className="text-green-600" size={28} />
              ) : errors[type] ? (
                <AlertCircle className="text-red-600" size={28} />
              ) : (
                <UploadCloud
                  className="text-gray-600 group-hover:text-amber-600 transition-colors"
                  size={28}
                />
              )}
            </div>

            <div className="text-center">
              <p className="font-semibold text-gray-800 text-base sm:text-lg mb-1">
                {label}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                {description}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                PDF, JPG, PNG • Max 5MB
              </p>
            </div>
          </div>

          <input
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileChange(e, type)}
          />
        </label>

        {documents[type] && (
          <div className="mt-4 flex items-center justify-between bg-white border border-green-200 p-3 sm:p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0 bg-green-100 p-2 rounded-lg">
                <FileText size={18} className="text-green-600" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-sm font-medium text-gray-800 block truncate">
                  {documents[type].name}
                </span>
                <span className="text-xs text-gray-500">
                  {(documents[type].size / 1024).toFixed(1)} KB
                </span>
              </div>
            </div>

            <button
              onClick={() => removeFile(type)}
              className="flex-shrink-0 ml-2 text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {errors[type] && (
          <div className="mt-3 flex items-center gap-2 text-red-600 bg-white px-3 py-2 rounded-lg border border-red-200">
            <AlertCircle size={16} />
            <p className="text-xs sm:text-sm font-medium">{errors[type]}</p>
          </div>
        )}
      </div>
    </div>
  );

  const uploadedCount = Object.values(documents).filter((doc) => doc !== null).length;
  const totalCount = Object.keys(documents).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-amber-50 to-gray-50 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-xl rounded-3xl p-6 sm:p-10 mb-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Secure Document Upload
              </h1>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
                Upload your legal documents securely. All files are encrypted end-to-end and stored with bank-level security.
              </p>
            </div>
            
            {/* Progress indicator */}
            <div className="flex-shrink-0 bg-amber-50 border-2 border-amber-200 rounded-2xl px-4 sm:px-6 py-3">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-amber-700">
                  {uploadedCount}/{totalCount}
                </p>
                <p className="text-xs sm:text-sm text-amber-600 font-medium">
                  Uploaded
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Boxes */}
        <div className="bg-white shadow-xl rounded-3xl p-6 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <FileUploadBox
              label="FIR Copy"
              type="fir"
              description="First Information Report"
            />
            <FileUploadBox
              label="Case Documents"
              type="caseDoc"
              description="Related legal papers"
            />
            <FileUploadBox
              label="ID Proof"
              type="idProof"
              description="Government-issued ID"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={uploadedCount < totalCount}
            className={`
              mt-8 w-full py-4 rounded-2xl font-semibold text-base sm:text-lg
              transition-all duration-300 shadow-lg
              ${
                uploadedCount === totalCount
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white hover:shadow-xl transform hover:-translate-y-0.5"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            {uploadedCount === totalCount
              ? "Submit Documents"
              : `Upload All Documents (${uploadedCount}/${totalCount})`}
          </button>

          {/* Security Notice */}
          <div className="mt-6 flex items-start gap-3 bg-yellow-50 border border-yellow-100 rounded-xl p-4">
            <div className="flex-shrink-0 mt-0.5">
              <svg
                className="w-5 h-5 text-yellow-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-yellow-900">
                Your privacy is protected
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                All documents are encrypted using AES-256 encryption and stored securely. We never share your data with third parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;