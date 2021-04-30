import React, { useEffect } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

import Button from "../components/Button";
import ProductList from "../components/ProductList";

const NORMAL_PRODUCTS_QUERY = gql`
  query {
    normalProducts(limit: 5) {
      _id
      title
      description
      price
      images
      totalStock
      stock {
        quantity
        color
        size
      }
      createdAt
      updatedAt
    }
  }
`;

const PROMOTION_PRODUCTS_QUERY = gql`
  query {
    promotionProducts(limit: 5) {
      _id
      title
      description
      price
      images
      totalStock
      stock {
        quantity
        color
        size
      }
      type
      priceAfterDiscount
      percent
    }
  }
`;

const Home = () => {
  const [
    fetchProducts,
    { data: products, loading: loadingProducts, error: errorProducts },
  ] = useLazyQuery(NORMAL_PRODUCTS_QUERY);

  const [
    fetchPromotions,
    { data: promotions, loading: loadingPromotions, error: errorPromotions },
  ] = useLazyQuery(PROMOTION_PRODUCTS_QUERY);

  useEffect(() => {
    fetchProducts();
    fetchPromotions();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="container flex flex-col mx-auto md:flex-row mb-20 py-12">
        <div className="flex flex-col w-full justify-center text-center lg:text-left lg:w-2/3">
          <h1 className="mb-4 text-5xl font-bold leading-tight uppercase">
            Running with the Mind of Meditation
          </h1>
          <p className="leading-normal text-xl mb-8">
            Unlock your potential and take your shoes to the next level with
            special designs that allow you to do things you have never been able
            to do before.
          </p>
          <div className="w-1/2 mx-auto lg:mx-0">
            <Button>shop collection</Button>
          </div>
        </div>
        <div className="hidden w-full justify-center lg:flex">
          <img
            src={process.env.PUBLIC_URL + "/images/113-sprinter-colour.svg"}
            width="50%"
          />
        </div>
      </div>

      <div className="container flex flex-col mx-auto">
        <div className="flex justify-between">
          <h1 className="uppercase text-2xl font-bold">new arrivals</h1>
          <Link
            className="uppercase text-xl underline hover:opacity-50"
            to="/products"
          >
            View all
          </Link>
        </div>

        <div className="flex my-6 flex-wrap justify-center">
          {loadingProducts ? (
            <div className="my-8">
              <Loader type="Grid" color="#525fe1" height="20rem" width="80" />
            </div>
          ) : (
            <ProductList products={products?.normalProducts} />
          )}
        </div>

        <div className="flex justify-between mt-14">
          <h1 className="uppercase text-2xl font-bold">don't miss</h1>
          <Link
            className="uppercase text-xl underline hover:opacity-50"
            to="/promotions"
          >
            View all
          </Link>
        </div>

        <div className="flex my-6 flex-wrap justify-center">
          {loadingPromotions ? (
            <div className="my-8">
              <Loader type="Grid" color="#525fe1" height="20rem" width="80" />
            </div>
          ) : (
            <ProductList products={promotions?.promotionProducts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
