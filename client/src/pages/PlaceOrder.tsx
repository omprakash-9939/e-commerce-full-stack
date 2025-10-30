import { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { clearCart, selectCartAmount } from '../redux/cartSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import type {
  RazorpayOrder,
  RazorpayPaymentResponse,
} from '../types/placeorder';
import type { CartOrderItem } from '../types/order';
import Spinner from '../components/Spinner';
import { fetchProducts } from '../redux/productSlice';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { products } = useSelector((state: RootState) => state.products);
  const totalAmount = useSelector((state: RootState) =>
    selectCartAmount(state, products)
  );
  const { backendURL, navigate, delivery_fee } = useContext(ShopContext);
  const cartData = useSelector((state: RootState) => state.cart);
  console.log(cartData);
    const dispatch = useDispatch<AppDispatch>();
  const token = Cookies.get('token');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };
  const initPay = (order: RazorpayOrder, orderItems: CartOrderItem[]) => {
    const options = {
      key: import.meta.env.VITE_Razorpay_key_id,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response: RazorpayPaymentResponse) => {
        setIsProcessing(true);
        // Attach full order details to verify request
        try {
          const verifyPayload = {
            userId: Cookies.get('userId'), //decode from token
            razorpay_order_id: response.razorpay_order_id,
            items: orderItems,
            amount: totalAmount + delivery_fee,
            address: formData,
          };
          const { data } = await axios.post(
            backendURL + '/api/order/verifyRazorpay',
            verifyPayload,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (data.success) {
            dispatch(clearCart());
            navigate('/orders', { replace: true });
          } else {
            toast.error('Payment verification failed or cancelled');
          }
        } catch (error) {
          toast.error('Payment failed');
          console.log(error);
        } finally {
          setIsProcessing(false);
        }
      },
      modal: { ondismiss: () => toast.info('Payment cancelled') },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const orderItems = [];
      for (const itemId in cartData) {
        console.log(cartData);
        for (const size in cartData[itemId]) {
          console.log('line 46', cartData[itemId]);
          const quantity = cartData[itemId][size];
          console.log('line 48', quantity);
          if (quantity > 0) {
            const product = products.find(
              (p) => String(p._id) === String(itemId)
            );
            console.log('line 49', product);
            if (product) {
              orderItems.push({
                ...product,
                size,
                quantity,
              });
            }
          }
        }
      }
      const orderData = {
        address: formData,
        items: orderItems,
        amount: totalAmount + delivery_fee,
      };
      switch (method) {
        case 'cod': {
          const response = await axios.post(
            backendURL + '/api/order/place',
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log(response);
          if (response.data.success) {
            dispatch(clearCart());
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;
        }
        case 'razorpay': {
          const responseRazorPay = await axios.post(
            backendURL + '/api/order/razorpay',
            { amount: totalAmount + delivery_fee },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (responseRazorPay.data.success) {
            initPay(responseRazorPay.data.order, orderItems);
          } else {
            toast.error(responseRazorPay.data.message);
          }
          break;
        }
        default:
          break;
      }
      console.log('line 58', orderItems);
    } catch (error) {
      console.log(error);
    }
  };
 
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
      <Spinner/>
    </div>
  );
}

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-300"
    >
      {/* Left section */}
      <div className="flex flex-col gap-4 pr-5 w-full sm:w-[480px]">
        <div className="text-xl sm:ext-2xl my-3">
          <Title text1={'Delivery'} text2={'Information'} />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            required
            type="text"
            className="border-1 font-sans focus:outline-none focus:border-[#8B008B] focus:ring-1 border-gray-300 text-sm font-semibold  rounded py-1.5 px-3 w-full"
            placeholder="First Name"
          />

          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            required
            type="text"
            className="border-1 font-sans focus:outline-none focus:border-[#8B008B] focus:ring-1 border-gray-300 text-sm font-semibold  rounded py-1.5 px-3 w-full"
            placeholder="Last Name"
          />
        </div>
        <input
          type="email"
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          required
          className="border-1 font-sans focus:outline-none focus:border-[#8B008B] focus:ring-1 border-gray-300 rounded text-sm font-semibold  py-1.5 px-3 w-full"
          placeholder="Enter Your Email"
        />
        <input
          type="text"
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          required
          className="border-1 font-sans focus:outline-none focus:border-[#8B008B] focus:ring-1 border-gray-300 rounded text-sm font-semibold  py-1.5 px-3 w-full"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            type="text"
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            required
            className="border-1 font-sans focus:outline-none focus:border-[#8B008B] focus:ring-1 border-gray-300 rounded text-sm font-semibold  py-1.5 px-3 w-full"
            placeholder="City"
          />
          <input
            type="text"
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border-1 font-sans focus:outline-none focus:border-[#8B008B] focus:ring-1 border-gray-300 rounded text-sm font-semibold  py-1.5 px-3 w-full"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            required
            className="border-1 font-sans focus:outline-none focus:border-[#8B008B] focus:ring-1 border-gray-300 rounded text-sm font-semibold  py-1.5 px-3 w-full"
            placeholder="Zipcode"
          />
          <input
            type="text"
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            required
            className="border-1 font-sans focus:outline-none focus:border-[#8B008B] focus:ring-1 border-gray-300 rounded text-sm font-semibold  py-1.5 px-3 w-full"
            placeholder="Country"
          />
        </div>
        <input
          type="number"
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          required
          className="border-1 font-sans focus:outline-none focus:border-[#8B008B] focus:ring-1 border-gray-300 rounded text-sm font-semibold  py-1.5 px-3 w-full"
          placeholder="Phone Number"
        />
      </div>
      {/* Right side */}
      <div className="mt-8 pl-2 w-full sm:w-[480px]">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={'Payment'} text2={'Method'} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod('razorpay')}
              className="flex items-center gap-3 border-2 border-pink-200 rounded p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border-2 border-gray-200 rounded-full ${
                  method == 'razorpay' ? 'bg-green-600' : ''
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="logo" />
            </div>
            <div
              onClick={() => setMethod('cod')}
              className="flex items-center gap-3 border-2 border-pink-200 rounded p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border-2 border-gray-200 rounded-full ${
                  method == 'cod' ? 'bg-green-600' : ''
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                Cash On Delivery
              </p>
            </div>
          </div>
          <div className="w-full text-end">
            <button
              type="submit"
              className="bg-purple-500 text-white text-sm my-8 cursor-pointer hover:bg-pink-600 px-8 py-3 rounded"
            >
              Place Order
            </button>
          </div>
        </div>
        {isProcessing && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <Spinner/>
          </div>
        )}
      </div>
    </form>
  );
};

export default PlaceOrder;
