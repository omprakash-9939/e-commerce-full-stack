import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import ListProduct from "./pages/ListProduct";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import SearchInput from "./pages/SearchInput";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import ProtectedRoute from "./components/ProtectedRoute";

export const currency = "$";

export default function App() {
  const [token, setToken] = useState<string>(Cookies.get("admin-token") || "");
  const [admin, setAdmin] = useState<{
    name: string;
    email: string;
    role: string;
  } | null>(null);

  console.log("check token", token);

  useEffect(() => {
    if (token) {
      Cookies.set("admin-token", token, { expires: 7 });

      const savedAdmin = localStorage.getItem("admin");
      if (savedAdmin) {
        try {
          setAdmin(JSON.parse(savedAdmin));
        } catch (err) {
          console.error("Failed to parse admin from localStorage", err);
          localStorage.removeItem("admin");
          setAdmin(null);
        }
      }
    } else {
      // Remove admin token and admin info on logout
      Cookies.remove("admin-token");
      localStorage.removeItem("admin");
      setAdmin(null);
    }
  }, [token]);

  return (
    <div className="bg-gray-50">
      <ToastContainer />
      <Navbar setToken={setToken} admin={admin} />
      <hr className="text-gray-200" />

      <div className="flex w-full">
        {token && <Sidebar setToken={setToken} setAdmin={setAdmin} />}
        <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base">
          <Routes>
            <Route
              path="/"
              element={<Navigate to={token ? "/list" : "/login"} replace />}
            />
            <Route
              path="/login"
              element={<Login setToken={setToken} setAdmin={setAdmin} />}
            />
            <Route
              path="/add"
              element={
                <ProtectedRoute token={token}>
                  <AddProduct token={token} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/list"
              element={
                <ProtectedRoute token={token}>
                  <ListProduct token={token} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute token={token}>
                  <Orders token={token} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat-db"
              element={
                <ProtectedRoute token={token}>
                  <SearchInput />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
