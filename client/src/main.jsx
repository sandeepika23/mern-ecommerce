import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import WishlistProvider from "./context/WishlistContext";
import { Toaster } from "react-hot-toast";
import App from "./App";
import CartProvider from "./context/CartContext";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <Toaster
        position="top-right"
        reverseOrder={false}
    />
      <CartProvider>
        <WishlistProvider>
        <App />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);