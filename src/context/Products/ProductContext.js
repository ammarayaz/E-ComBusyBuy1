import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";
import { useAuth } from "../Auth/AuthContext";

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [cartLoading, setCartLoading] = useState(true);
  const { user } = useAuth();

  // Sync cart from Firestore when user is logged in
  useEffect(() => {
    if (!user) {
      setCart({});
      setCartLoading(false);
      return;
    }

    const q = query(collection(db, "cart"), where("user", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const cartObj = {};
      snapshot.forEach((doc) => {
        const item = doc.data();
        cartObj[item.productId] = { ...item, id: doc.id };
      });
      setCart(cartObj);
      setCartLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Add or increase quantity
  const addProductToCart = async (productId) => {
    if (!user) {
      toast.error("Please log in to add to cart");
      return;
    }

    const existingItem = Object.values(cart).find(
      (item) => item.productId === productId
    );

    try {
      if (existingItem) {
        const itemRef = doc(db, "cart", existingItem.id);
        await updateDoc(itemRef, {
          qty: existingItem.qty + 1,
        });
        toast.success("Quantity increased!");
      } else {
        await addDoc(collection(db, "cart"), {
          user: user.uid,
          productId,
          qty: 1,
        });
        toast.success("Product added to cart!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to cart");
    }
  };

  // Remove one quantity
  const removeProductFromCart = async (productId) => {
    const existingItem = Object.values(cart).find(
      (item) => item.productId === productId
    );

    if (!existingItem) return;

    try {
      if (existingItem.qty > 1) {
        const itemRef = doc(db, "cart", existingItem.id);
        await updateDoc(itemRef, {
          qty: existingItem.qty - 1,
        });
        toast.success("Quantity decreased!");
      } else {
        await deleteDoc(doc(db, "cart", existingItem.id));
        toast.success("Product removed from cart!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove from cart");
    }
  };

  // Set quantity explicitly
  const updateCartQuantity = async (productId, quantity) => {
    const existingItem = Object.values(cart).find(
      (item) => item.productId === productId
    );

    if (!existingItem) return;

    try {
      const itemRef = doc(db, "cart", existingItem.id);
      if (quantity > 0) {
        await updateDoc(itemRef, {
          qty: quantity,
        });
        toast.success("Quantity updated");
      } else {
        await deleteDoc(itemRef);
        toast.success("Product removed from cart");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update quantity");
    }
  };

  // Function to create an order
  const handleOrder = async () => {
    if (!user) {
      toast.error("Please log in to place an order");
      return;
    }

    try {
      const cartItemsArray = Object.values(cart);

      // Get product data once (instead of querying Firestore for each item)
      const productsSnapshot = await getDocs(collection(db, "products"));
      const allProducts = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Combine cart and product info
      const cartItemsWithDetails = cartItemsArray.map((item) => {
        const product = allProducts.find((p) => p.id === item.productId);
        return {
          title: product?.title || "Product",
          price: product?.price || 0,
          quantity: item.qty,
          date: new Date(),
        };
      });

      const total = cartItemsWithDetails.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // Save to 'orders' collection
      await addDoc(collection(db, "orders"), {
        cart: cartItemsWithDetails,
        total,
        user: user.uid,
        createdAt: new Date(),
      });

      toast.success("Order created successfully!");
    } catch (err) {
      console.error("Error creating order:", err);
      toast.error("Failed to create order");
    }
  };

  return (
    <ProductContext.Provider
      value={{
        cart,
        cartLoading,
        addProductToCart,
        removeProductFromCart,
        updateCartQuantity,
        handleOrder,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
