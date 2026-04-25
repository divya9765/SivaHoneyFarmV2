import { useContext, useEffect, useState } from "react";
import { dummyOrders } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const { axios, user } = useContext(AppContext);
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        // Fallback for demo
        setMyOrders(dummyOrders);
      }
    } catch {
      // Fallback for demo
      setMyOrders(dummyOrders);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="mt-12 mb-16 flex justify-center items-center h-[50vh]">
        <p className="text-xl text-gray-500">Please log in to view your orders.</p>
      </div>
    );
  }

  return (
    <div className="mt-12 pb-16">
      <div>
        <p className="text-2xl md:text-3xl font-medium">My Orders</p>
      </div>

      {myOrders.length === 0 ? (
        <div className="mt-8 text-center text-gray-500">
          <p>No orders found.</p>
        </div>
      ) : (
        myOrders.map((order, index) => (
          <div
            key={index}
            className="my-8 border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
          >
            <div className="flex justify-between items-center gap-6">
              <p className="flex flex-wrap gap-4 text-sm md:text-base">
                <span>Order ID: {order._id}</span>
                <span>Payment: {order.paymentType}</span>
                <span>Total: ₹{order.amount}</span>
              </p>
              <button
                onClick={() =>
                  setExpandedOrderId((prev) => (prev === order._id ? null : order._id))
                }
                className="px-3 py-1.5 text-white bg-indigo-500 rounded hover:bg-indigo-600 text-sm"
              >
                {expandedOrderId === order._id ? "Hide" : "Track"}
              </button>
            </div>
            {order.items.map((item, index) => (
              <div
                key={index}
                className={`relative bg-white text-gray-800/70 ${
                  order.items.length !== index + 1 && "border-b"
                } border-gray-300 flex flex-col md:flex-row md:items-center  justify-between p-4 py-5 w-full max-w-4xl`}
              >
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="p-4 rounded-lg">
                    {item.product && item.product.image && item.product.image.length > 0 ? (
                      <img
                        src={
                          item.product.image[0].startsWith("http")
                            ? item.product.image[0]
                            : `http://localhost:5000/images/${item.product.image[0]}`
                        }
                        alt={item.product.name || "Product"}
                        className="w-16 h-16 object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="ml-4">
                    <h2 className="text-xl font-medium">{item.product ? item.product.name : "Unknown Product"}</h2>
                    <p>{item.product ? item.product.category : ""}</p>
                  </div>
                </div>

                <div className=" text-lg font-medium">
                  <p>Quantity:{item.quantity || "1"}</p>
                  <p>Status:{order.status}</p>
                  <p>Date:{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <p className=" text-lg">Amount:₹{(item.product ? item.product.offerPrice : 0) * (item.quantity || 1)}</p>
              </div>
            ))}

            {expandedOrderId === order._id && (
              <div className="mt-4 grid md:grid-cols-3 gap-6">
                {/* Timeline */}
                <div className="md:col-span-2 bg-white border border-gray-200 rounded p-4">
                  <h3 className="text-base font-semibold mb-3">Order Timeline</h3>
                  <div className="flex md:flex-row flex-col gap-6">
                    <div className="flex md:flex-col gap-4">
                      {[
                        "Order Placed",
                        "Confirmed",
                        "Packed",
                        "Shipped",
                        "Delivered",
                      ].map((step, idx) => {
                        const currentIndex = [
                          "Order Placed",
                          "Confirmed",
                          "Packed",
                          "Shipped",
                          "Delivered",
                        ].indexOf(order.status);
                        const active = idx <= (currentIndex === -1 ? 0 : currentIndex);
                        const last = idx === 4;
                        return (
                          <div key={step} className="flex items-start">
                            <div className="flex flex-col items-center mr-3">
                              <div
                                className={`w-3.5 h-3.5 rounded-full ${
                                  active ? "bg-indigo-600" : "bg-gray-300"
                                }`}
                              />
                              {!last && (
                                <div
                                  className={`w-0.5 flex-1 ${
                                    active ? "bg-indigo-300" : "bg-gray-200"
                                  }`}
                                  style={{ minHeight: 24 }}
                                />
                              )}
                            </div>
                            <div
                              className={`text-sm ${
                                active ? "text-indigo-700" : "text-gray-500"
                              }`}
                            >
                              {step}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex-1 text-sm text-gray-600 space-y-2">
                      <p>
                        Placed On: {new Date(order.createdAt).toLocaleString()}
                      </p>
                      <p>
                        Payment: {order.paymentType} ({order.isPaid ? "Paid" : "Pending"})
                      </p>
                      <p>Total Amount: ₹{order.amount}</p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-white border border-gray-200 rounded p-4">
                  <h3 className="text-base font-semibold mb-3">Delivery Address</h3>
                  {order.address ? (
                    <div className="text-sm text-gray-700">
                      <p className="font-medium">
                        {order.address.firstName} {order.address.lastName}
                      </p>
                      <p>{order.address.email}</p>
                      <p className="mt-1">
                        {order.address.street}, {order.address.city}, {order.address.state}, {order.address.zipCode}, {order.address.country}
                      </p>
                      <p className="mt-1">Phone: {order.address.phone}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Address details not available</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};
export default MyOrders;
