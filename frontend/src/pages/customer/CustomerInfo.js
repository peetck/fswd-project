import React, { useState, useEffect } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { toast } from "react-toastify";

import { useUserContext } from "../../contexts/UserContext";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

const CUSTOMER_USER_QUERY = gql`
  query($_id: MongoID!) {
    customerUser(_id: $_id) {
      username
      email
      address
    }
  }
`;

const UPDATE_CUSTOMER_USER_MUTATION = gql`
  mutation updateCustomerUser($_id: MongoID!, $address: String!) {
    updateCustomerUser(_id: $_id, record: { address: $address }) {
      recordId
    }
  }
`;

const CustomerInfo = (props) => {
  const { user } = useUserContext();

  const [address, setAddress] = useState();

  const [updateCustomerUser] = useMutation(UPDATE_CUSTOMER_USER_MUTATION);

  const { data, loading, error: customerUserError } = useQuery(
    CUSTOMER_USER_QUERY,
    {
      variables: {
        _id: user._id,
      },
    }
  );

  useEffect(() => {
    if (data) {
      setAddress(data.customerUser.address);
    }
  }, [data]);

  const handleSave = async () => {
    try {
      await updateCustomerUser({
        variables: {
          _id: user._id,
          address: address,
        },
      });
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (customerUserError) {
    toast.error(customerUserError.message);
  }

  if (loading) {
    return (
      <div className="flex justify-center mt-32">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="container mx-auto my-7 min-w-min">
        <div className="flex flex-col lg:flex-row ">
          <div className="w-full bg-white px-10 py-10">
            <div className="flex flex-col justify-between border-b pb-5">
              <h1 className="font-bold text-2xl uppercase">My Account</h1>
              <h2 className="text-sm uppercase mt-1 text-coolGray-400">
                Manage and protect your account
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row">
              <div className="flex flex-col w-full border-b lg:border-r lg:w-1/6">
                <div className="flex items-center my-10 uppercase cursor-pointer text-sm lg:ml-5">
                  <span class="material-icons mr-2">account_circle</span>
                  Profile
                </div>
              </div>
              <div className="flex flex-row w-5/6 my-5 justify-between lg:m-10">
                <div className="w-3/6">
                  <div className="my-5 min-w-max">
                    <Input
                      value={data.customerUser.username}
                      name="username"
                      label="Username"
                      type="text"
                      disabled
                    />
                  </div>

                  <div className="my-5 min-w-max">
                    <Input
                      value={data.customerUser.email}
                      name="email"
                      label="Email"
                      type="text"
                      disabled
                    />
                  </div>

                  <div className="my-5 min-w-max">
                    <Input
                      name="address"
                      label="Address"
                      type="textarea"
                      value={address}
                      rows={5}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="my-5 w-32">
                    <Button onClick={handleSave}>save</Button>
                  </div>
                </div>

                <div className="w-96 mr-14 hidden lg:block lg:ml-20">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/images/103-social-feed-colour.svg"
                    }
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
