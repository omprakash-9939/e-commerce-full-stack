import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSelector } from "react-redux";
import { selectCartAmount } from "../redux/cartSlice";
import type { RootState } from "../redux/store";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee } = useContext(ShopContext);
  const { products } = useSelector((state: RootState) => state.products);
  const totalAmount = useSelector((state: RootState) =>
    selectCartAmount(state, products)
  );
  return (
      <div className="w-full">
        <div className="text-2xl">
          <Title text1={"Cart"} text2={"Totals"} />
        </div>
        <div className="flex flex-col gap-2 mt-2 text-sm">
          <div className="flex justify-between">
            <p>SubTotal</p>
            <p>
              {currency} {totalAmount} .00
            </p>
          </div>
          <hr className="h-1 text-pink-400 font-bold" />
          <div className="flex justify-between">
            <p>Shipping Fee</p>
            <p>
              {currency} {delivery_fee}.00
            </p>
          </div>
          <hr className="h-1 text-pink-400 font-bold" />
          <div className="flex justify-between">
            <b>Total</b>
            <b>{currency} {totalAmount === 0 ? 0 : totalAmount + delivery_fee} .00</b>
          </div>
        </div>
      </div>
  );
};

export default CartTotal;
