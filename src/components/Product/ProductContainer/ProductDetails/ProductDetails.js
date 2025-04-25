// src/components/Products/ProductCard/ProductDetails.js
import React, { useState } from "react";
import styles from "./ProductDetails.module.css";
import MinusIcon from "../../../UI/Icons/MinusIcon";
import PlusIcon from "../../../UI/Icons/PlusIcon";
import { useProductContext } from "../../../../context/Products/ProductContext";

const ProductDetails = ({
  productId,
  title,
  price,
  quantity = 1,
  onCart = false,
}) => {
  const [productAddingToCart, setProductAddingToCart] = useState(false);
  const [productRemovingFromCart, setProductRemovingCart] = useState(false);
  const [qty, setQty] = useState(quantity);

  const { addProductToCart, removeProductFromCart, updateCartQuantity } =
    useProductContext();

  const handleIncrease = async () => {
    setProductAddingToCart(true);
    await addProductToCart(productId);
    setQty((prev) => prev + 1);
    setProductAddingToCart(false);
  };

  const handleDecrease = async () => {
    if (qty === 1) return;
    setProductRemovingCart(true);
    await removeProductFromCart(productId);
    setQty((prev) => prev - 1);
    setProductRemovingCart(false);
  };

  const handleAddToCart = async () => {
    setProductAddingToCart(true);
    await addProductToCart(productId);
    setQty(1);
    setProductAddingToCart(false);
  };

  const handleRemoveFromCart = async () => {
    setProductRemovingCart(true);
    await updateCartQuantity(productId, 0);
    setQty(0);
    setProductRemovingCart(false);
  };

  return (
    <div className={styles.productDetails}>
      <div className={styles.productName}>
        <p>{`${title.slice(0, 35)}...`}</p>
      </div>
      <div className={styles.productOptions}>
        <p>₹ {price}</p>
        {onCart && (
          <div className={styles.quantityContainer}>
            <MinusIcon handleRemove={handleDecrease} />
            <p>{qty}</p>
            <PlusIcon handleAdd={handleIncrease} />
          </div>
        )}
      </div>

      {!onCart ? (
        <button
          className={styles.addBtn}
          title="Add to Cart"
          onClick={handleAddToCart}
          disabled={productAddingToCart}
        >
          {productAddingToCart ? "Adding..." : "Add To Cart"}
        </button>
      ) : (
        <button
          className={styles.removeBtn}
          title="Remove from Cart"
          onClick={handleRemoveFromCart}
          disabled={productRemovingFromCart}
        >
          {productRemovingFromCart ? "Removing..." : "Remove"}
        </button>
      )}
    </div>
  );
};

export default ProductDetails;
