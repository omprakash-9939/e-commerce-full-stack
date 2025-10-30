import axios from "axios";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface ShopContextType {
  currency: string;
  delivery_fee: number;
  backendURL: string;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  navigate: ReturnType<typeof useNavigate>;
}

interface ShopContextProviderProps {
  children: ReactNode;
}

const defaultBackendURL = import.meta.env.VITE_BACKEND_URL || "";

// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext<ShopContextType>({
  currency: "$",
  delivery_fee: 0,
  backendURL: defaultBackendURL,
  token: "",
  setToken: () => {},
  navigate: (() => {
    throw new Error("navigate not initialized");
  }) as ReturnType<typeof useNavigate>,
});

const ShopContextProvider = ({ children }: ShopContextProviderProps) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  const getProductData = async () => {
    try {
      const response = await axios.get(backendURL + "/api/product/list");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    getProductData();
  }, []);

  const value: ShopContextType = {
    currency,
    delivery_fee,
    backendURL,
    token,
    setToken,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
