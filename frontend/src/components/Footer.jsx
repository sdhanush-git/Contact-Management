import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
        <p>© {new Date().getFullYear()} ContactFlow. All rights reserved.</p>
        <p>Simple contact management</p>
      </div>
    </footer>
  );
};

export default Footer;
