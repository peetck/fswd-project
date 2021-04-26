import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { useUserContext } from "../../contexts/UserContext";
import Input from "../../components/Input";


const CustomerInfo = () => {

  const [address, setAddress] = useState('something like home asdasd asd asd asd asd asd asd asd asd asd asd asd ');
  const { user } = useUserContext();
  const [selected, setSelected] = useState(false);

  const handleAddress = (e) => {
    setAddress(e.target.value);
  }

  
  const renderTag = () => {
    if (selected) {
      return (
        <form>
          <Input
            type="textarea"
            name="address"
            value={address}
            rows={4}
            onChange = {handleAddress}
          />
          <button className = "px-3 mt-1 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">Submit</button>
        </form>
      )
    } else {
      return (
        <p className='pl-4'>{address}</p>
      )
    }
  }

  return (
    <>
      {console.log(user)}
      <div className="flex items-center p-5 lg:p-10 overflow-hidden md:w-10/12">
        <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
          <div className="md:flex items-center mx-10">
            <div className="w-full px-10">
              <div className="mb-10 ml-10">
                <div>
                  <h2 className='text-lg'>USERNAME</h2>
                  <p className='pl-4'>{user?.username}</p>
                </div>
                <div className='mt-1'>
                  <h2 className='text-lg'>E-MAIL</h2>
                  <p className='pl-4 text-gray-500'>mockupuser@gmail.com</p>
                </div>
                <div className='mt-1'>
                  <div className='grid grid-cols-2'>
                    <div className='col-start-1 col-end-2'>
                      <h2 className='text-lg'>ADDRESS</h2>
                    </div>
                    <div className='col-end-5'>
                      <button onClick={() => {
                        setSelected(true)
                      }}>
                        <span className="material-icons">mode_edit</span>
                      </button>
                    </div>
                    <div>{renderTag()}</div>
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
