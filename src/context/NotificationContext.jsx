import { useContext, createContext, useState } from "react";

const NotificationContext = createContext({
  snackbarOpen: false,
  setSnackbarOpen: () => {},
  snackbarMessage: "",
  setSnackbarMessage: () => {},
  addNotification: () => {},
});

const NotificationContextProvider = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const addNotification = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  const value = {
    snackbarOpen,
    setSnackbarOpen,
    snackbarMessage,
    setSnackbarMessage,
    addNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

const useNotificationContext = () => useContext(NotificationContext);

export { useNotificationContext, NotificationContextProvider };
