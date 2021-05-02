import React from "react";
import { v4 as uuidv4 } from "uuid";

import Input from "../Input";
import ProductCarousel from "../ProductCarousel";

const ProductInformationForm = ({
  title,
  description,
  price,
  images,
  onChange,
  removeImage,
}) => {
  return (
    <div>
      <h1 className="text-xl font-bold uppercase">Information</h1>
      <div className="flex w-full flex-col p-5 min-w-min xl:flex-row">
        <div className="w-full xl:w-1/2 xl:pr-20">
          <div className="my-4">
            <Input
              name="title"
              label="Title"
              type="text"
              value={title}
              onChange={(e) => {
                onChange(e);
              }}
            />
          </div>

          <div className="my-4">
            <Input
              name="description"
              label="Description"
              type="textarea"
              rows="18"
              value={description}
              onChange={(e) => {
                onChange(e);
              }}
            />
          </div>

          <div className="my-4">
            <Input
              name="price"
              label="Price"
              type="text"
              value={price}
              onChange={(e) => {
                onChange(e);
              }}
            />
          </div>
        </div>
        <div className="w-full xl:w-1/2 xl:pl-20 xl:border-l">
          <div className="my-4 w-full xl:w-52">
            <Input
              name="images"
              label="Images"
              type="file"
              onChange={(e) => {
                onChange(e);
              }}
            />
          </div>

          <div className="flex flex-wrap my-5 w-full justify-center xl:justify-start">
            <ProductCarousel
              images={images.map((image) =>
                typeof image === "string" ? image : URL.createObjectURL(image)
              )}
              width="500px"
              removeImage={removeImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInformationForm;
