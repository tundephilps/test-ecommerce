import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./components/Pagination";
import SearchandFilter from "./components/SearchandFilter";

const App = () => {
  // These are variables to manage data in the component:
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [sortBy, setSortBy] = useState("");
  const [view, setView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // New loading state
  const productsPerPage = 8;

  // This function is called automatically when the component loads:
  // setLoading(true): Marks that data is being fetched.
  // axios.get: Sends a request to the given URL to get product data.
  // setProducts: Stores the fetched data in the products state.
  // setFilteredProducts: Initializes the filtered list with all fetched products.
  // catch block: Catches and logs any errors that occur during the fetch.
  // finally: Marks the loading as complete, whether the fetch succeeded or failed.

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    //     Fetch Categories: This function fetches the product categories:
    // axios.get: Sends a request to the given URL to get category data.
    // setCategories: Stores the fetched data in the categories state.
    // catch block: Logs any errors if the fetch fails.

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  //   Filtering and Sorting: This code runs whenever products, search, selectedCategory, priceRange, or sortBy changes:
  // result = products: Start with the full list of products.
  // Search Filter: If the user searches, filter products that match the search term in their title.
  // Category Filter: If a category is selected, filter products that belong to that category.
  // Price Range Filter: Filter products within the selected price range.
  // Sorting: Sort products based on the selected sorting option (e.g., by price, name, or rating).
  // setFilteredProducts(result): Update the filteredProducts state with the final filtered and sorted list.
  // setCurrentPage(1): Reset pagination to the first page.
  useEffect(() => {
    let result = products;

    if (search) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    result = result.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    );

    if (sortBy === "priceLow") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHigh") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [products, search, selectedCategory, priceRange, sortBy]);

  // Pagination Logic: Determines which products to show on the current page:
  // indexOfLastProduct: Calculates the last product's index on the current page.
  // indexOfFirstProduct: Calculates the first product's index on the current page.
  // currentProducts: Slices the filteredProducts array to get the products for the current page.

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="p-12 bg-slate-300">
      <h1 className="text-3xl font-bold pb-4">One Piece Shop</h1>

      <SearchandFilter
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sortBy={sortBy}
        setSortBy={setSortBy}
        setView={setView}
        view={view}
      />

      {loading ? (
        <div className="text-center">Loading...</div> // Loading message
      ) : (
        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              : "space-y-4"
          }
        >
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="w-full bg-neutral-800 rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 hover:bg-gray-900 hover:shadow-2xl hover:shadow-sky-400 transition-shadow"
            >
              <img src={product.image} className="w-full h-44 rounded-2xl" />
              <div className="">
                <p className="font-extrabold">{product.title}</p>
                <p className=""> {product.description.slice(0, 100)}...</p>
              </div>
              <button className="bg-sky-700 font-extrabold p-2 px-6 rounded-xl hover:bg-sky-500 transition-colors">
                ${product.price.toFixed(2)}
              </button>
            </div>
          ))}
        </div>
      )}

      <Pagination
        filteredProducts={filteredProducts}
        productsPerPage={productsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default App;
