import React, { useState, useEffect } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useUserContext } from "../../contexts/UserContext";
import Input from "../../components/Input";

const CustomerInfo = (props) => {
  const { user } = useUserContext();
  const [selected, setSelected] = useState(false);
  const [address, setAddress] = useState(null);

  const { data, loading, error, refetch } = useQuery(
    gql`
      query($_id: MongoID!) {
        customerUser(_id: $_id) {
          username
          email
          addresses
          gender
          avatar
        }
      }
    `,
    {
      variables: {
        _id: user._id,
      },
    }
  );


  const [updateCustomerUser] = useMutation(
    gql`
      mutation updateCustomerUser($_id: MongoID!, $addresses: [String!]){
        updateCustomerUser(_id: $_id, record: {addresses: $addresses}){
          recordId
        }
      }
    `
  )

  const handdleSubmit = async (e) => {
    e.preventDefault();
    try{
      await updateCustomerUser({
        variables: {
          _id: user._id,
          addresses: address
        }
      })

      setSelected(false)
      refetch()

    }catch{
      console.log("Error")
    }


  }

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  // render tag when user click edit
  const renderTag = (e) => {
    if (selected) {
      return (
        <form onSubmit={handdleSubmit}>
          <Input
            type="textarea"
            name="address"
            value={address}
            rows={4}
            onChange={handleAddress}
          />
          <button className="px-3 mt-1 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500" onClick={handdleSubmit}>
            Submit
          </button>
        </form>
      );
    } else {
      return <p className="pl-4">{e}</p>;
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }


  return (
    <>
      <div className="flex items-center p-5 lg:p-10 overflow-hidden md:w-10/12">
        <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
          <div className="md:flex items-center mx-10">
            <div className="w-full px-10">
              <div className="mb-10 ml-10">
                <div>
                  <h2 className="text-lg">USERNAME</h2>
                  <p className="pl-4">{data?.customerUser?.username}</p>
                </div>
                <div className="mt-1">
                  <h2 className="text-lg">E-MAIL</h2>
                  <p className="pl-4 text-gray-500">
                    {data?.customerUser?.email}
                  </p>
                </div>
                <div className="mt-1">
                  <div className="grid grid-cols-2">
                    <div className="col-start-1 col-end-2">
                      <h2 className="text-lg">ADDRESS</h2>
                    </div>
                    <div className="col-end-5">
                      <button
                        onClick={() => {
                          setSelected(true);
                        }}
                      >
                        <span className="material-icons">mode_edit</span>
                      </button>
                    </div>
                    {console.log(data?.customerUser?.addresses[0])}
                    <div>{renderTag(data?.customerUser?.addresses[0])}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerInfo;
