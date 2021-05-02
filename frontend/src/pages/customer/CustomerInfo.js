import React, { useState, useEffect } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { toast } from "react-toastify";

import { useUserContext } from "../../contexts/UserContext";
import WithCustomerSideBar from "../../components/WithCustomerSideBar";
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

const CustomerInfo = () => {
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
    <WithCustomerSideBar>
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
          src={process.env.PUBLIC_URL + "/images/103-social-feed-colour.svg"}
          className="w-full h-full"
          alt="social-feed-colour"
        />
      </div>
    </WithCustomerSideBar>
  );
};

export default CustomerInfo;
