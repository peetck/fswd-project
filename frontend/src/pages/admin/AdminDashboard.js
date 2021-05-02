import React from "react";

import Admin from "../../components/Cards/CardStat";

const AdminDashboard = () => {
  return (
    <>
      <div className="font-sans bg-grey-lighter flex flex-col min-h-screen w-full">
        <div className="flex-grow container mx-auto sm:px-4 pt-6 pb-8">
          <div className="bg-white border-t border-b sm:border-l sm:border-r sm:rounded shadow mb-6">
            <div className="flex flex-col items-center px-6 lg:hidden">
              <div className="flex-grow flex-no-shrink py-6">
                <div className="text-grey-darker mb-2">
                  <span className="text-3xl align-top">+</span>
                  <span className="text-5xl">21,404</span>
                  <span className="text-3xl align-top">EA</span>
                </div>
                <div className="text-green-light text-sm">
                  SOLD ALL
                </div>
              </div>
              <div className="flex-grow flex-no-shrink py-6">
                <div className="text-grey-darker mb-2">
                  <span className="text-3xl align-top"><span className="text-green align-top">+</span></span>
                  <span className="text-5xl">12,998</span>
                  <span className="text-3xl align-top">EA</span>
                </div>
                <div className="text-green-light text-sm">
                  SOLD ALL DAILY
                </div>
              </div>
              <div className="flex-grow flex-no-shrink py-6">
                <div className="text-grey-darker mb-2">
                  <span className="text-3xl align-top"><span className="text-green align-top">+</span></span>
                  <span className="text-5xl">154.47</span>
                  <span className="text-3xl align-top">%</span>
                </div>
                <div className="text-green-light text-sm">
                  PROFIT
                </div>
              </div>
            </div>
            <div className="hidden lg:flex">
              <div className="w-1/3 text-center py-8">
                <div className="border-r">

                  <div className="text-grey-darker mb-2">
                    <span className="text-3xl align-top">+</span>
                    <span className="text-5xl">21,404</span>
                    <span className="text-3xl align-top">EA</span>
                  </div>
                  <div className="text-sm uppercase text-grey tracking-wide">
                    SOLD ALL
                </div>
                </div>
              </div>
              <div className="w-1/3 text-center py-8">
                <div className="border-r">
                  <div className="text-grey-darker mb-2">
                    <span className="text-3xl align-top"><span className="text-green align-top">+</span></span>
                    <span className="text-5xl">12,998</span>
                    <span className="text-3xl align-top">EA</span>
                  </div>
                  <div className="text-sm uppercase text-grey tracking-wide">
                    SOLD ALL DAILY
                  </div>
                </div>
              </div>
              <div className="w-1/3 text-center py-8">
                <div>
                  <div className="text-grey-darker mb-2">
                    <span className="text-3xl align-top"><span className="text-green align-top">+</span></span>
                    <span className="text-5xl">154.47</span>
                    <span className="text-3xl align-top">%</span>
                  </div>
                  <div className="text-sm uppercase text-grey tracking-wide">
                    PROFIT
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full mb-6 lg:mb-0 lg:w-1/2 px-4 flex flex-col">
              <div className="flex-grow flex flex-col bg-white border-t border-b sm:rounded sm:border shadow overflow-hidden">
                <div className="border-b">
                  <div className="flex justify-between px-6 -mb-px">
                    <h3 className="text-blue-dark py-4 font-normal text-lg">ORDER DAILY</h3>
                  </div>
                </div>
                <div className="flex-grow flex px-6 py-6 text-grey-darker items-center border-b -mx-4">
                  <div className="w-2/5 xl:w-1/4 px-4 flex items-center">
                    <div className="rounded-full bg-orange inline-flex mr-3">
                      <svg className="fill-current text-white h-8 w-8 block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g fillRule="evenodd"><path d="M21.78 15.37c.51-.61.83-1.4.83-2.26 0-2.74-1.6-4.38-4.24-4.38V5.45c0-.12-.1-.22-.22-.22h-1.27c-.11 0-.2.1-.2.21v3.3h-1.7V5.44c0-.12-.1-.22-.22-.22H13.5c-.12 0-.2.1-.21.21v3.3H9.67c-.12 0-.21.09-.21.21v1.31c0 .12.1.22.21.22h.21c.94 0 1.7.79 1.7 1.75v7c0 .92-.68 1.67-1.55 1.75a.21.21 0 0 0-.18.16l-.33 1.32c-.01.06 0 .13.04.19.04.05.1.08.17.08h3.55v3.3c0 .1.1.2.2.2h1.28c.12 0 .21-.1.21-.22v-3.28h1.7v3.3c0 .1.1.2.21.2h1.27c.12 0 .22-.1.22-.22v-3.28h.85c2.65 0 4.24-1.64 4.24-4.37 0-1.28-.68-2.39-1.68-3zm-6.8-4.01h2.54c.94 0 1.7.78 1.7 1.75 0 .96-.76 1.75-1.7 1.75h-2.55v-3.5zm3.39 8.75h-3.4v-3.5h3.4c.93 0 1.7.78 1.7 1.75 0 .96-.77 1.75-1.7 1.75z"></path></g></svg>
                    </div>
                    <span className="text-lg">Order 1</span>
                  </div>
                  <div className="hidden md:flex lg:hidden xl:flex px-4 items-center ">
                    <span className = 'bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs '>false</span>
                  </div>
                  <div className="flex w-3/5 md:w/12">
                    <div className="w-1/2 px-4">
                      <div className="text-right">
                        <p>14 Piece</p>
                      </div>
                    </div>
                    <div className="w-1/2 px-4">
                      <div className="text-right text-grey">
                        <p>20303 Baht</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <div className="text-center text-grey">
                    TOTAL ORDER DAILY 300
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <div className="bg-white border-t border-b sm:rounded sm:border shadow">
                <div className="border-b">
                  <div className="flex justify-between px-6 -mb-px">
                    <h3 className="text-blue-dark py-4 font-normal text-lg">CHART</h3>
                  </div>
                </div>
                <div>
                  <div className="text-center px-6 py-4">
                    <div className="py-8">
                      <div className="mb-4">
                        <svg className="inline-block fill-current text-grey h-16 w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11.933 13.069s7.059-5.094 6.276-10.924a.465.465 0 0 0-.112-.268.436.436 0 0 0-.263-.115C12.137.961 7.16 8.184 7.16 8.184c-4.318-.517-4.004.344-5.974 5.076-.377.902.234 1.213.904.959l2.148-.811 2.59 2.648-.793 2.199c-.248.686.055 1.311.938.926 4.624-2.016 5.466-1.694 4.96-6.112zm1.009-5.916a1.594 1.594 0 0 1 0-2.217 1.509 1.509 0 0 1 2.166 0 1.594 1.594 0 0 1 0 2.217 1.509 1.509 0 0 1-2.166 0z" /></svg>
                      </div>
                      <p className="text-2xl text-grey-darker font-medium mb-4">NO CHART</p>
                      <p className="text-grey max-w-xs mx-auto mb-6">You've successfully linked transaction</p>
                    </div>
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

export default AdminDashboard;
