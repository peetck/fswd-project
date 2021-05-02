import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { toast } from "react-toastify";

import { useUserContext } from "../contexts/UserContext";
import Button from "../components/Button";
import ProductCarousel from "../components/ProductCarousel";
import ProductList from "../components/ProductList";
import ProductQuantity from "../components/ProductQuantity";
import Loader from "../components/Loader";

const PRODUCT_QUERY = gql`
  query($title: String!) {
    product(filter: { title: $title }) {
      _id
      title
      description
      price
      images
      sold
      stock {
        quantity
        color
        size
      }
      totalStock
      createdAt
      type
      ... on PromotionProduct {
        percent
        priceAfterDiscount
      }
    }
  }
`;

const NORMAL_PRODUCTS_QUERY = gql`
  query {
    normalProducts(limit: 5) {
      _id
      title
      description
      price
      images
      sold
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

const ProductDetail = () => {
  const history = useHistory();

  const { productSlug } = useParams();
  const { updateCart, cart, user } = useUserContext();

  const [quantity, setQuantity] = useState(1);

  const [colors, setColors] = useState();
  const [sizes, setSizes] = useState();

  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();

  const {
    data: product,
    loading: loadingProduct,
    error: errorProduct,
  } = useQuery(PRODUCT_QUERY, {
    variables: {
      title: productSlug,
    },
  });

  const {
    data: products,
    loading: loadingProducts,
    error: errorProducts,
  } = useQuery(NORMAL_PRODUCTS_QUERY);

  useEffect(() => {
    if (product) {
      const colorArr = [];
      const sizeArr = [];

      for (let prod of product.product.stock) {
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
    if (quantity + n <= 0 || quantity + n > product.product.totalStock) {
      return;
    }

    if (selectedColor && selectedSize) {
      const prod = product.product.stock.find(
        (p) => p.color === selectedColor && p.size === selectedSize
      );
      if (quantity + n > prod.quantity) {
        return;
      }
    }

    setQuantity((prev) => prev + n);
  };

  const addToCart = async () => {
    if (!selectedColor || !selectedSize) {
      return toast.error("Please select product variation first");
    }

    if (!user) {
      return history.push("/login");
    }

    const quantityInCart =
      cart?.products.find(
        (c) => c.color === selectedColor && c.size === selectedSize
      )?.quantity ?? 0;

    const prod = product.product.stock.find(
      (p) => p.color === selectedColor && p.size === selectedSize
    );

    if (quantity + quantityInCart > prod.quantity) {
      return toast.error(
        "You have reached the maximum quantity available for this item"
      );
    }

    toast.success("Item has been added to your shopping cart.");

    await updateCart(
      product.product._id,
      quantity,
      selectedColor,
      selectedSize,
      false
    );
  };

  useEffect(() => {
    if (selectedColor && selectedSize) {
      const prod = product.product.stock.find(
        (p) => p.color === selectedColor && p.size === selectedSize
      );
      const quantityInCart =
        cart?.products.find(
          (c) => c.color === selectedColor && c.size === selectedSize
        )?.quantity ?? 0;

      if (quantity + quantityInCart > prod.quantity) {
        setQuantity(1);
      }
    }
  }, [selectedColor, selectedSize]);

  if (errorProduct) {
    toast.error(errorProduct.message);
  }

  if (errorProducts) {
    toast.error(errorProducts.message);
  }

  if (loadingProduct) {
    return (
      <div className="flex justify-center mt-32">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="container flex mx-auto mt-14 flex-wrap justify-center">
        <ProductCarousel images={product?.product?.images} autoPlay />

        <div className="flex flex-1 flex-col mt-10 lg:p-5 lg:ml-5 xl:mt-0">
          <h3 className="flex flex-1 uppercase text-2xl font-bold items-center">
            <span> {product?.product.title}</span>
            <span className="text-sm text-coolGray-400 ml-5">
              {product?.product.sold} sold
            </span>
          </h3>

          <span className="font-bold mt-3 text-royal-blue text-3xl">
            {product?.product?.type === "PromotionProduct" ? (
              <div className="flex">
                <span className="mr-4">
                  <del className="text-coolGray-400 font-normal text-lg">
                    ฿{product?.product?.price}
                  </del>{" "}
                  ฿{product?.product?.priceAfterDiscount}
                </span>
                <div className="items-center flex flex-1">
                  <span className="uppercase bg-yellow-400 font-normal text-gray-800 p-1 text-sm shadow rounded mr-3">
                    {product?.product?.percent}% off
                  </span>
                </div>
              </div>
            ) : (
              `฿${product?.product?.price}`
            )}
          </span>
          <hr className="my-3" />

          <div className="my-3">
            <span className="uppercase font-bold">Color</span>
            <div className="flex items-center mt-4">
              {colors?.map((color) => {
                for (let prod of product.product.stock) {
                  if (
                    (selectedSize ? prod.size === selectedSize : true) &&
                    prod.color === color &&
                    prod.quantity > 0
                  ) {
                    return (
                      <Button
                        key={color}
                        type="checkbox"
                        checked={color === selectedColor}
                        onClick={() =>
                          color === selectedColor
                            ? setSelectedColor()
                            : setSelectedColor(color)
                        }
                      >
                        {color}
                      </Button>
                    );
                  }
                }
                return (
                  <Button key={color} disabled type="checkbox">
                    {color}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="my-3">
            <span className="uppercase font-bold">Size</span>
            <div className="flex items-center mt-4">
              {sizes?.map((size) => {
                for (let prod of product.product.stock) {
                  if (
                    (selectedColor ? prod.color === selectedColor : true) &&
                    prod.size === size &&
                    prod.quantity > 0
                  ) {
                    return (
                      <Button
                        key={size}
                        type="checkbox"
                        checked={size === selectedSize}
                        onClick={() =>
                          size === selectedSize
                            ? setSelectedSize()
                            : setSelectedSize(size)
                        }
                      >
                        {size} US
                      </Button>
                    );
                  }
                }
                return (
                  <Button key={size} disabled type="checkbox">
                    {size} US
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="my-3">
            <span className="uppercase font-bold">Quantity</span>
            <div className="flex items-center mt-4">
              <ProductQuantity
                quantity={quantity}
                onAdd={() => handleQuantity(1)}
                onRemove={() => handleQuantity(-1)}
                editable
              />

              <div className="pl-4 text-sm text-coolGray-400">
                {selectedColor && selectedSize
                  ? product.product.stock.find(
                      (p) =>
                        p.color === selectedColor && p.size === selectedSize
                    ).quantity
                  : product?.product.totalStock}{" "}
                piece available
              </div>
            </div>
          </div>

          <div className="flex items-center mt-6 w-full 2xl:w-1/4 ">
            <Button onClick={addToCart}>Add to Cart</Button>
          </div>
        </div>
      </div>

      <div className="container flex flex-col mx-auto  mt-14">
        <h1 className="uppercase text-2xl font-bold">product description</h1>

        <textarea
          className="mt-8 resize-none focus:outline-none"
          rows={product?.product?.description.split("\n").length + 2}
          readOnly
        >
          {product?.product?.description}
        </textarea>

        <hr className="mt-14" />

        <h1 className="uppercase text-2xl font-bold mt-14">
          You may also like
        </h1>

        <div className="flex my-6 flex-wrap justify-center">
          <ProductList
            products={products?.normalProducts}
            loading={loadingProducts}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
