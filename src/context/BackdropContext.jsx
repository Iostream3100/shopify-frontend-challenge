import { useContext, createContext, useState } from "react";

const BackdropContext = createContext({});

const BackdropContextProvider = ({ children }) => {
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [backdropMessage, setBackdropMessage] = useState("");

  const addBackdrop = (message) => {
    setBackdropMessage(message);
    setBackdropOpen(true);
  };

  const value = {
    backdropOpen,
    setBackdropOpen,
    backdropMessage,
    setBackdropMessage,
    addBackdrop,
  };

  return (
    <BackdropContext.Provider value={value}>
      {children}
    </BackdropContext.Provider>
  );
};

const useBackdropContext = () => useContext(BackdropContext);

export { useBackdropContext, BackdropContextProvider };
