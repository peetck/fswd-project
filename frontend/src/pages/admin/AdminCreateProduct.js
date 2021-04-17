import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { useAuthContext } from "../../contexts/AuthContext";
import { CREATE_NORMAL_PRODUCT_MUTATION } from "../../graphql/mutations/createNormalProduct";

const AdminCreateProduct = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState();

  const { token } = useAuthContext();

  const [createNormalProduct] = useMutation(CREATE_NORMAL_PRODUCT_MUTATION, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createNormalProduct({
        variables: {
          title: title,
          description,
          price: +price,
          images,
          quantity: +quantity,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      Title:{" "}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-black"
      />
      Description:{" "}
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-black"
      />
      Price:
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border border-black"
      />
      Quantity:{" "}
      <input
        type="text"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="border border-black"
      />
      <input type="file" multiple onChange={(e) => setImages(e.target.files)} />
      <input type="submit" value="create" />
    </form>
  );
};

export default AdminCreateProduct;
