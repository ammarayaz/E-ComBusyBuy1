import React from "react";
import styles from "./FilterSidebar.module.css";

const FilterSidebar = ({ setCategories, setPriceRange, priceRange }) => {
  const handleCategoryChange = (e) => {
    const { checked, name } = e.target;
    setCategories((prev) => {
      if (checked) return [...prev, name];
      return prev.filter((category) => category !== name);
    });
  };

  const handlePriceChange = (e) => {
    setPriceRange(Number(e.target.value));
  };

  return (
    <aside className={styles.filterContainer}>
      <h2>Filter</h2>
      <form>
        <label htmlFor="price">Price: {priceRange}</label>
        <input
          type="range"
          id="price"
          name="price"
          min="1"
          max="100000"
          className={styles.priceRange}
          step="10"
          value={priceRange}
          onChange={handlePriceChange}
        />
        <h2>Category</h2>
        <div className={styles.categoryContainer}>
          {[
            {
              id: "mensFashion",
              label: "Men's Clothing",
              value: "men's clothing",
            },
            {
              id: "womensFashion",
              label: "Women's Clothing",
              value: "women's clothing",
            },
            { id: "jewelery", label: "Jewelery", value: "jewelery" },
            { id: "electronics", label: "Electronics", value: "electronics" },
          ].map(({ id, label, value }) => (
            <div className={styles.inputContainer} key={id}>
              <input
                type="checkbox"
                id={id}
                name={value}
                onChange={handleCategoryChange}
              />
              <label htmlFor={id}>{label}</label>
            </div>
          ))}
        </div>
        {/* <div className={styles.categoryContainer}>
          <div className={styles.inputContainer}>
            <input type="checkbox" id="mensFashion" name="mensFashion" />
            <label htmlFor="mensFashion">Men's Clothing</label>
          </div>
          <div className={styles.inputContainer}>
            <input type="checkbox" id="womensFashion" name="womensFashion" />
            <label htmlFor="womensFashion">Women's Clothing</label>
          </div>
          <div className={styles.inputContainer}>
            <input type="checkbox" id="jewelery" name="jewelery" />
            <label htmlFor="jewelery">Jewelery</label>
          </div>
          <div className={styles.inputContainer}>
            <input type="checkbox" id="electronics" name="electronics" />
            <label htmlFor="electronics">Electronics</label>
          </div>
        </div> */}
      </form>
    </aside>
  );
};

export default FilterSidebar;
