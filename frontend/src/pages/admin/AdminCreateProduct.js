import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";

import { useUserContext } from "../../contexts/UserContext";
import { UPLOAD_FILES_MUTATION } from "../../graphql/mutations/uploadFiles";
import { CREATE_NORMAL_PRODUCT_MUTATION } from "../../graphql/mutations/createNormalProduct";
import Button from "../../components/Button";
import Input from "../../components/Input";
import ProductInformationForm from "../../components/Forms/ProductInformationForm";
import ProductStockForm from "../../components/Forms/ProductStockForm";
import Card from "../../components/Cards/Card";

const AdminCreateProduct = () => {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);

  const [stock, setStock] = useState([]);

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

  const createProduct = async () => {
    try {
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

  return (
    <div className="bg-white rounded-lg p-6 m-5 mt-7">
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
                  setImages(e.target.files);
                }
              }}
            />
          </div>

          <Card
            title={title}
            price={price}
            imageUrl={images.length !== 0 ? URL.createObjectURL(images[0]) : ""}
          />
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
        <Button onClick={createProduct}>Create Product</Button>
      </div>
    </div>
  );
};

export default AdminCreateProduct;
