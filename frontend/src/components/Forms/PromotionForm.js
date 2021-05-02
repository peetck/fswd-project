import React, { useState } from "react";

import Button from "../Button";
import Input from "../Input";

const PromotionForm = ({ products, onSubmit, isUpdate, promotionProduct }) => {
  const [product, setProduct] = useState();
  const [percent, setPercent] = useState(
    promotionProduct?.percent.toString() ?? ""
  );

  return (
    <div className="p-6 m-5 mt-7">
      <h1 className="text-xl font-bold uppercase mb-5">Create promotion</h1>

      <div className="flex min-w-min">
        <div className="w-full lg:w-1/2">
          <form
            onSubmit={(e) =>
              onSubmit(e, isUpdate ? promotionProduct : product, percent)
            }
          >
            <div className="bg-white rounded-lg lg:p-6 lg:m-5 mt-7">
              <div className="flex flex-col">
                <div className="my-2">
                  {isUpdate ? (
                    <Input
                      name="product"
                      label="Product"
                      type="text"
                      value={promotionProduct.title}
                      disabled
                    />
                  ) : (
                    <Input
                      name="product"
                      label="Product"
                      type="select"
                      value={product}
                      defaultValue="default"
                      onChange={(e) => setProduct(e.target.value)}
                    >
                      {products.map((product) => (
                        <option value={product._id} key={product._id}>
                          {product.title}
                        </option>
                      ))}
                    </Input>
                  )}
                </div>

                <div className="my-2">
                  <Input
                    name="percentageDiscount"
                    placeholder="Percentage discount"
                    label="Percentage discount"
                    type="text"
                    value={percent}
                    onChange={(e) => setPercent(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-center mt-8">
                <Button type="submit">Create Promotion</Button>
              </div>
            </div>
          </form>
        </div>

        <div className="w-96 mr-14 hidden lg:block lg:ml-20">
          <img
            src={
              process.env.PUBLIC_URL + "/images/067-travel-tickets-colour.svg"
            }
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PromotionForm;
