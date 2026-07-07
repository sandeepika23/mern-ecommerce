import { useEffect, useState } from "react";
import API from "../api/api";
import "./Orders.css";
import toast from "react-hot-toast";
function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    document.title = "MyStore | Orders";
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "80px",
          }}
        >
          <h2>📦 No Orders Yet</h2>

          <p>Start shopping to place your first order.</p>
        </div>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <h2>Order #{order._id.slice(-6).toUpperCase()}</h2>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <p style={{ margin: "15px 0" }}>
              <strong>Status: </strong>

              <span
                style={{
                  background:
                    order.status === "Delivered"
                      ? "#dcfce7"
                      : "#fef3c7",
                  color:
                    order.status === "Delivered"
                      ? "#15803d"
                      : "#ca8a04",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontWeight: "bold",
                }}
              >
                {order.status}
              </span>
            </p>

            <h3>Products</h3>

            {order.products.map((product) => (
              <div
                key={product.productId}
                className="order-product"
              >
                <img
                  src={product.image}
                  alt={product.name}
                />

                <div>
                  <h4>{product.name}</h4>

                  <p>
                    ₹
                    {Number(product.price).toLocaleString()}
                  </p>

                  <p>Quantity : {product.quantity}</p>
                </div>
              </div>
            ))}

            <hr />

            <h2
              style={{
                color: "#2563eb",
                marginTop: "20px",
              }}
            >
              Total : ₹
              {Number(order.total).toLocaleString()}
            </h2>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;