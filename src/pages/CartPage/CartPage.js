// src/pages/CartPage/CartPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../../context/Products/ProductContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import Loader from "../../components/UI/Loader/Loader";
import ProductDetails from "../../components/Product/ProductContainer/ProductDetails/ProductDetails";
import styles from "./CartPage.module.css";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, cartLoading, handleOrder } = useProductContext();
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Fetch all products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const productsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
        setLoadingProducts(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (cartLoading || loadingProducts) return <Loader />;

  const cartItems = Object.values(cart);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return total;
      return total + product.price * item.qty;
    }, 0);
  };

  const totalPrice = calculateTotal();

  const handlePurchase = async () => {
    await handleOrder(); // pass in products from useState and  // Create the order and clear the cart

    navigate("/myorders"); // Redirect to orders page
  };

  return (
    <div className={styles.cartPageWrapper}>
      <div className={styles.cartPageContainer}>
        {cartItems.length > 0 ? (
          cartItems.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            if (!product) return null;

            return (
              <div key={product.id} className={styles.ProductContainer}>
                <div className={styles.imageContainer}>
                  <img
                    src={product.image}
                    alt="Product"
                    width="100%"
                    height="100%"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <ProductDetails
                  productId={product.id}
                  title={product.title}
                  price={product.price}
                  quantity={item.qty}
                  onCart={true}
                />
              </div>
            );
          })
        ) : (
          <h1>Cart is Empty!</h1>
        )}
      </div>

      {cartItems.length > 0 && (
        <aside className={styles.totalPrice}>
          <p>Total Price:- ₹{totalPrice}/-</p>
          <button className={styles.purchaseBtn} onClick={handlePurchase}>
            Purchase
          </button>
        </aside>
      )}
    </div>
  );
};

export default CartPage;
