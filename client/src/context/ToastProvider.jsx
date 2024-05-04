import { createContext, useContext, useMemo, useState } from "react";

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

function ToastProvider({ children }) {
  const [params, setParams] = useState({
    show: false,
    message: "",
    variant: "",
  });

  // const open = () => setParams({...params, show: true})
  // const close = () => setParams({...params, show: false})
  // const setMessage = (value) => setParams({...params})
  // const

  const contextValue = useMemo(() => ({ params, setParams }), [params]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
