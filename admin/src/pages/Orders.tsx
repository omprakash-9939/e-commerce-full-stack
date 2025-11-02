import axios from "axios";
import { useEffect, useState } from "react";
import { currency } from "../App";
import { toast } from "react-toastify";
import boxvideo from "../assets_admin/box.mp4";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { backendUrl } from "../config";
import Cookies from "js-cookie";
import QRCode from "qrcode";

type OrdersProps = {
  token?: string;
};

interface OrderProduct {
  name: string;
  quantity: number;
  size?: string;
}

interface Address {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  phone: string;
}

interface Order {
  _id: string;
  userId: string;
  items: OrderProduct[];
  amount: number;
  address: Address;
  status: string;
  paymentMethod: string;
  payment: boolean;
  date: number;
  __v: number;
}

const Orders: React.FC<OrdersProps> = ({ token }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const adminToken = Cookies.get("admin-token") || token;
  if (!adminToken) {
    console.warn("Admin token missing! Orders API will not work.");
  }

  const fetchAllOrders = async () => {
    if (!adminToken) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      if (response.data.success) {
         const sortedOrders = response.data.orders.sort(
        (a: Order, b: Order) => b.date - a.date
      );
        // setOrders(response.data.orders);
         setOrders(sortedOrders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const statusHandler = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    orderId: string
  ) => {
    if (!adminToken) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generatePDF = async (order: Order) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Order Invoice", 14, 20);
    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id}`, 14, 30);
    doc.text(
      `Customer: ${order.address.firstName} ${order.address.lastName}`,
      14,
      40
    );
    doc.text(`Date: ${new Date(order.date).toLocaleString()}`, 14, 50);
    doc.text(`Payment Method: ${order.paymentMethod}`, 14, 60);
    doc.text(`Payment Status: ${order.payment ? "Done" : "Pending"}`, 14, 70);

    autoTable(doc, {
      startY: 80,
      head: [["Item", "Quantity", "Size"]],
      body: order.items.map((item) => [
        item.name,
        item.quantity.toString(),
        item.size || "-",
      ]),
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.text(`Total Amount: ${currency} ${order.amount}`, 14, finalY);

    const qrData = `
Order ID: ${order._id}
Customer: ${order.address.firstName} ${order.address.lastName}
Amount: ${currency} ${order.amount}
Payment: ${order.payment ? "Done" : "Pending"}
    `;

    const qrCodeDataUrl = await QRCode.toDataURL(qrData);

    doc.addImage(qrCodeDataUrl, "PNG", 150, 20, 40, 40);

    doc.save(`order_${order._id}.pdf`);
  };

  useEffect(() => {
    fetchAllOrders();
  }, [adminToken]);

  return (
    <div>
      <h3>Order Page</h3>
      <div className="h-[calc(100vh-195px)] overflow-y-scroll">
        {orders.map((order, index) => (
          <div
            className="grid rounded grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-gray-200 p-5 md:p-8 md:my-4 text-xs sm:text-sm text-gray-700"
            key={index}
          >
            <video
              className="w-12"
              src={boxvideo}
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="">
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        <span className="font-bold">Product Name</span>:{" "}
                        {item.name} x {item.quantity}
                      </p>
                    );
                  } else {
                    <p className="py-0.5" key={index}>
                      {item.name} x {item.quantity}{" "}
                      <span>{item.size}</span>{" "}
                    </p>;
                  }
                })}
              </div>
              {/* p */}
              <p className="mt-2 font-medium">
                <span className="font-bold">Customer Name</span>:{" "}
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="mb-2">
                <p>{order.address.street + " "}</p>
                <p>
                  {order.address.city +
                    "," +
                    order.address.state +
                    "," +
                    order.address.country +
                    "," +
                    order.address.zipcode}
                </p>
              </div>
              <p>
                {" "}
                <span className="font-bold mt-2">Mobile No</span>:{" "}
                {order.address.phone}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm sm:text-[15px]">
                <span className="font-bold">Total Items</span> :{" "}
                {order.items.length}
              </p>
              <p className="">
                {" "}
                <span className=" font-bold">Payment Method</span>:{" "}
                {order.paymentMethod}
              </p>
              <p
                className={`${
                  order.payment ? "text-green-600" : "text-red-600"
                }`}
              >
                {" "}
                <span className=" font-bold">Payment</span>:
                {order.payment ? "Done" : "Pending"}
              </p>
              <p className="">
                {" "}
                <span className=" font-bold">Date</span>:{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>

              <p className="text-sm sm:text-[15px]">
                <span className="font-bold">Total</span>: {currency}{" "}
                {order.amount}
              </p>
            </div>
            {/* 
            <p className="text-sm bg-green-300 sm:text-[15px]">
              {currency} {order.amount}
            </p> */}

            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="p-2 font-semibold"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out of delivery">Delivered</option>
            </select>

            <button
              onClick={() => generatePDF(order)}
              className="bg-purple-500 text-white py-2.5 px-2 cursor-pointer text-[12px] rounded hover:bg-pink-600"
            >
              Generate Invoice
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
