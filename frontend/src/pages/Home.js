import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { NORMAL_PRODUCTS_QUERY } from "../graphql/queries/normalProducts";
import { PROMOTION_PRODUCTS_QUERY } from "../graphql/queries/promotionProducts";
import { useUserContext } from "../contexts/UserContext";
import Card from "../components/Cards/Card";

const Home = (props) => {
  const {
    data: products,
    loading: loadingProducts,
    error: errorProducts,
  } = useQuery(NORMAL_PRODUCTS_QUERY);
  const {
    data: promotions,
    loading: loadingPromotions,
    error: errorPromotions,
  } = useQuery(PROMOTION_PRODUCTS_QUERY);

  useEffect(() => {
    console.log("TRIGGER");
  }, []);
  
  
  

  return (
    <div className="container mx-auto mb-24">
      <div className="w-full ">
        <div className="container flex flex-wrap flex-col px-5 mx-auto md:flex-row">
          <div className="flex flex-col w-full justify-center text-center md:text-left md:w-2/5">
            <h1 className="my-4 text-5xl font-bold leading-tight">
              PICNIC SHOP
            </h1>
            <p className="leading-normal text-xl mb-8">Brah brah brah</p>
            <button
              className="w-1/2 bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
            >
              All Products
            </button>
          </div>
          <div className="flex w-full justify-center md:w-3/5">
            <img
              src="https://uploads-ssl.webflow.com/5e3ce2ec7f6e53c045fe7cfa/603dd4063c7c8064c4233bea_Frame-3.png"
              alt=""
            />
          </div>
        </div>
      </div>

      <h1>Products List</h1>
      <div className="flex">
        {products?.normalProducts.map((product) => (
          <Card
            key={product._id}
            title={product.title}
            imageUrl={product.images[0]}
            price={product.price}
            productType="normalProduct"
            description={product.description}

          />
        ))}
      </div>

      <h1>Promotions List</h1>
      <div className="flex">
        
        {promotions?.promotionProducts.map((product) => (
          <Card
            key={product._id}
            title={product.title}
            imageUrl={product.images[0]}
            price={product.price}
            productType="promotionProduct"
            percent={product.percent}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
