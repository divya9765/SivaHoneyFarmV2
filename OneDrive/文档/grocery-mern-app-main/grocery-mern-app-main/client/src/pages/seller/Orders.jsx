import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { dummyOrders } from "../../assets/assets";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { axios, isAdmin } = useContext(AppContext);
  const STATUS_STEPS = [
    "Order Placed",
    "Confirmed",
    "Packed",
    "Shipped",
    "Delivered",
  ];
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        setOrders(data.orders);
      } else {
        // Fallback for demo
        setOrders(dummyOrders);
      }
    } catch {
      // Fallback for demo
      setOrders(dummyOrders);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      const { data } = await axios.put(`/api/order/status/${orderId}`, { status });
      if (data.success) {
        toast.success("Order status updated");
        setOrders((prev) => prev.map((o) => (o._id === orderId ? data.order : o)));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium">Orders List</h2>
      {orders.map((order, index) => (
        <div
          key={index}
          className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
        >
          <div className="flex gap-5">
            <img
              className="w-12 h-12 object-cover opacity-60"
              src={
                order.items[0].product.image[0].startsWith("http")
                  ? order.items[0].product.image[0]
                  : `http://localhost:5000/images/${order.items[0].product.image[0]}`
              }
              alt="boxIcon"
            />
            <>
              {order.items.map((item, index) => (
                <div key={index} className="flex flex-col justify-center">
                  <p className="font-medium">
                    {item.product.name}{" "}
                    <span
                      className={`text-indigo-500 ${
                        item.quantity < 2 && "hidden"
                      }`}
                    >
                      x {item.quantity}
                    </span>
                  </p>
                </div>
              ))}
            </>
          </div>

          <div className="text-sm">
            <p className="font-medium mb-1">
              {order.address.firstName} {order.address.lastName}
            </p>
            <p>
              {order.address.street}, {order.address.city}, {order.address.state}, {order.address.zipCode}, {order.address.country}
            </p>
          </div>

          <p className="font-medium text-base my-auto text-black/70">
            ₹{order.amount}
          </p>

          <div className="flex flex-col text-sm">
            <p>Method: {order.paymentType}</p>
            <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
            <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
            <p>Status: {order.status}</p>
            {isAdmin && (
              <div className="mt-2">
                <label className="text-gray-600 text-xs">Update Status</label>
                <select
                  value={order.status}
                  onChange={(e) => {
                    const next = e.target.value;
                    // Prevent moving backward in timeline
                    const currIdx = STATUS_STEPS.indexOf(order.status);
                    const nextIdx = STATUS_STEPS.indexOf(next);
                    if (nextIdx < currIdx) {
                      toast.error("Cannot move status backward");
                      return;
                    }
                    updateStatus(order._id, next);
                  }}
                  className="mt-1 w-full border border-gray-300 bg-white px-3 py-2 rounded"
                >
                  {STATUS_STEPS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Orders;
