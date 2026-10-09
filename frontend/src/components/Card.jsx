import React, { useState } from "react";
import { useAppContext } from "../context/UserContacts";
import { API_URL } from "../api";
import axios from "axios";

const Card = ({ value }) => {
  const { setData, setEdit, showToast } = useAppContext();
  const [deleting, setDeleting] = useState(false);

  const handleEdit = () => {
    setEdit(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`${API_URL}/${value._id}`);
      setData((prev) => {
        const list = Array.isArray(prev) ? prev : [];
        return list.filter((contact) => contact._id !== value._id);
      });
      showToast("Contact deleted successfully", "success");
    } catch (error) {
      console.error("Delete error:", error);
      showToast("Failed to delete contact", "error");
    } finally {
      setDeleting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Interested":
        return "bg-green-100 text-green-800";
      case "Follow-Up":
        return "bg-yellow-100 text-yellow-800";
      case "Closed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between">
      <div>
        {/* Name and Status */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-semibold text-gray-900 text-base">
            {value.name}
          </h3>
          <span
            className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${getStatusColor(
              value.status,
            )}`}
          >
            {value.status}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-1.5 text-xs text-gray-600 mb-4">
          {value.email && (
            <div>
              <span className="font-medium text-gray-700">Email:</span>{" "}
              {value.email}
            </div>
          )}
          {value.phone && (
            <div>
              <span className="font-medium text-gray-700">Phone:</span>{" "}
              {value.phone}
            </div>
          )}
          {value.company && (
            <div>
              <span className="font-medium text-gray-700">Company:</span>{" "}
              {value.company}
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
        <button
          onClick={handleEdit}
          className="flex-1 py-1.5 px-3 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex-1 py-1.5 px-3 border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default Card;
