import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import "./Navbar.css";

function Navbar() {
  const {
    cart,
    logout,
  } = useContext(CartContext);

  const { wishlist } = useContext(WishlistContext);

  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));

  const cartItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      <div className="logo">
        🛍 <span>MyStore</span>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/">Products</Link>
        </li>

        <li>
          <Link to="/wishlist">
            ❤️ Wishlist ({wishlist.length})
          </Link>
        </li>

        <li>
          <Link to="/cart">
            🛒 Cart ({cartItems})
          </Link>
        </li>

        {token && (
          <>
            <li>
              <Link to="/orders">Orders</Link>
            </li>

            <li>
              <Link to="/profile">
                👤 {user?.name || "Profile"}
              </Link>
            </li>

            <li>
              <button
                className="logout-btn"
                onClick={() => {
                  const confirmLogout = window.confirm(
                    "Are you sure you want to logout?"
                  );

                  if (!confirmLogout) return;

                  logout();

                  window.location.reload();
                }}
              >
                Logout
              </button>
            </li>
          </>
        )}

        {!token && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;