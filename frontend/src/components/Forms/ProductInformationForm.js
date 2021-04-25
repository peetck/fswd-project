import React, { Fragment } from "react";

import Input from "../Input";

const ProductInformationForm = ({ title, description, price, onChange }) => {
  return (
    <Fragment>
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
          rows="3"
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
    </Fragment>
  );
};

export default ProductInformationForm;
