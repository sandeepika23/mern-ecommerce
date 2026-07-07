import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import { CartContext } from "../context/CartContext";
import "./ProductDetails.css";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
 const [relatedProducts, setRelatedProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
 const [quantity, setQuantity] = useState(1);
  useEffect(() => {
   const fetchProduct = async () => {
  try {
    const res = await API.get(`/products/${id}`);
    setProduct(res.data);

    const allProducts = await API.get("/products");

    const related = allProducts.data.filter(
      (item) =>
        item.category === res.data.category &&
        item._id !== res.data._id
    );

    setRelatedProducts(related);
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

    fetchProduct();
  }, [id]);
  useEffect(() => {
  if (product) {
    document.title = product.name;
  }
}, [product]);

 if (loading) {
  return <Loading />;
}
  return (
    <div className="details-container">

      <div className="details-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="details-info">

        <h1>{product.name}</h1>

        <h3>⭐ {product.rating} / 5</h3>

        <h2>₹{Number(product.price).toLocaleString()}</h2>

        <p>{product.description}</p>

        <p>
          <strong>Category:</strong> {product.category}
        </p>

        <p
          style={{
            color: product.stock ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {product.stock ? "In Stock" : "Out of Stock"}
        </p>

        <div className="quantity-box">

  <button
    onClick={() =>
      quantity > 1 && setQuantity(quantity - 1)
    }
  >
    -
  </button>

  <span>{quantity}</span>

  <button
    onClick={() =>
      setQuantity(quantity + 1)
    }
  >
    +
  </button>

</div>

<button
  disabled={!product.stock}
  onClick={() =>
    addToCart({
      ...product,
      quantity,
    })
  }
>
  {product.stock ? "🛒 Add to Cart" : "Out of Stock"}
</button>
        <hr style={{ margin: "50px 0" }} />

<h2>You May Also Like</h2>

<div className="related-products">

  {relatedProducts.map((item) => (

    <div
      key={item._id}
      className="related-card"
    >

      <Link
  to={`/product/${item._id}`}
  className="related-card"
  style={{
    textDecoration: "none",
    color: "inherit",
  }}
>
  <img src={item.image} alt={item.name} />

  <h4>{item.name}</h4>

  <p>₹{item.price}</p>
</Link>

    </div>

  ))}

</div>
      </div>

    </div>
  );
}

export default ProductDetails;