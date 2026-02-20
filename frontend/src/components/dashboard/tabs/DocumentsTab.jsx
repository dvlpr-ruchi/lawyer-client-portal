import React from "react";
import { FileText, Download } from "lucide-react";

const documentsData = [
  {
    id: 1,
    title: "Agreement Draft",
    uploadedOn: "12 Feb 2026",
  },
  {
    id: 2,
    title: "Property Documents",
    uploadedOn: "10 Feb 2026",
  },
];

const DocumentsTab = () => {
  return (
    <div className="space-y-6">
      {documentsData.map((doc) => (
        <div
          key={doc.id}
          className="bg-white rounded-xl shadow-sm p-6 border flex justify-between items-center"
        >
          <div>
            <div className="flex items-center gap-2 font-semibold">
              <FileText size={18} />
              {doc.title}
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Uploaded on {doc.uploadedOn}
            </p>
          </div>

          <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            <Download size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default DocumentsTab;
