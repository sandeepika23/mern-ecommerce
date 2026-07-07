import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Wishlist from "./pages/Wishlist";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={ <Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route
  path="/wishlist"
  element={
    <ProtectedRoute>
      <Wishlist />
    </ProtectedRoute>
  }
/>
        <Route path="/register" element={<Register />} />
        <Route
  path="/orders"
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/>
    <Route
  path="/checkout"
  element={<Checkout />}
/>
    <Route
  path="/profile"
  element={<Profile />}
/>
<Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;