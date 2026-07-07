import "./Hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <h1>
  Discover the <br />
  Latest Tech
</h1>

        <p>
          Shop premium electronics at unbeatable prices.
          Fast delivery, secure payments and top quality products.
        </p>

        <Link to="/">
          <button>Shop Now</button>
        </Link>

      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900"
          alt="Electronics"
        />
      </div>

    </section>
  );
}

export default Hero;