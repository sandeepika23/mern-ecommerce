import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function Checkout() {
  const { cart, setCart } = useContext(CartContext);

  const navigate = useNavigate();

  const [address, setAddress] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
const placeOrder = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    await API.post(
      "/orders",
      {
        userId: user._id,

        products: cart.map((item) => ({
          productId: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),

        total,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    toast.success("Order placed successfully 🎉");

    localStorage.removeItem("cart");
    setCart([]);

    navigate("/orders");

  }catch (error) {
  console.log("Order Error:", error.response?.data);
  console.log(error);

  toast.error(error.response?.data?.message || "Order Failed");
}
};
  

  return (
    <div className="checkout-page">

      <h1>Checkout</h1>

      <textarea
        placeholder="Enter Delivery Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        rows="5"
        style={{
          width: "100%",
          marginBottom: "20px",
        }}
      />

      <h2>Total : ₹{total}</h2>

      <button onClick={placeOrder}>
        Place Order
      </button>

    </div>
  );
}

export default Checkout;