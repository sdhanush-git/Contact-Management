import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/UserContacts";
import { API_URL } from "../api";
import axios from "axios";

const Form = () => {
  const { setData, setEdit, edit, showToast } = useAppContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "Interested",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (edit) {
      setFormData({
        name: edit.name || "",
        email: edit.email || "",
        phone: edit.phone ? String(edit.phone) : "",
        company: edit.company || "",
        status: edit.status || "Interested",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        status: "Interested",
      });
    }
  }, [edit]);

  const handleInput = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setEdit(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "Interested",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showToast("Name is required", "error");
      return;
    }

    setLoading(true);

    const payload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      company: formData.company.trim(),
      status: formData.status,
    };

    if (formData.email.trim()) {
      payload.email = formData.email.trim();
    }

    try {
      if (edit) {
        const response = await axios.put(
          `${API_URL}/${edit._id}`,
          payload,
        );

        setData((prev) => {
          const list = Array.isArray(prev) ? prev : [];
          return list.map((item) => (item._id === edit._id ? response.data : item));
        });

        showToast("Contact edited successfully", "success");
        handleCancel();
      } else {
        const response = await axios.post(API_URL, payload);

        setData((prev) => {
          const list = Array.isArray(prev) ? prev : [];
          return [response.data, ...list];
        });

        showToast("Contact created successfully", "success");
        handleCancel();
      }
    } catch (error) {
      console.error("Save error:", error);
      const errMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to save contact";
      showToast(errMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {edit ? "Edit Contact" : "Add Contact"}
        </h2>
        {edit && (
          <button
            type="button"
            onClick={handleCancel}
            className="text-xs text-gray-500 hover:text-gray-800 underline cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleInput}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-gray-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleInput}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-gray-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            placeholder="9876543210"
            value={formData.phone}
            onChange={handleInput}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-gray-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Company
          </label>
          <input
            type="text"
            name="company"
            placeholder="Company name"
            value={formData.company}
            onChange={handleInput}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-gray-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInput}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:border-gray-500 cursor-pointer"
          >
            <option value="Interested">Interested</option>
            <option value="Follow-Up">Follow-Up</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors cursor-pointer disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : edit
            ? "Update Contact"
            : "Save Contact"}
        </button>
      </form>
    </div>
  );
};

export default Form;
