import React from "react";

const Pagination = ({
  filteredProducts,
  productsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <div>
      <div className="mt-8 flex justify-center">
        {Array.from(
          { length: Math.ceil(filteredProducts.length / productsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Pagination;
