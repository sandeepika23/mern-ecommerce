import { useContext , useEffect} from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import "./Wishlist.css";

function Wishlist() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  useEffect(() => {
  document.title = "MyStore | Wishlist";
}, []);

  return (
    <div className="wishlist-page">
      <h1>❤️ My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="empty-cart">

    <h1>❤️</h1>

    <h2>Your Wishlist is Empty</h2>

    <p>
      Save your favourite products here.
    </p>

    <a href="/">
      <button>Browse Products</button>
    </a>

</div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div className="wishlist-card" key={item.id}>
              <img src={item.image} alt={item.name} />

              <h2>{item.name}</h2>

              <p>⭐ {item.rating}</p>

              <h3>{item.price}</h3>

              <button
                className="wishlist-cart-btn"
                onClick={() => addToCart(item)}
              >
                🛒 Add to Cart
              </button>

              <button
                className="wishlist-remove-btn"
                onClick={() => toggleWishlist(item)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;