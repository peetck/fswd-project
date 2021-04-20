import React from "react";
import { useMutation } from "@apollo/client";

import { useUserContext } from "../../contexts/UserContext";


const CustomerInfo = () => {

  const { user } = useUserContext();

  return (
    <>
      <div className="min-w-screen flex items-center p-5 lg:p-10 overflow-hidden relative">
        <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
          <div className="md:flex items-center mx-10">
            
            <div className="w-full md:w-1/5 px-10 mb-10 md:mb-0 flex flex-col xl:h-64 bg-gray-600 justify-start">
            </div>

            <div className="w-full md:w-4/5 px-10">
              <div className="mb-10">
                <div>
                  <h2 className='text-lg'>USERNAME</h2>
                  <p className = 'px-4'>{user?.username}</p>
                </div>
                <div>
                  <h2 className = 'text-lg'>E-MAIL</h2>
                  <p className = 'px-4'>mockupuser@gmail.com</p>
                </div>
                <div>
                  <h2 className='text-lg'>ADDRESS</h2>
                  <p className = 'px-4'>Lorem Ipsum is simply dummy text 
                    of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy 
                    text ever since the 1500s, when an unknown printer 
                    took a galley of type and scrambled it to make a 
                    type specimen book</p>
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
