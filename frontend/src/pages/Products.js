import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";

import { NORMAL_PRODUCTS_PAGINATION_QUERY } from "../graphql/queries/normalProductsPagination";
import Card from "../components/Cards/Card";
import ProductList from "../components/ProductList";
import { useQuery } from "../hooks/query";
import Pagination from "../components/Pagination";

const FIRST_PAGE = 1;
const PER_PAGE = 2;

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
    <Fragment>
      <div className="flex px-10 py-6 w-9/12 justify-between mx-auto">
        {/* <div className="flex flex-col py-10">
          <label className="block text-sm font-medium text-gray-700">
            Min Price
          </label>
          <div className="mt-1 relative rounded-md shadow-sm mb-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-sm">$</span>
            </div>
            <input
              type="number"
              name="price"
              id="price"
              className="block w-52 pl-7 pr-12 text-sm border border-black rounded-md"
              placeholder="0.00"
              value={inputMin}
              onChange={(e) => setInputmin(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center text-gray-500 text-sm pr-2">
              THB
            </div>
          </div>
          <label className="block text-sm font-medium text-gray-700">
            Max Price
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-sm">$</span>
            </div>
            <input
              type="number"
              name="price"
              id="price"
              className="block w-52 pl-7 pr-12 text-sm border border-black rounded-md"
              placeholder="0.00"
              value={inputMax}
              onChange={(e) => setInputmax(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center text-gray-500 text-sm pr-2">
              THB
            </div>
          </div>

          <button onClick={handleFilter}>ค้นหาจ้า</button>
        </div> */}
        <div className="flex flex-col w-8/12 justify-center items-center flex-wrap mx-auto">
          <ProductList products={products?.normalProductsPagination?.items} />
          <Pagination
            pageChangeHandler={handlePageChange}
            firstPage={FIRST_PAGE}
            currentPage={currentPage}
            lastPage={Math.ceil(
              products?.normalProductsPagination?.count / PER_PAGE
            )}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Products;
