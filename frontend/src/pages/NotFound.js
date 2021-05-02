import React from "react";

import Button from "../components/Button";

const NotFound = () => {
  return (
    <div className="flex flex-col">
      <div className="container flex flex-col mx-auto md:flex-row mb-20 py-12">
        <div className="flex flex-col w-full justify-center text-center lg:text-left lg:w-2/3">
          <h1 className="mb-4 text-5xl font-bold leading-tight uppercase">
            You seem to be lost!
          </h1>
          <p className="leading-normal text-xl mb-8">
            The page you're looking for isn't available.
          </p>
          <div className="w-1/2 mx-auto lg:mx-0">
            <Button>Go Back</Button>
          </div>
        </div>
        <div className="hidden w-full justify-center lg:flex">
          <img
            src={process.env.PUBLIC_URL + "/images/039-error-404-colour.svg"}
            width="50%"
            alt="error-404"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
