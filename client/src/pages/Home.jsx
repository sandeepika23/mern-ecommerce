import { useState, useEffect, useContext } from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import "../App.css";
import Loading from "../components/Loading";

function Home() {
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
 const [category, setCategory] = useState("All");
const [sort, setSort] = useState("");
useEffect(() => {
  document.title = "MyStore | Home";
}, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCartHandler = async (product) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      await fetch("http://localhost:5000/cart", {
    method: "POST",

    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },

    body: JSON.stringify({
    productId: product._id,
    name: product.name,
    price: product.price,
    image: product.image,
    rating: product.rating,
}),
});

      addToCart(product);

      alert("Added to Cart");
    } catch (error) {
      console.log("Error adding to cart:", error);
    }
  };

 let filteredProducts = products.filter((product) => {
  const matchSearch = product.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchCategory =
    category === "All" || product.category === category;

  return matchSearch && matchCategory;
});

if (sort === "low") {
  filteredProducts.sort((a, b) => a.price - b.price);
}

if (sort === "high") {
  filteredProducts.sort((a, b) => b.price - a.price);
}

if (sort === "rating") {
  filteredProducts.sort((a, b) => b.rating - a.rating);
}

  return (
    <>
      <Hero />

      <div style={{ textAlign: "center", margin: "20px" }}>
        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
  width: "420px",
  maxWidth: "90%",
  padding: "14px 18px",
  borderRadius: "30px",
  border: "1px solid #ddd",
  outline: "none",
  fontSize: "16px",
  boxShadow: "0 5px 15px rgba(0,0,0,.08)"
}}
        />
      </div>
      <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap",
  }}
>
  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
    <option>All</option>
    <option>Audio</option>
    <option>Computers</option>
    <option>Wearables</option>
    <option>Phones</option>
  </select>

  <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
  >
    <option value="">Sort By</option>
    <option value="low">Price: Low to High</option>
    <option value="high">Price: High to Low</option>
    <option value="rating">Highest Rated</option>
  </select>
</div>
      <div className="products-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              image={product.image}
              rating={product.rating}
              stock={product.stock}
              category={product.category}
              onAddToCart={() => addToCartHandler(product)}
            />
          ))
        ) : (
          <h2 style={{ textAlign: "center", width: "100%" }}>
            No Products Found
          </h2>
        )}
      </div>
    </>
  );
}

export default Home;