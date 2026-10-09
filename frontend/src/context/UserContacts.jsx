import { createContext, useContext, useState, useCallback } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(null);
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = {
    data,
    setData,
    setEdit,
    edit,
    toasts,
    showToast,
    removeToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
