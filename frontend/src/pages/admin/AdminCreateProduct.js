import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

import { useUserContext } from "../../contexts/UserContext";
import { UPLOAD_FILES_MUTATION } from "../../graphql/mutations/uploadFiles";
import { CREATE_NORMAL_PRODUCT_MUTATION } from "../../graphql/mutations/createNormalProduct";
import Button from "../../components/Button";
import Input from "../../components/Input";

const AdminCreateProduct = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [images, setImages] = useState();

  const [stock, setStock] = useState([]);

  const [color, setColor] = useState();
  const [size, setSize] = useState();
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
          stock: stock,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToStock = () => {
    for (let i of stock) {
      if (i.color === color && i.size === size) {
        alert("already have.");
        return;
      }
    }

    setStock((prev) => [...prev, { size, color, quantity }]);
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
    <form onSubmit={handleSubmit}>
      <div className="bg-white rounded-lg p-6 m-5 mt-7">
        <div className="flex flex-col">
          <div className="my-2">
            <Input
              name="title"
              label="Title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>

          <div className="my-2">
            <Input
              name="description"
              label="Description"
              type="textarea"
              rows="3"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>

          <div className="my-2">
            <Input
              name="price"
              label="Price"
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>

          <div className="my-2">
            <input
              className=""
              type="file"
              multiple
              onChange={(e) => setImages(e.target.files)}
            />
          </div>

          <h1>Stock!!!</h1>

          <div className="my-2">
            <Input
              name="color"
              label="Color"
              type="text"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
          </div>

          <div className="my-2">
            <Input
              name="size"
              label="Size"
              type="number"
              value={size}
              onChange={(e) => {
                setSize(+e.target.value);
              }}
            />
          </div>

          <div className="my-2">
            <Input
              name="quantity"
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => {
                setQuantity(+e.target.value);
              }}
            />
          </div>

          <div className="w-28">
            <Button onClick={handleAddToStock}> Add DATA</Button>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-screen flex items-center justify-center overflow-hidden">
              <div className="w-full">
                <div className="bg-white shadow-md rounded my-6">
                  <table className="min-w-max w-full table-auto">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-center">Size</th>
                        <th className="py-3 px-6 text-center">Color</th>
                        <th className="py-3 px-6text-center">Quantity</th>
                        <th className="py-3 px-6text-center"></th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                      {stock?.map((st) => {
                        return (
                          <tr
                            className="border-b border-gray-200 hover:bg-gray-100"
                            key={uuidv4()}
                          >
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="mr-2 ">
                                  <span>{st.size}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-left">
                              <div className="flex items-center">
                                <div className="mr-2">
                                  <span>{st.color}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex items-center justify-center">
                                <span>{st.quantity}</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex items-center justify-center">
                                <Button
                                  onClick={() => handleRemoveFromStock(st)}
                                >
                                  remove
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Button onClick={handleSubmit}>Create Product</Button>
        </div>
      </div>
    </form>
  );
};

export default AdminCreateProduct;
