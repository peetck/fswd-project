import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { useUserContext } from "../../contexts/UserContext";
import ProductInformationForm from "./ProductInformationForm";
import ProductStockForm from "./ProductStockForm";
import Button from "../Button";
import { CREATE_NORMAL_PRODUCT_MUTATION } from "../../graphql/mutations/createNormalProduct";
import { UPLOAD_FILES_MUTATION } from "../../graphql/mutations/uploadFiles";
import Card from "../Cards/Card";

const ProductForm = ({ product }) => {
  const history = useHistory();

  const [title, setTitle] = useState(product?.title ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product?.price ?? 0);
  const [images, setImages] = useState(product?.images ?? []);
  const [stock, setStock] = useState(
    product?.stock
      ? product?.stock.map((p) => ({
          color: p.color,
          size: p.size,
          quantity: p.quantity,
        }))
      : []
  );
  const [color, setColor] = useState("");
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const { token } = useUserContext();

  const [createNormalProduct] = useMutation(CREATE_NORMAL_PRODUCT_MUTATION, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  const [uploadFiles] = useMutation(UPLOAD_FILES_MUTATION);

  const [updateNormalProduct] = useMutation(
    gql`
      mutation(
        $_id: MongoID!
        $title: String!
        $description: String!
        $price: Float!
        $images: [String!]!
        $stock: [UpdateByIdProductStockInput!]!
      ) {
        updateNormalProduct(
          _id: $_id
          record: {
            title: $title
            description: $description
            price: $price
            images: $images
            stock: $stock
          }
        ) {
          recordId
        }
      }
    `,
    {
      variables: {
        _id: product?._id,
      },
    }
  );

  const handleSubmit = async () => {
    try {
      if (product) {
        const uploaded = images.filter((image) => typeof image === "string");
        const notUploaded = images.filter((image) => typeof image !== "string");

        const urls = await uploadFiles({
          variables: {
            files: notUploaded,
          },
        });

        await updateNormalProduct({
          variables: {
            title: title,
            description,
            price: +price,
            images: [...uploaded, ...urls?.data?.uploadFiles?.urls],
            stock: stock,
          },
        });
      } else {
        const urls = await uploadFiles({
          variables: {
            files: images,
          },
        });

        await createNormalProduct({
          variables: {
            title: title,
            description,
            price: +price,
            images: urls?.data?.uploadFiles?.urls,
            stock: stock,
          },
        });

        history.push("/admin/products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToStock = () => {
    if (color.trim() === "" || size.trim() === "" || quantity.trim() === "") {
      return;
    }
    for (let i of stock) {
      if (i.color === color && i.size === size) {
        return;
      }
    }
    setStock((prev) => [
      ...prev,
      { size: Number(size), color, quantity: Number(quantity) },
    ]);
    setColor("");
    setQuantity("");
    setSize("");
  };

  const handleRemoveFromStock = (st) => {
    setStock((prev) =>
      prev.filter((i) => i.color !== st.color || i.size !== st.size)
    );
  };

  console.log(images);

  return (
    <div className="bg-white p-6 m-5 mt-7">
      <div className="flex flex-col">
        <h1 className="text-lg uppercase">Information</h1>
        <div className="flex items-center m-5">
          <div className="w-3/4 mr-20">
            <ProductInformationForm
              title={title}
              description={description}
              price={price}
              onChange={(e) => {
                if (e.target.name === "title") {
                  setTitle(e.target.value);
                } else if (e.target.name === "description") {
                  setDescription(e.target.value);
                } else if (e.target.name === "price") {
                  setPrice(e.target.value);
                } else if (e.target.name === "images") {
                  setImages((prev) => [...prev, e.target.files[0]]);
                }
              }}
            />
          </div>

          <Card title={title} price={price} imageUrl={""} />
        </div>

        <div className="flex flex-wrap mb-5">
          {images.map((image) => (
            <div className="relative m-5 w-44 h-44" key={uuidv4()}>
              <img
                src={
                  typeof image === "string" ? image : URL.createObjectURL(image)
                }
                alt=""
                className="w-44 h-44 border "
              />

              <span
                className="material-icons absolute top-0 right-0 cursor-pointer hover:text-red-500"
                onClick={() =>
                  setImages((prev) => prev.filter((i) => i !== image))
                }
              >
                delete
              </span>
            </div>
          ))}
        </div>

        <h1 className="text-lg uppercase">Stock</h1>

        <div className="m-5">
          <ProductStockForm
            color={color}
            quantity={quantity}
            size={size}
            onChange={(e) => {
              if (e.target.name === "color") {
                setColor(e.target.value);
              } else if (e.target.name === "size") {
                setSize(e.target.value);
              } else if (e.target.name === "quantity") {
                setQuantity(e.target.value);
              }
            }}
            stock={stock}
            addToStock={handleAddToStock}
            removeFromStock={handleRemoveFromStock}
          />
        </div>
      </div>

      <div className="flex justify-center my-4">
        <Button onClick={handleSubmit}>
          {product ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </div>
  );
};

export default ProductForm;
