import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Cookies from "js-cookie";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { toast } from "react-toastify";

const Verify = () => {
  const token = Cookies.get("token");
  const { backendURL, navigate } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const success = searchParams.get("success");
  useEffect(() => {
    const verifyPayment = async () => {
      if (!token) {
        return null;
      }
      if (success === "true") {
        try {
          const orderData = JSON.parse(localStorage.getItem("orderData") || "{}");
          const userId = Cookies.get("userId");
          if (!orderData.items || !orderData.amount || !orderData.address) {
            toast.error("Order data missing, please try again");
            navigate("/cart");
            return;
          }
          const response = await axios.post(
            backendURL + "/api/order/verifyStripe",
            {
              success,
              userId,
              items: orderData.items,
              amount: orderData.amount,
              address: orderData.address,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (response.data.success) {
            dispatch(clearCart());
            localStorage.removeItem("orderData");
            navigate("/orders");
          } else {
            toast.error("Payment verification failed, please try again");
            navigate("/cart");
          }
        } catch (error) {
          console.log(error);
          toast.error("Try again");
          navigate("/cart");
        }
      } else {
        navigate("/cart");
      }
    };
    verifyPayment();
  }, [token, success, backendURL, navigate, dispatch]);
  return <div>Verifying Payment...</div>;
};

export default Verify;
