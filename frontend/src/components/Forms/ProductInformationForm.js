import React, { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";

import Input from "../Input";

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
      <h1 className="text-lg uppercase">Information</h1>
      <div className="flex w-full flex-col p-5 xl:flex-row">
        <div className="w-1/2 pr-20">
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
        <div className="w-1/2 pl-20 border-l">
          <div className="my-4">
            <Input
              name="images"
              label="Images"
              type="file"
              onChange={(e) => {
                onChange(e);
              }}
            />
          </div>

          <div className="flex flex-wrap my-4">
            {images.map((image) => (
              <div className="relative m-5 w-44 h-44" key={uuidv4()}>
                <img
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
                  alt=""
                  className="w-44 h-44 border "
                />

                <span
                  className="material-icons absolute top-0 right-0 cursor-pointer hover:text-red-500"
                  onClick={() => removeImage(image)}
                >
                  delete
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInformationForm;
