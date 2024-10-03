import React, { useState } from "react";
import logo from "../../../src/Images/cusp-solar-logo.svg";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaYoutube,
  FaIndianRupeeSign,
} from "react-icons/fa6";
import { MdClose } from "react-icons/md";

const MagicLink3 = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleConfirmClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="bg-[#FFFCF6]">
      <div className="flex items-center py-5 justify-center min-h-screen overflow-y-scroll  rounded-lg shadow-lg">
        <div className="w-[43rem] border bg-white border-gray-300 shadow-lg py-6 px-8 rounded-lg ">
          <div className="text-center">
            <img src={logo} className="w-28 mx-auto" alt="cusp-logo" />
          </div>
          <div className="mt-6 pb-2 text-center">
            <p className="text-[#415CD2] text-[14px] font-[600]">
              Select Your Preferred Solar Installation Proposal
            </p>
          </div>
          <div className="font-[400]">
            <p className="text-[14px] mb-2">
              Installer ID: <span className="font-[500]">#123</span>
            </p>
            <p className="text-[14px] font-[500]">Project Details : </p>
            <p className="flex text-[14px] pl-2">
              -Total Project Cost(Excl.Tax):{" "}
              <span className="flex">
                <FaIndianRupeeSign
                  size={14}
                  className="mt-1 text-gray-600 ml-2"
                />
                4,00,000
              </span>
            </p>
            <p className="flex text-[14px] pl-2 my-1">
              -Total Tax :
              <span className="flex pl-[7.5rem]">
                <FaIndianRupeeSign
                  size={14}
                  className="mt-1 text-gray-600 ml-2"
                />
                98,000
              </span>
            </p>
            <p className="flex text-[14px] pl-2">
              -Total Project Cost(Incl.Tax):{" "}
              <span className="flex">
                <FaIndianRupeeSign
                  size={14}
                  className="mt-1 text-gray-600 ml-2"
                />
                4,98,000
              </span>
            </p>
            <p className="text-[#0C66E4] text-[1rem] font-[500] my-1">
              Delivery Period in 30 days
            </p>
          </div>
          <div className="">
            <p className="text-center text-[14px] mb-2">
              Review and conform Your selection
            </p>
            <p className="text-[14px] mb-2">
              Please review the details above carefully. If you have any
              questions, need further clarification, please use the input field
              below.
            </p>
          </div>
          <div className="">
            <p className="text-[14px] mb-1">Your Queries</p>
            <textarea
              className="border border-[#9699E8] w-full p-2 rounded-md"
              placeholder="Enter Text"
              rows="3"
            />
            <p className="text-[14px] my-2">
              When you are ready to proceed, click the button below to confirm
              your choice. Please note that once confirmed, your decision is
              final and cannot be reversed.
            </p>
            <div className="text-center border-b border-b-gray-300 pb-5">
              <button
                className="bg-[#0BB68D] text-white px-6 py-2 rounded-lg"
                onClick={handleConfirmClick}
              >
                Confirm
              </button>

              {/* Modal */}
              {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-xl w-[33rem] max-[600px]:mx-2 shadow-lg relative">
                    {/* Modal Header */}
                    <div className="flex justify-between items-center bg-[#D4DCFF] text-white p-4 rounded-t-lg">
                      <h2 className="text-lg font-semibold text-[#004A9C]">
                        Confirm
                      </h2>
                      <button onClick={handleCloseModal} className="text-black">
                        <MdClose size={20} />
                      </button>
                    </div>

                    {/* Modal Content */}
                    <div className="p-6 text-center text-[1rem] text-[#121416] font-[400] border-b border-gray-300">
                      <p>
                        Are you sure you want to confirm your selection of
                        Installer ID #123 with a total project cost of
                        ₹4,98,000?
                      </p>
                    </div>

                    {/* Modal Footer with Buttons */}
                    <div className="flex justify-end p-4 space-x-3 mr-3">
                      <button
                        onClick={handleCloseModal}
                        className="bg-[#FF2F004D] text-[#8D331F] px-8 py-2 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button className="bg-[#0BB68D] text-white px-8 py-2 rounded-lg ">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="text-center pt-4 text-[#172B4D] font-[500]">
            <p className="text-[12px]">
              Phone: +91 84484 99133{" "}
              <span className="ml-3">email: help@cuspsolar.com</span>
            </p>

            <p className="text-[12px]">www.cuspsolar.com</p>
            <div className="flex gap-3 justify-center mt-4">
              <div className="p-2  border-2 border-[#9A9EA6]  rounded-full">
                <FaFacebookF size={16} className="text-[#9A9EA6]" />
              </div>
              <div className="p-2  border-2 border-[#9A9EA6]  rounded-full">
                <FaLinkedinIn size={16} className="text-[#9A9EA6]" />
              </div>

              <div className="p-2  border-2 border-[#9A9EA6]  rounded-full">
                <FaYoutube size={16} className="text-[#9A9EA6]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagicLink3;
