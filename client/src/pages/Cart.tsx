import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { MdDeleteForever } from 'react-icons/md';
import { updateCartServer, updateQuantity } from '../redux/cartSlice';
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import type { CartItem } from '../types/cart';
import { fetchProducts } from '../redux/productSlice';
import Spinner from '../components/Spinner';

const Cart = () => {
  const { products } = useSelector((state: RootState) => state.products);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { currency } = useContext(ShopContext);
  const navigate = useNavigate();
  const token = Cookies.get('token');

  // const handleQuantityChange = (
  //   itemId: string,
  //   size: string,
  //   quantity: number
  // ) => {
  //   if (!token) return;
  //   dispatch(updateCartServer({ token, itemId, size, quantity }));
  // };

  const handleQuantityChange = (
    itemId: string,
    size: string,
    quantity: number
  ) => {
    if (token) {
      dispatch(updateCartServer({ token, itemId, size, quantity }));
    } else {
      //guests
      dispatch(updateQuantity({ itemId, size, quantity }));
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      const tempData: CartItem[] = [];
      console.log('temp data', tempData);
      for (const itemId in cart) {
        for (const size in cart[itemId]) {
          if (cart[itemId][size] > 0) {
            tempData.push({
              _id: itemId,
              size,
              quantity: cart[itemId][size],
            });
          }
        }
      }
      // console.log(tempData);
      setCartData(tempData);
    }
  }, [cart, products]);

  //   useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchProducts()).unwrap();
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="border-t border-gray-300 pt-14">
      <div className="text-2xl mb-3">
        <Title text1="Your" text2="Cart" />
      </div>
      {cartData.length > 0 ? (
        <>
          <div>
            {cartData.map((item, index) => {
              const productData = products.find(
                (product) => product._id === item?._id
              );
              return (
                <div
                  key={index}
                  className="py-4 border-t border-b border-gray-200 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center sm:gap-4 gap-2"
                >
                  <div className="flex items-start gap-6">
                    <img
                      className="w-16 sm:w-20"
                      src={productData?.image[0]}
                      alt="img"
                    />
                    <div>
                      <p className="text-xs sm:text-[14px] font-bold">
                        {productData?.name}
                      </p>
                      <div className="flex text-xs sm:text-[14px] whitespace-nowrap items-center sm:gap-2 gap-0 mt-2">
                        <p>
                          Price:{' '}
                          <span className="font-bold">
                            {currency} {productData?.price}
                          </span>
                        </p>
                        <p className="px-2 rounded sm:px-3 sm:py-1 border-gray-200 bg-slate-50">
                          Size: <span className="font-bold">{item.size}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center w-fit border-2 border-purple-600 bg-white rounded-full gap-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item._id,
                          item.size,
                          item.quantity - 1
                        )
                      }
                      disabled={item.quantity <= 1}
                      className={`sm:px-2 px-1 py-1 rounded-l-full cursor-pointer font-bold ${
                        item.quantity <= 1
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-gray-300'
                      }`}
                    >
                      −
                    </button>
                    <span className="px-5 font-bold">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item._id,
                          item.size,
                          item.quantity + 1
                        )
                      }
                      className="sm:px-2 px-1 py-1 rounded-r-full  cursor-pointer font-bold hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <MdDeleteForever
                    className="w-8 sm:w-8 sm:h-8 h-8 text-purple-600 cursor-pointer"
                    onClick={() => handleQuantityChange(item._id, item.size, 0)}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <div className="w-full text-end">
                <button
                  onClick={() => navigate('/place-order')}
                  className="bg-purple-500 text-white text-sm my-8 cursor-pointer hover:bg-pink-600 px-8 py-3 rounded"
                >
                  Process To Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 mt-20 mb-4">
          <p>Your cart is empty 🛒</p>
          <button
            onClick={() => navigate('/collection')}
            className="mt-6 bg-purple-500 cursor-pointer text-white px-6 py-3 rounded hover:bg-pink-600"
          >
            Go to Shop
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
