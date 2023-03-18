import React, { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { COUNTER_CONTEXT } from "../../App";

import { create } from "../../hooks/create";
import ProductInformation from "./ProductInformation";
import QuantityInformation from "./QuantityInformation";

import {
  categorySectionCX,
  categoryTitleCX,
  formBodyCX,
  formTitleCX,
  imageUploadDiv,
  imageUploadBox,
  file,
  layer,
  iconsStyle,
  profileImageCX,
  uploadLogoText,
  fileNameCX,
  submitButtonCX,
  submitButton,
} from "./styledClass";

const AddProduct = () => {
  const { activeProductRefetch } = useContext(COUNTER_CONTEXT);

  const formRef = useRef();
  const [productImage, setProductImage] = useState("");
  const [fileName, setFileName] = useState("");
  const [productImageData, setProductImageData] = useState(null);
  const formData = new FormData();

  const [productFormData, setProductFormData] = useState({
    productSold: 0,
    ProductDeleted: false,
  });

  const [productQuantity, setProductQuantity] = useState({
    sm: 0,
    m: 0,
    l: 0,
    xl: 0,
    "2xl": 0,
    "3xl": 0,
    sum: 0,
  });

  const handleQuantity = (e) => {
    setProductQuantity((prev) => ({
      ...prev,
      [e.target.name]: parseInt(e.target.value ? e.target.value : 0),
    }));
  };

  const handleChange = (e) => {
    if (e.target.name === "productPrice") {
      setProductFormData((prev) => ({
        ...prev,
        [e.target.name]: parseInt(e.target.value),
      }));
    } else {
      setProductFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleProfileImage = (event) => {
    const size = event.target.files[0].size;
    if (size < 5000000) {
      setProductImageData([...event.target.files]);
      setProductImage(URL.createObjectURL(event.target.files[0]));
      setFileName(event.target.files[0].name);
    } else {
      toast.error("Max image limit 5MB!", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let sum = 0;
    for (let key in productQuantity) {
      if (key !== "sum") sum += parseInt(productQuantity[key]);
    }
    productQuantity.sum = sum;
    console.log(productQuantity);
    for (const key in productQuantity) {
      formData.append(`productStock[${key}]`, productQuantity[key]);
    }

    Object.entries(productFormData).map(([key, value]) => {
      formData.append(`${key}`, value);
    });
    productImageData.length > 0 &&
      productImageData.map((file) => formData.append("file", file));

    create({
      endPoint: `products`,
      data: formData,
      imageUpdate: setProductImage,
      fileUpdate: setFileName,
      refetch: activeProductRefetch,
    });
  };
  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit} className={formBodyCX}>
        <h2 className={formTitleCX}>Add Product</h2>

        <div className={profileImageCX}>
          <div className={imageUploadDiv}>
            <div
              className={imageUploadBox}
              style={{
                backgroundImage: `url(${productImage})`,
              }}
            >
              <input
                type="file"
                name="photo"
                className={file}
                onChange={handleProfileImage}
                formEncType="multipart/form-data"
                accept="image/*"
              />
              <div className={layer(productImage)}>
                <div className={iconsStyle}>
                  <img
                    src="https://mez.ink/mezink-web/_next/static/images/invoice/imageLogo.png"
                    alt="uploadImageThumbnail"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className={uploadLogoText}>Product Image</h2>
            <h2 className={fileNameCX}>
              {fileName
                ? fileName.length <= 15
                  ? fileName
                  : fileName.slice(0, 12) + "..."
                : "No file chosen"}
            </h2>
          </div>
        </div>

        <div className={categorySectionCX}>
          <h2 className={categoryTitleCX}>Personal Information:</h2>
          <ProductInformation handleChange={handleChange} />
        </div>
        <div className={categorySectionCX}>
          <h2 className={categoryTitleCX}>Quantity Information:</h2>
          <QuantityInformation handleChange={handleQuantity} />
        </div>

        <div className={submitButtonCX}>
          <button type="submit" className={submitButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
