import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { useUserContext } from "../../contexts/UserContext";
import { UPLOAD_FILES_MUTATION } from "../../graphql/mutations/uploadFiles";
import { CREATE_NORMAL_PRODUCT_MUTATION } from "../../graphql/mutations/createNormalProduct";

const AdminCreateProduct = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState();

  const { token } = useUserContext();

  const [createNormalProduct] = useMutation(CREATE_NORMAL_PRODUCT_MUTATION, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  const [uploadFiles] = useMutation(UPLOAD_FILES_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        className="border"
      />
      Description:{" "}
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border"
      />
      Price:
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border"
      />
      Quantity:{" "}
      <input
        type="text"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="border"
      />
      <input type="file" multiple onChange={(e) => setImages(e.target.files)} />
      <input type="submit" value="Create Normal Product" />
    </form>
  );
};

export default AdminCreateProduct;
