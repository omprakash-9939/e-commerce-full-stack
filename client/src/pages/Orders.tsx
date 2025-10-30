import { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import type { Order } from '../types/order';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TbRefresh } from 'react-icons/tb';

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isRotating, setIsRotating] = useState(false);
  console.log('line number 120', orders);
  const token = Cookies.get('token');
  const { backendURL, currency } = useContext(ShopContext);
  const loadOrderData = async () => {
    try {
      if (!token) return;
      setIsRotating(true);
      const response = await axios.post(
        `${backendURL}/api/order/userorders`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setTimeout(() => setIsRotating(false), 500);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t border-gray-300 pt-16">
      <div className="text-2xl mb-6">
        <Title text1="My" text2="Orders" />
      </div>
      {orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        <div>
          {orders.map((order, idx) => (
            <Accordion key={idx} className="mb-4">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${idx}-content`}
                id={`panel${idx}-header`}
              >
                <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <Typography variant="subtitle1">
                      Order ID: {order._id}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Date: {new Date(order.date).toDateString()}
                    </Typography>
                  </div>
                  <div className="mt-2 md:mt-0 flex items-center gap-4">
                    <Typography variant="body2">
                      Payment: {order.paymentMethod}
                    </Typography>
                    <div className="flex items-center gap-1">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          order.status === 'Delivered'
                            ? 'bg-green-500'
                            : order.status === 'Pending'
                              ? 'bg-yellow-400'
                              : 'bg-gray-400'
                        }`}
                      ></span>
                      <Typography variant="body2">{order.status}</Typography>
                    </div>
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className="space-y-4 w-full">
                  {order.items.map((item, j) => (
                    <div
                      key={j}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4 last:border-none"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={item.image[0]}
                          className="w-16 h-16 object-cover rounded"
                          alt={item.name}
                        />
                        <div>
                          <Typography variant="subtitle1">
                            {item.name}
                          </Typography>
                          <div className="flex items-center gap-3 mt-1 text-sm text-gray-700">
                            <Typography>
                              {currency} {order?.amount}
                            </Typography>
                            <Typography>Qty: {item.quantity}</Typography>
                            <Typography>Size: {item.size}</Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={loadOrderData}
                      className="border cursor-pointer bg-purple-600 hover:bg-pink-500 px-4 py-2 text-sm font-medium rounded-sm text-white"
                    >
                      <TbRefresh
                        className={`w-5 h-5 transition-transform duration-500 ${
                          isRotating ? 'rotate-[180deg]' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
