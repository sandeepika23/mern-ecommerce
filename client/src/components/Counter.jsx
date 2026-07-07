import {useState} from "react";
function Counter() {
    const [count,setCount]=useState(0);
    return (
        <div>
            <h2 style={{ color: "black" }}>Counter: {count}</h2>
           <button onClick={() => console.log("Added to Cart")}>
           Add to Cart
            </button>
        </div>
    );
}
export default Counter;