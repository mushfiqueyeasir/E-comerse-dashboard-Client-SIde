import axios from "axios";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { updateData } from "../../hooks/update";

import PersonalInformation from "./PersonalInformation";
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
  const formRef = useRef();
  const [profileImage, setProfileImage] = useState("");
  const [fileName, setFileName] = useState("");
  const formData = new FormData();

  const [productFormData, setProductFormData] = useState({
    productName: "",
    productImage: "",
    productCategory: "",
    productBrand: "",
    productPrice: 0,
    productSold: 0,
    ProductDeleted: false,
    productStock: [],
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
      [e.target.name]: e.target.value,
    }));
  };

  const handleChange = (e) => {
    setProductFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProfileImage = (event) => {
    const size = event.target.files[0].size;
    if (size < 5000000) {
      setProfileImage(URL.createObjectURL(event.target.files[0]));
      formData.append("file", event.target.files[0]);
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

    formData.append(`productStock`, [productQuantity]);
    Object.entries(productFormData).map(([key, value]) => {
      formData.append(`${key}`, value);
    });
    formData.append(`productSold`, 0);
    formData.append(`ProductDeleted`, false);

    updateData({
      endPoint: `products`,
      data: formData,
      method: "POST",
      formReset: formRef.current.reset(),
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
                backgroundImage: `url(${profileImage})`,
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
              <div className={layer(profileImage)}>
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
              {fileName ? fileName : "No file chosen"}
            </h2>
          </div>
        </div>

        <div className={categorySectionCX}>
          <h2 className={categoryTitleCX}>Personal Information:</h2>
          <PersonalInformation handleChange={handleChange} />
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
