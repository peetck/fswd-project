import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { PRODUCT_BY_TITLE_QUERY } from "../graphql/queries/productByTitle";
import { NORMAL_PRODUCTS_PAGINATION_QUERY } from "../graphql/queries/normalProductsPagination";
import { useUserContext } from "../contexts/UserContext";

import Item from "../components/Items/Items";

const ProductDetail = () => {
  const { productSlug } = useParams();
  const { updateCart } = useUserContext();

  const [quantity, setQuantity] = useState(1);

  const [colors, setColors] = useState();
  const [sizes, setSizes] = useState();

  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();

  // ลบทีหลัง
  const [index, setIndex] = useState(0);

  const { data: product, loading, error } = useQuery(PRODUCT_BY_TITLE_QUERY, {
    variables: {
      title: productSlug,
    },
  });

  useEffect(() => {
    if (product) {
      const colorArr = [];
      const sizeArr = [];

      for (let prod of product.productByTitle.stock) {
        if (!colorArr.includes(prod.color)) {
          colorArr.push(prod.color);
        }
        if (!sizeArr.includes(prod.size)) {
          sizeArr.push(prod.size);
        }
      }

      setColors(colorArr);
      setSizes(sizeArr);
    }
  }, [product]);

  const handleQuantity = (n) => {
    if (quantity + n <= 0 || quantity + n > product.productByTitle.quantity) {
      return;
    }

    if (selectedColor && selectedSize) {
      const prod = product.productByTitle.stock.find(
        (p) => p.color === selectedColor && p.size === selectedSize
      );
      if (quantity + n > prod.quantity) {
        return;
      }
    }

    setQuantity((prev) => prev + n);
  };

  useEffect(() => {
    if (selectedColor && selectedSize) {
      const prod = product.productByTitle.stock.find(
        (p) => p.color === selectedColor && p.size === selectedSize
      );

      if (quantity > prod.quantity) {
        setQuantity(1);
      }
    }
  }, [selectedColor, selectedSize]);

  // //every change product is set quantity to 0
  // useEffect(() => {
  //   setQuantity(0);
  // }, [productSlug]);

  // if (loading || loadingNormalProduct) {
  //   return <h1>Loading...</h1>;
  // }

  // // Increase of quantity
  // const increaseQuantity = () => {
  //   if (quantity < product.productByTitle.quantity) setQuantity(quantity + 1);
  // };

  // // Reduce of quantity
  // const reduceQuantity = () => {
  //   if (quantity > 0) setQuantity(quantity - 1);
  // };

  // // Change image
  // const changeImage = (e) => {
  //   let id = Number(e.target.id);
  //   if (id < product?.productByTitle.images.length) setIndex(id);
  // };

  return (
    <div className="bg-white">
      <main className="my-8">
        <div className="container mx-auto px-6">
          <div className="md:flex md:items-center">
            <div className="w-full h-64 md:w-1/2 lg:h-96">
              <img
                className="h-full w-full rounded-md object-cover max-w-lg mx-auto"
                src={`${product?.productByTitle.images[index]}`}
                alt="Nike Air"
              />
            </div>
            <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
              <h3 className="text-gray-700 uppercase text-lg">
                {product?.productByTitle.title}
              </h3>
              <span className="text-gray-500 mt-3">
                {product?.productByTitle.price} THB
              </span>
              <hr className="my-3" />

              <div className="mt-3">
                <label className="text-gray-700 text-sm" htmlFor="count">
                  Color:
                </label>
                <div className="flex items-center mt-1">
                  {colors?.map((color) => {
                    for (let prod of product.productByTitle.stock) {
                      if (
                        (selectedSize ? prod.size === selectedSize : true) &&
                        prod.color === color &&
                        prod.quantity > 0
                      ) {
                        return (
                          <h1
                            onClick={() =>
                              color === selectedColor
                                ? setSelectedColor()
                                : setSelectedColor(color)
                            }
                            className={
                              color === selectedColor
                                ? "text-blue-600"
                                : "text-black"
                            }
                          >
                            {color} -{" "}
                          </h1>
                        );
                      }
                    }
                    return (
                      <button disabled className="text-gray-400">
                        {color} -{" "}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="mt-3">
                <label className="text-gray-700 text-sm" htmlFor="count">
                  Size:
                </label>
                <div className="flex items-center mt-1">
                  {sizes?.map((size) => {
                    for (let prod of product.productByTitle.stock) {
                      if (
                        (selectedColor ? prod.color === selectedColor : true) &&
                        prod.size === size &&
                        prod.quantity > 0
                      ) {
                        return (
                          <button
                            onClick={() =>
                              size === selectedSize
                                ? setSelectedSize()
                                : setSelectedSize(size)
                            }
                            className={
                              size === selectedSize
                                ? "text-blue-600"
                                : "text-black"
                            }
                          >
                            {size} -{" "}
                          </button>
                        );
                      }
                    }
                    return (
                      <button disabled className="text-gray-400">
                        {size} -{" "}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-2">
                <label className="text-gray-700 text-sm" htmlFor="count">
                  Quantity:
                </label>
                <div className="flex items-center mt-1">
                  <button
                    className="text-gray-500 focus:outline-none focus:text-gray-600"
                    onClick={() => handleQuantity(-1)}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </button>
                  <span className="text-gray-700 text-lg mx-2">{quantity}</span>
                  <button
                    className="text-gray-500 focus:outline-none focus:text-gray-600"
                    onClick={() => handleQuantity(1)}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center mt-6">
                <button
                  className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                  onClick={() => {
                    updateCart(
                      product.productByTitle._id,
                      quantity,
                      false,
                      selectedColor,
                      selectedSize
                    );
                  }}
                >
                  Add to Cart
                </button>
                <button className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-16">
            <h3 className="text-gray-600 text-2xl font-medium">
              More Products
            </h3>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
