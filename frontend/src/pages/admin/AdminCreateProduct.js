import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { useUserContext } from "../../contexts/UserContext";
import { UPLOAD_FILES_MUTATION } from "../../graphql/mutations/uploadFiles";
import { CREATE_NORMAL_PRODUCT_MUTATION } from "../../graphql/mutations/createNormalProduct";
import Button from "../../components/Button";

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
    // <div className="flex flex-1">
    //   <h1 className="text-xl m-6 uppercase">Create Product</h1>
    // </div>

    <form onSubmit={handleSubmit}>

      <div className="bg-white shadow rounded-lg p-6 m-5 mt-7">

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label for="name" className="bg-white text-gray-600 px-1">Title *</label>
              </p>
            </div>
            <p>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />

            </p>
          </div>
          <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label for="lastname" className="bg-white text-gray-600 px-1">Description *</label>
              </p>
            </div>
            <p>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="py-1 px-1 outline-none block h-full w-full"
              />

            </p>
          </div>
          <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label for="username" className="bg-white text-gray-600 px-1">Price *</label>
              </p>
            </div>
            <p>
              <div class="flex flex-row">
                <span class="flex items-center bg-grey-lighter rounded rounded-r-none px-3 font-bold text-grey-darker">$</span>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="py-1 px-1 outline-none block h-full w-full"
                />
              </div>
            </p>
          </div>
          <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label for="password" className="bg-white text-gray-600 px-1">Quantity *</label>
              </p>
            </div>
            <p>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="py-1 px-1 outline-none block h-full w-full"
              />

            </p>
          </div>

          <input className="" type="file" multiple onChange={(e) => setImages(e.target.files)} />



          <input className="bg-gray-700 p-3 text-white" type="submit" value="Create Normal Product" />
        </div>

      </div>
    </form>
    //   <form onSubmit={handleSubmit}>
    //   Title:{" "}
    // <input
    //   type="text"
    //   value={title}
    //   onChange={(e) => setTitle(e.target.value)}
    //   className="border"
    // />
    // Description:{" "}
    // <input
    //   type="text"
    //   value={description}
    //   onChange={(e) => setDescription(e.target.value)}
    //   className="border"
    // />
    // Price:
    // <input
    //   type="text"
    //   value={price}
    //   onChange={(e) => setPrice(e.target.value)}
    //   className="border"
    // />
    // Quantity:{" "}
    // <input
    //   type="text"
    //   value={quantity}
    //   onChange={(e) => setQuantity(e.target.value)}
    //   className="border"
    // />
    // <input type="file" multiple onChange={(e) => setImages(e.target.files)} />
    // <input type="submit" value="Create Normal Product" />
    // </form> 


  );
};

export default AdminCreateProduct;
