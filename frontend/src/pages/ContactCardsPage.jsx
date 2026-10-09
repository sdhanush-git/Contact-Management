import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { useAppContext } from "../context/UserContacts";
import { API_URL } from "../api";
import axios from "axios";

const ContactCardsPage = () => {
  const { data, setData } = useAppContext();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const contactList = Array.isArray(data) ? data : [];

  const filteredData = contactList.filter((item) => {
    const matchesFilter = filter === "All" || item.status === filter;
    const matchesSearch =
      (item.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.company || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.phone ? String(item.phone) : "").includes(search);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-5">
      {/* Top Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-gray-800">
          Saved Contacts{" "}
          <span className="text-sm font-normal text-gray-500">
            ({filteredData.length})
          </span>
        </h2>

        <div className="w-full sm:w-60">
          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs text-gray-800 focus:outline-none focus:border-gray-500"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
        {["All", "Interested", "Follow-Up", "Closed"].map((status) => {
          const isActive = filter === status;
          return (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-lg border transition-colors cursor-pointer ${
                isActive
                  ? "bg-gray-900 border-gray-900 text-white"
                  : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {status}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {loading ? (
        <div className="py-12 text-center text-sm text-gray-500">
          Loading contacts...
        </div>
      ) : filteredData.length === 0 ? (
        <div className="py-12 px-4 text-center bg-white border border-dashed border-gray-300 rounded-xl">
          <p className="text-gray-700 font-medium text-sm">
            {contactList.length === 0
              ? "No contacts yet"
              : "No contacts match your search or filter"}
          </p>
          <p className="text-gray-400 text-xs mt-1">
            {contactList.length === 0
              ? "Fill out the form to add your first contact."
              : "Try changing the filter or search term."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredData.map((item) => (
            <Card key={item._id} value={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactCardsPage;
