import { createContext, useContext, useEffect, useState } from "react";
import { useCheckToken } from "../hooks/useCheckToken";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const CheckStatus = async function () {
      const status = await useCheckToken();

      if (status) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    };

    CheckStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
