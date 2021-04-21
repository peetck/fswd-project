import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { PRODUCT_BY_TITLE_QUERY } from "../graphql/queries/productByTitle";
import { NORMAL_PRODUCTS_QUERY } from "../graphql/queries/normalProducts";
import { useUserContext } from "../contexts/UserContext";

import Card from '../components/Cards/Card';

const ProductDetail = () => {
  const { productSlug } = useParams();
  const { updateCart } = useUserContext();
  const [quantity, setQuantity] = useState(0);

  const { data: product, loading, error } = useQuery(PRODUCT_BY_TITLE_QUERY, {
    variables: {
      title: productSlug,
    },
  });

  const {
    data: products,
    loading: loadingProducts,
    error: errorProducts,
  } = useQuery(NORMAL_PRODUCTS_QUERY);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  // increase of quantity
  const increaseQuantity = () => {
    if (quantity < product.productByTitle.quantity)
      setQuantity(quantity + 1);
  }

  // reduce of quantity
  const reduceQuantity = () => {
    if (quantity > 0)
    setQuantity(quantity - 1)
  }

  return (

    <div class="bg-white">

      <main class="my-8">
        <div class="container mx-auto px-6">
          <div class="md:flex md:items-center">
            <div class="w-full h-64 md:w-1/2 lg:h-96">
              <img class="h-full w-full rounded-md object-cover max-w-lg mx-auto" src={`${product?.productByTitle.images[0]}`} alt="Nike Air" />
            </div>
            <div class="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
              <h3 class="text-gray-700 uppercase text-lg">{product?.productByTitle.title}</h3>
              <span class="text-gray-500 mt-3">{product?.productByTitle.price} THB</span>
              <hr class="my-3" />
              <div class="mt-2">
                <label class="text-gray-700 text-sm" for="count">Count:</label>
                <div class="flex items-center mt-1">
                  <button class="text-gray-500 focus:outline-none focus:text-gray-600" onClick = {reduceQuantity}>
                    <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </button>
                  <span class="text-gray-700 text-lg mx-2">{quantity}</span>
                  <button class="text-gray-500 focus:outline-none focus:text-gray-600" onClick = {increaseQuantity}>
                    <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </button>
                </div>
              </div>
              <div class="mt-3">
                <label class="text-gray-700 text-sm" for="count">Color:</label>
                <div class="flex items-center mt-1">
                  <button class="h-5 w-5 rounded-full bg-blue-600 border-2 border-blue-200 mr-2 focus:outline-none"></button>
                  <button class="h-5 w-5 rounded-full bg-teal-600 mr-2 focus:outline-none"></button>
                  <button class="h-5 w-5 rounded-full bg-pink-600 mr-2 focus:outline-none"></button>
                </div>
              </div>
              <div class="flex items-center mt-6">
                <button class="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500" onClick = {() => {
                  updateCart(product.productByTitle._id, quantity, false)
                }}>Add to Cart</button>
                <button class="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                  <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </button>
              </div>
            </div>
          </div>
          <div class="mt-16">
            <h3 class="text-gray-600 text-2xl font-medium">More Products</h3>
            <div className="flex">
              {products?.normalProducts.map((product) => (
                <Card
                  key={product._id}
                  title={product.title}
                  imageUrl={product.images[0]}
                  price={product.price}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
