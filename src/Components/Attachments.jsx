import React, { useState, useRef } from "react";
import { FaUpload, FaFilePdf } from "react-icons/fa";
import { GrCloudUpload } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";

const Attachments = ({ formData, changeHandle, errors }) => {
  const [imageFiles, setImageFiles] = useState(formData.image || []);
  const [electricityBillFiles, setElectricityBillFiles] = useState(
    formData.electricityBill || []
  );
  const [videoThumbnail, setVideoThumbnail] = useState(null);
  const videoRef = useRef(null);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Update formData with the selected video file
      changeHandle(e, "video");

      // Create video URL and set it to the video element
      const videoURL = URL.createObjectURL(file);
      const video = videoRef.current;
      video.src = videoURL;

      // Wait for the video to load metadata (important for capturing frames)
      video.onloadedmetadata = () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");

        // Capture the first frame as thumbnail
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const thumbnail = canvas.toDataURL(); // Generate the image URL from canvas
        setVideoThumbnail(thumbnail); // Set the thumbnail state
      };
    }
  };

  const handleFileChange = (event, type) => {
    const files = Array.from(event.target.files);
    if (type === "image") {
      if (files.length + imageFiles.length > 5) {
        alert("You can only upload up to 5 images.");
        return;
      }
      setImageFiles([...imageFiles, ...files]);
      changeHandle(event, "image");
    } else if (type === "electricityBill") {
      if (files.length + electricityBillFiles.length > 3) {
        alert("You can only upload up to 3 electricity bills.");
        return;
      }
      setElectricityBillFiles([...electricityBillFiles, ...files]);
      changeHandle(event, "electricityBill");
    }
  };

  // const handleRemoveFile = (index, type) => {
  //   alert(JSON.stringify(imageFiles))
  //   if (type === "image") {
  //     const newFiles = imageFiles.filter((_, i) => i !== index);
  //     setImageFiles(newFiles);

  //     // Trigger changeHandle with the updated files array
  //     changeHandle({ target: { name: "image", value: newFiles } }, "image");
  //   } else if (type === "electricityBill") {
  //     const newFiles = electricityBillFiles.filter((_, i) => i !== index);
  //     setElectricityBillFiles(newFiles);

  //     // Trigger changeHandle with the updated files array
  //     changeHandle(
  //       { target: { name: "electricityBill", value: newFiles } },
  //       "electricityBill"
  //     );
  //   }
  // };
  const handleRemoveFile = (index, type) => {
    if (type === "image") {
      const newFiles = imageFiles.filter((_, i) => i !== index);
      setImageFiles(newFiles);

      // Update formData with new files after deletion
      changeHandle({ target: { name: "image", files: newFiles } }, "image");

      // Ensure the form validation doesn't trigger by checking if files exist
      if (newFiles.length === 0) {
        // Trigger validation message if no files remain
        changeHandle({ target: { name: "image", value: [] } }, "image");
      }
    } else if (type === "electricityBill") {
      const newFiles = electricityBillFiles.filter((_, i) => i !== index);
      setElectricityBillFiles(newFiles);

      // Update formData with new files after deletion
      changeHandle(
        { target: { name: "electricityBill", files: newFiles } },
        "electricityBill"
      );

      if (newFiles.length === 0) {
        changeHandle(
          { target: { name: "electricityBill", value: [] } },
          "electricityBill"
        );
      }
    }
  };

  return (
    <div>
      <h2 className="text-[#004A9C] font-[600] text-[16px] text-center pb-6">
        Attachments Section
      </h2>

      {/* Video Upload */}
      <div className="flex flex-col mb-6 min-[1100px]:flex-row items-center border-dashed border-2 border-gray-300 p-4 sm:p-6">
        <div className="flex-1">
          <div className="flex flex-col items-center  min-[1100px]:border-r  min-[1100px]:border-r-gray-500 mb-4  min-[1100px]:mb-0">
            <GrCloudUpload size={20} className="text-[#0BB68D] mb-2" />
            <label className="block text-[14px] font-[400] text-gray-600 pr-3 text-center">
              Site Video Upload (Only .mp4, .flv are supported)
            </label>
            <p className="text-[12px] my-2 text-center">
              Please upload only .mp4, .flv file format, Max file size should be
              200MB.
              <br />
              <span className="text-[10px] text-orange-600 font-[500]">
                (Highly recommended to provide near to precise estimate.)
              </span>
              {/* <span className="text-[#004A9C]">*</span>. */}
            </p>
          </div>
        </div>
        <div className="flex-1">
          <input
            type="file"
            id="video-upload"
            accept=".mp4,.flv"
            onChange={handleVideoUpload}
            className="block text-sm text-[#757575] ml-0  min-[1100px]:ml-4 w-full  min-[1100px]:w-auto border-[#CECECE] border rounded-md shadow-sm p-2 cursor-pointer"
          />
          {videoThumbnail && (
            <div className="mt-4 flex justify-center">
              <img
                src={videoThumbnail}
                alt="Video Thumbnail"
                className="w-10 h-10 object-cover rounded-md shadow-md"
              />
            </div>
          )}
          <video ref={videoRef} className="hidden" />
        </div>
      </div>

      {/* Image Upload */}
      <div className="flex flex-col mb-6  min-[1100px]:flex-row items-center border-dashed border-2 border-gray-300 p-4 sm:p-6">
        <div className="flex-1">
          <div className="flex flex-col  items-center  min-[1100px]:border-r  min-[1100px]:border-r-gray-500 mb-4  min-[1100px]:mb-0">
            <GrCloudUpload size={20} className="text-[#0BB68D] mb-2" />
            <label className="block text-[14px] font-[400] text-gray-600 pr-3 text-center">
              Upload Site Images (Only .png, .jpg & .jpeg are supported)
            </label>
            <p className="text-[12px] mb-2 mt-5 text-center">
              Please upload in PNG, JPEG, JPG format, Max file size should be
              200MB
              <span className="text-[#004A9C]">*</span>.
            </p>
          </div>
        </div>
        <div className="flex-1">
          <input
            type="file"
            id="image-upload"
            accept=".png,.jpg,.jpeg"
            multiple
            onChange={(e) => handleFileChange(e, "image")}
            className="block text-sm text-[#757575] ml-0  min-[1100px]:ml-4 w-full  min-[1100px]:w-auto border-[#CECECE] border rounded-md shadow-sm p-2 cursor-pointer"
          />
          {imageFiles.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center">
              {imageFiles.map((file, index) => (
                <div key={index} className="relative m-2">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Image Preview ${index + 1}`}
                    className="w-10 h-10 object-cover rounded-md shadow-md"
                  />
                  <button
                    type="button"
                    className="absolute cursor-pointer top-[-6px] right-[-5px] p-1 rounded-full"
                    onClick={() => handleRemoveFile(index, "image")}
                  >
                    <IoMdClose
                      size={14}
                      className="bg-red-500 text-white rounded-full"
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
          {errors.image && (
            <p className="text-red-500 text-sm mt-1 pl-4">{errors.image}</p>
          )}
        </div>
      </div>

      {/* Electricity Bill Upload */}
      <div className="flex flex-col min-[1100px]:flex-row items-center border-dashed border-2 border-gray-300 p-4  min-[1100px]:p-6">
        <div className="flex-1">
          <div className="flex flex-col items-center  min-[1100px]:border-r sm:border-r-gray-500 mb-4  min-[1100px]:mb-0">
            <GrCloudUpload size={20} className="text-[#0BB68D] mb-2" />
            <label className="block text-[14px] font-[400] text-gray-600 pr-3 text-center">
              Electricity Bill (Only .png, .jpg, .jpeg & .pdf are supported)
            </label>
            <p className="text-[12px] my-2 text-center mt-5">
              Please upload in PNG, JPEG, JPG, PDF format, Max file size should
              be 200MB
              <span className="text-[#004A9C]">*</span>.
            </p>
          </div>
        </div>
        <div className="flex-1">
          <input
            type="file"
            id="electricityBill-upload"
            accept=".png,.jpg,.jpeg,.pdf"
            multiple
            onChange={(e) => handleFileChange(e, "electricityBill")}
            className="block text-sm text-[#757575] ml-0  min-[1100px]:ml-4 w-full  min-[1100px]:w-auto border-[#CECECE] border rounded-md shadow-sm p-2 cursor-pointer"
          />
          {electricityBillFiles.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center">
              {electricityBillFiles.map((file, index) => (
                <div key={index} className="relative m-2">
                  {file.type === "application/pdf" ? (
                    <FaFilePdf size={48} className="text-red-500" />
                  ) : (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Electricity Bill Preview ${index + 1}`}
                      className="w-10 h-10 object-cover rounded-md shadow-md"
                    />
                  )}
                  <button
                    type="button"
                    className="absolute cursor-pointer top-[-6px] right-[-5px] p-1 rounded-full"
                    onClick={() => handleRemoveFile(index, "electricityBill")}
                  >
                    <IoMdClose
                      size={14}
                      className="bg-red-500 text-white rounded-full"
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
          {errors.electricityBill && (
            <p className="text-red-500 text-sm mt-1 pl-4">
              {errors.electricityBill}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attachments;
