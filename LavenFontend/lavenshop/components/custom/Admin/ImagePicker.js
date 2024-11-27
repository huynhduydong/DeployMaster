"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import iconAddImage from "@/public/ic_admin/ic_add_image.svg";
import Image from "next/image";

const ImagePicker = ({ onFileAccepted, width, height }) => {
    const onDrop = useCallback(
    (acceptedFiles) => {
      onFileAccepted(acceptedFiles);
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className="border-[3px] flex justify-center items-center rounded-[8px] border-blue-300 bg-blue-50 cursor-pointer border-dashed"
      style={{ width: width, height: height }}    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <div className="flex flex-col items-center justify-center">
          <Image src={iconAddImage} height={20} width={20} />
          <div className="w-[180px] text-center text-blue-600 mt-[8px]">
            Kéo thả file vào đây...
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <Image alt="Add image" src={iconAddImage} height={32} width={32} />
          <div className="w-[180px] text-center text-blue-600 mt-[8px]">
            Kéo thả hoặc click để chọn ảnh sản phẩm
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePicker;