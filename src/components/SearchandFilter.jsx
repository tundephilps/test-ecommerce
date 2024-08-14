import React from "react";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";

const SearchandFilter = ({
  sortBy,
  setPriceRange,
  priceRange,
  categories,
  selectedCategory,
  setSelectedCategory,
  search,
  setSearch,
  setSortBy,
  setView,
  view,
}) => {
  return (
    <div>
      <div className="mb-8">
        <input
          class="bg-zinc-200 w-full text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-slate-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-blue-400"
          autocomplete="off"
          placeholder="Search Products"
          name="text"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* <input
          type="text"
          placeholder="Search products..."
      
          className="w-full p-2 border rounded"
        /> */}
      </div>

      <div className="flex flex-wrap mb-8">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-full mr-4 mb-4 bg-zinc-200"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min Price"
          onChange={(e) =>
            setPriceRange({ ...priceRange, min: Number(e.target.value) || 0 })
          }
          className="p-2 border rounded-full mr-4 mb-4 bg-zinc-200"
        />
        <input
          type="number"
          placeholder="Max Price"
          onChange={(e) =>
            setPriceRange({
              ...priceRange,
              max: Number(e.target.value) || Infinity,
            })
          }
          className="p-2 border rounded-full mr-4 mb-4 bg-zinc-200"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded-full mr-4 mb-4 bg-zinc-200"
        >
          <option value="">Sort By</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="name">Name</option>
          <option value="rating">Rating</option>
        </select>

        <label class="relative inline-flex items-center cursor-pointer pb-4 ">
          <input
            class="sr-only peer h-12 w-12"
            value=""
            type="checkbox"
            onClick={() => setView(view === "grid" ? "list" : "grid")}
          />
          <div class="group peer ring-0 bg-gray-50 border-2 border-gray-900 rounded-full outline-none duration-700 after:duration-200 w-24 h-12  shadow-md peer-checked:bg-gradient-to-r  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute after:bg-gray-900 after:outline-none after:h-10 after:w-10 after:top-1 after:left-1  peer-checked:after:translate-x-12 peer-hover:after:scale-95">
            <FaListAlt class="absolute  top-[20%] right-[10%] fill-green-600 w-6 h-6" />

            <BsFillGridFill class="absolute  top-[20%] left-[10%] fill-red-600  w-6 h-6" />
          </div>
        </label>
      </div>
    </div>
  );
};

export default SearchandFilter;
