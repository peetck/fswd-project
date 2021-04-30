import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLazyQuery, gql } from "@apollo/client";

import Card from "../components/Cards/Card";
import ProductList from "../components/ProductList";
import { useQuery } from "../hooks/query";
import Pagination from "../components/Pagination";
import Button from "../components/Button";

const FIRST_PAGE = 1;
const PER_PAGE = 5;

const NORMAL_PRODUCTS_PAGINATION_QUERY = gql`
  query(
    $page: Int!
    $perPage: Int!
    $filter: FilterFindManyNormalProductInput!
  ) {
    normalProductsPagination(page: $page, perPage: $perPage, filter: $filter) {
      items {
        _id
        title
        description
        price
        images
        stock {
          quantity
          color
          size
        }
        createdAt
      }
      count
    }
  }
`;

const Products = () => {
  const history = useHistory();
  const query = useQuery();

  const [inputMin, setInputmin] = useState("");
  const [inputMax, setInputmax] = useState("");
  const [currentPage, setCurrentPage] = useState(
    query.has("page") ? +query.get("page") : FIRST_PAGE
  );

  const [loadProducts, { data: products, loading, error }] = useLazyQuery(
    NORMAL_PRODUCTS_PAGINATION_QUERY
  );

  // const handleFilter = async () => {
  //   if (inputMin.trim() !== "" && inputMax.trim() !== "") {
  //     // ขก

  //     loadProducts({
  //       variables: {
  //         page: 1,
  //         perPage: PER_PAGE,
  //         filter: {
  //           _operators: {
  //             price: {
  //               gte: +inputMin,
  //               lte: +inputMax,
  //             },
  //           },
  //         },
  //       },
  //     });
  //   }
  // };

  useEffect(() => {
    loadProducts({
      variables: {
        page: currentPage,
        perPage: PER_PAGE,
        filter: {},
      },
    });
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (
      page >= 1 &&
      page <= Math.ceil(products?.normalProductsPagination?.count / PER_PAGE)
    ) {
      setCurrentPage(page);
      query.set("page", page);
      history.replace({
        search: query.toString(),
      });
    }
  };

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div className="flex flex-col">
      <div className="container flex flex-col mx-auto mt-14">
        <div className="flex uppercase text-2xl font-bold justify-center">
          all available products
        </div>

        <div className="flex flex-wrap justify-center mt-14">
          <ProductList products={products?.normalProductsPagination?.items} />
        </div>
      </div>

      <Pagination
        pageChangeHandler={handlePageChange}
        firstPage={FIRST_PAGE}
        currentPage={currentPage}
        lastPage={Math.ceil(
          products?.normalProductsPagination?.count / PER_PAGE
        )}
      />
    </div>
  );
};

export default Products;
