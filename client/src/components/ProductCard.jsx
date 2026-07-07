import "./ProductCard.css";
import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { Link } from "react-router-dom";
function ProductCard(props) {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  const isWishlisted = wishlist.some(
    (item) => item.id === props.id
  );

  return (
    <div className="product-card">

      <span className="sale-badge">SALE</span>

      <button
        className="wishlist-btn"
        onClick={() =>
          toggleWishlist({
            id: props.id,
            name: props.name,
            price: props.price,
            image: props.image,
            rating: props.rating,
          })
        }
      >
        {isWishlisted ? "❤️" : "🤍"}
      </button>

      <Link
  to={`/product/${props.id}`}
  style={{
    textDecoration: "none",
    color: "inherit",
  }}
>
  <img src={props.image} alt={props.name} />

  <h3>{props.name}</h3>
</Link>
      <p className="rating">
        ⭐ {props.rating} / 5
      </p>
      <p
  style={{
    color: props.stock ? "green" : "red",
    fontWeight: "bold"
  }}
>
  {props.stock ? "In Stock" : "Out of Stock"}
</p>
<p className="category">
{props.category}
</p>

      <h2 className="price">
₹{Number(props.price).toLocaleString()}
</h2>

      <button
className="cart-btn"
onClick={props.onAddToCart}
disabled={!props.stock}
>
{props.stock ? "🛒 Add to Cart" : "Out of Stock"}
</button>

    </div>
  );
}

export default ProductCard;