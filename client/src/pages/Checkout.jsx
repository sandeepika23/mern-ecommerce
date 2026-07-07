import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

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
      await API.post(
        "/orders",
        {
          items: cart,
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
    } catch (error) {
      console.log(error);
      alert("Order Failed");
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