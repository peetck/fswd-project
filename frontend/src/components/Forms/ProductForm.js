import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

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

const UPDATE_NORMAL_PRODUCT_MUTATION = gql`
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
  const [price, setPrice] = useState(product?.price ?? "0");
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
  const [updateNormalProduct] = useMutation(UPDATE_NORMAL_PRODUCT_MUTATION);

  const handleSubmit = async () => {
    try {
      if (title.trim() === "" || description.trim() === "") {
        throw new Error("Please complete all information");
      }

      if (isNaN(price.trim())) {
        throw new Error("Price must be a number");
      }

      if (+price.trim() < 0) {
        throw new Error("Price must be more than 0");
      }

      if (images.length === 0) {
        throw new Error("Product must have at least 1 image");
      }

      if (stock.length === 0) {
        throw new Error("Stock is empty");
      }

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
            _id: product?._id,
            title: title.trim(),
            description: description.trim(),
            price: +price.trim(),
            images: [...uploaded, ...urls?.data?.uploadFiles?.urls],
            stock: stock,
          },
        });
        toast.success("Update product successfully");
        history.push("/admin/products");
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

        toast.success("Create product successfully");
        history.push("/admin/products");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAddToStock = (color, size, quantity) => {
    if (color.trim() === "" || size.trim() === "" || quantity.trim() === "") {
      return toast.error("Please complete all information");
    }

    for (let i of stock) {
      if (i.color === color.trim() && i.size === +size.trim()) {
        return;
      }
    }

    setStock((prev) => [
      ...prev,
      { size: +size.trim(), color: color.trim(), quantity: +quantity.trim() },
    ]);
    toast.success("Stock added");
  };

  const handleEditStock = (st) => {
    setStock((prev) =>
      prev.map((i) => {
        if (i.color === st.color && i.size === +st.size) {
          return { ...i, quantity: +st.quantity };
        }
        return i;
      })
    );
    toast.success("Stock updated");
  };

  const handleRemoveFromStock = (st) => {
    setStock((prev) =>
      prev.filter((i) => i.color !== st.color || i.size !== st.size)
    );
    toast.success("Stock removed");
  };

  const handleRemoveImage = (index) => {
    const copiedImages = [...images];
    copiedImages.splice(index, 1);
    setImages(copiedImages);
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
            setPrice(e.target.value);
          } else if (e.target.name === "images") {
            setImages((prev) => [...prev, e.target.files[0]]);
          }
        }}
        removeImage={handleRemoveImage}
      />

      <h1 className="text-xl font-bold uppercase">Stock</h1>

      <div className="m-5">
        <ProductStockForm
          stock={stock}
          addToStock={handleAddToStock}
          editStock={handleEditStock}
          removeFromStock={handleRemoveFromStock}
        />
      </div>

      <div className="flex justify-center my-8">
        <Button onClick={handleSubmit}>
          {product ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </div>
  );
};

export default ProductForm;
