import React, { useEffect, useState, useContext } from "react";
import styles from "./HomePage.module.css";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import ProductList from "../../components/Product/ProductList/ProductList";
import {
  writeBatch,
  doc,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { addDataToCollection, getNewItemsFromDataJs } from "../../utils/utils";

function HomePage() {
  // Write logic to Fetch products on app mount
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(75000); // Initial filter value
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const seedAndFetchProducts = async () => {
      const productSnapshot = await getDocs(collection(db, "products"));
      if (productSnapshot.empty) {
        await addDataToCollection(); //Seed the database first time
      } else {
        //Fetch new items from Data.js
        const newItems = await getNewItemsFromDataJs();

        //check for any new item and add them to collection
        const batch = writeBatch(db);
        for (const item of newItems) {
          const docRef = doc(db, "products", item.id.toString());
          batch.set(docRef, item);

          const res = await batch.commit();

          //  await addDoc(collection(db, "products"), item);
        }
      }

      const updateSnapshot = await getDocs(collection(db, "products"));
      const products = updateSnapshot.docs.map((doc) => doc.data());
      setAllProducts(products);
      setFilteredProducts(products);
      setLoading(false);
    };
    seedAndFetchProducts();
  }, []);

  useEffect(() => {
    let filtered = allProducts;
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categories.length > 0) {
      filtered = filtered.filter((product) =>
        categories.includes(product.category)
      );
    }

    filtered = filtered.filter((product) => product.price <= priceRange);

    setFilteredProducts(filtered);
  }, [searchQuery, allProducts, priceRange, categories]);

  // Write logic to Rerender the products if the search or filter parameters change

  // Display loader while products are fetching

  return (
    <div className={styles.homePageContainer}>
      <FilterSidebar
        setCategories={setCategories}
        setPriceRange={setPriceRange}
        priceRange={priceRange}
      />
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <input
          type="search"
          placeholder="Search By Name"
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      {/* Write logic to display the product using the ProductList */}
      {loading ? (
        <p>Loading Products...</p>
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
}

export default HomePage;
