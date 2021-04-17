import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import { PRODUCT_BY_ID_QUERY } from "../../graphql/queries/productById";
import { UPDATE_NORMAL_PRODUCT_MUTATION } from "../../graphql/mutations/updateNormalProduct";

const AdminUpdateProduct = () => {
  const { productId } = useParams();

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [images, setImages] = useState();
  const [quantity, setQuantity] = useState();

  const { loading, error, data } = useQuery(PRODUCT_BY_ID_QUERY, {
    variables: {
      _id: productId,
    },
  });
  const [updateNormalProduct] = useMutation(UPDATE_NORMAL_PRODUCT_MUTATION);

  useEffect(() => {
    if (data) {
      setTitle(data?.productById?.title);
      setDescription(data?.productById?.description);
      setPrice(data?.productById?.price);
      setImages(data?.productById?.images);
      setQuantity(data?.productById?.quantity);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateNormalProduct({
      variables: {
        _id: productId,
        description,
        price: +price,
        quantity: +quantity,
      },
    });
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <form onSubmit={handleSubmit}>
      Title:{" "}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled
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
      <input type="submit" value="Update" />
    </form>
  );
};

export default AdminUpdateProduct;
