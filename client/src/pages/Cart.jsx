import { useContext , useEffect} from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);
  useEffect(() => {
  document.title = "MyStore | Cart";
}, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();
  const placeOrderHandler = async () => {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login first");
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  try {

    const res = await fetch("http://localhost:5000/orders", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        userId: user.id,
        products: cart,
        total,
      }),
    });

    const data = await res.json();

    alert("Order Placed Successfully!");

    console.log(data);

  } catch (error) {
    console.log(error);
  }

};
  return (
    <div className="cart-page">

      <div className="cart-items">

        <h1>Shopping Cart</h1>

        {cart.length === 0 ? (
  <div className="empty-cart">

    <h1>🛒</h1>

    <h2>Your Cart is Empty</h2>

    <p>
      Looks like you haven't added anything yet.
    </p>

    <a href="/">
      <button>Continue Shopping</button>
    </a>

  </div>
) : (
          cart.map((item) => (
            <div
              className="cart-card"
              key={item._id}
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div className="cart-info">

                <h2>{item.name}</h2>

                <p>⭐ {item.rating}</p>

                <h3>₹{item.price}</h3>

                <div className="quantity">

                  <button
                    onClick={() =>
                      decreaseQuantity(item._id)
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      increaseQuantity(item._id)
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeFromCart(item._id)
                  }
                >
                  🗑 Remove
                </button>

              </div>

            </div>
          ))
        )}

      </div>

      <div className="summary">

        <h2>Order Summary</h2>

        <p>
          Subtotal
          <span>₹{total}</span>
        </p>

        <p>
         Shipping
<span style={{color:"green"}}>
FREE
</span>
        </p>

        <hr />

        <h3>
          Total
          <p
style={{
marginTop:"20px",
fontSize:"14px",
color:"#666"
}}
>
Secure Checkout 🔒
</p>
          <span>₹{total}</span>
        </h3>

       <button
  className="checkout-btn"
  onClick={() => navigate("/checkout")}
>
  Proceed to Checkout
</button>

      </div>

    </div>
  );
}

export default Cart;