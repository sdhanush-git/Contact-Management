import React from "react";
import { useAppContext } from "../context/UserContacts";

const Toast = () => {
  const { toasts, removeToast } = useAppContext();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isError = toast.type === "error";

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-lg border shadow-sm text-sm transition-all ${
              isSuccess
                ? "bg-green-50 border-green-200 text-green-800"
                : isError
                ? "bg-red-50 border-red-200 text-red-800"
                : "bg-gray-50 border-gray-200 text-gray-800"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="font-medium text-xs sm:text-sm">
                {toast.message}
              </span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-700 ml-3 text-lg leading-none cursor-pointer"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
