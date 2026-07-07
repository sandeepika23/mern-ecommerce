import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
export const CartContext = createContext();

function CartProvider({ children }) {

  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  // Cart State
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  

  // Add to Cart
  const addToCart = (product) => {
    toast.success("Product added to cart");
    setCart((prevCart) => {

      const existingProduct = prevCart.find(
        (item) => item._id === product._id
      );

      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      

      return [
  ...prevCart,
  {
    ...product,
    quantity: product.quantity || 1,
  },
];

    });
  };

  // Increase Quantity
  const increaseQuantity = (_id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id ===_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (_id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === _id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove
 const removeFromCart = (id) => {

  toast.success("Removed from cart");

  setCart((prevCart) =>
    prevCart.filter((item) => item._id !==_id)
  );
};


  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        isLoggedIn,
        setIsLoggedIn,
        logout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;