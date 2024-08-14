import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import App from "./App"; // Adjust the import path based on where your App component is located

const mock = new MockAdapter(axios);

const mockProducts = [
  {
    id: 1,
    title: "Product A",
    category: "Category 1",
    price: 10,
    rating: { rate: 4 },
    image: "image-a.jpg",
    description: "Description A",
  },
  {
    id: 2,
    title: "Product B",
    category: "Category 2",
    price: 20,
    rating: { rate: 3 },
    image: "image-b.jpg",
    description: "Description B",
  },
  {
    id: 3,
    title: "Product C",
    category: "Category 1",
    price: 30,
    rating: { rate: 5 },
    image: "image-c.jpg",
    description: "Description C",
  },
  {
    id: 4,
    title: "Product D",
    category: "Category 2",
    price: 40,
    rating: { rate: 2 },
    image: "image-d.jpg",
    description: "Description D",
  },
];

const mockCategories = ["Category 1", "Category 2"];

describe("App Component", () => {
  beforeEach(() => {
    mock.onGet("https://fakestoreapi.com/products").reply(200, mockProducts);
    mock
      .onGet("https://fakestoreapi.com/products/categories")
      .reply(200, mockCategories);
  });

  afterEach(() => {
    mock.reset();
  });

  test("renders product list", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Product A")).toBeInTheDocument();
      expect(screen.getByText("Product B")).toBeInTheDocument();
    });
  });

  test("filters products by search", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Product A")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Search products..."), {
      target: { value: "Product A" },
    });

    expect(screen.queryByText("Product B")).not.toBeInTheDocument();
  });

  test("filters products by category", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Product A")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByDisplayValue("All Categories"), {
      target: { value: "Category 1" },
    });

    expect(screen.getByText("Product A")).toBeInTheDocument();
    expect(screen.queryByText("Product B")).not.toBeInTheDocument();
  });

  test("sorts products by price (low to high)", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Product A")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByDisplayValue("Sort By"), {
      target: { value: "priceLow" },
    });

    const productTitles = screen.getAllByRole("heading", { level: 2 });
    expect(productTitles[0]).toHaveTextContent("Product A");
    expect(productTitles[1]).toHaveTextContent("Product B");
    expect(productTitles[2]).toHaveTextContent("Product C");
    expect(productTitles[3]).toHaveTextContent("Product D");
  });

  test("handles pagination", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Product A")).toBeInTheDocument();
    });

    const nextPageButton = screen.getByText("2");
    fireEvent.click(nextPageButton);

    await waitFor(() => {
      expect(screen.queryByText("Product A")).not.toBeInTheDocument();
    });
  });

  test("toggles view mode between grid and list", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Product A")).toBeInTheDocument();
    });

    const toggleButton = screen.getByText("Toggle View");
    fireEvent.click(toggleButton);

    expect(screen.getByText("Product A")).toBeInTheDocument();
    expect(screen.getByText("Product B")).toBeInTheDocument();
  });
});
