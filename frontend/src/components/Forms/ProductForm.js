import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { useUserContext } from "../../contexts/UserContext";
import ProductInformationForm from "./ProductInformationForm";
import ProductStockForm from "./ProductStockForm";
import Button from "../Button";

const CREATE_NORMAL_PRODUCT_MUTATION = gql`
  mutation(
    $title: String!
    $description: String!
    $price: Float!
    $images: [String!]!
    $stock: [ProductStockInput!]!
  ) {
    createNormalProduct(
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
`;

const UPLOAD_FILES_MUTATION = gql`
  mutation($files: [Upload!]!) {
    uploadFiles(record: { files: $files }) {
      urls
    }
  }
`;

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

  const handleAddToStock = (color, size, quantity) => {
    console.log(color, size, quantity);
    if (color.trim() === "") {
      return;
    }
    for (let i of stock) {
      if (i.color === color && i.size === +size) {
        return;
      }
    }
    setStock((prev) => [...prev, { size: +size, color, quantity: +quantity }]);
  };

  const handleEditStock = (st) => {
    setStock((prev) =>
      prev.map((i) => {
        if (i.color === st.color && i.size === +st.size) {
          return { ...i, quantity: st.quantity };
        }
        return i;
      })
    );
  };

  const handleRemoveFromStock = (st) => {
    setStock((prev) =>
      prev.filter((i) => i.color !== st.color || i.size !== st.size)
    );
  };

  const handleRemoveImage = (image) => {
    setImages((prev) => prev.filter((i) => i !== image));
  };

  return (
    <div className="p-6 m-5 mt-7">
      <ProductInformationForm
        title={title}
        description={description}
        price={price}
        images={images}
        onChange={(e) => {
          if (e.target.name === "title") {
            setTitle(e.target.value);
          } else if (e.target.name === "description") {
            setDescription(e.target.value);
          } else if (e.target.name === "price") {
            setPrice(e.target.value.replace(/\D/, "").replace(/^0+/, ""));
          } else if (e.target.name === "images") {
            setImages((prev) => [...prev, e.target.files[0]]);
          }
        }}
        removeImage={handleRemoveImage}
      />

      <h1 className="text-lg uppercase">Stock</h1>

      <div className="m-5">
        <ProductStockForm
          stock={stock}
          addToStock={handleAddToStock}
          editStock={handleEditStock}
          removeFromStock={handleRemoveFromStock}
        />
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
