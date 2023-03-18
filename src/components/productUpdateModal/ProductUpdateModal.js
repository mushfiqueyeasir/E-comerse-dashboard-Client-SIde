/* eslint-disable array-callback-return */
import React, { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { COUNTER_CONTEXT } from "../../App";
import { update } from "../../hooks/update";

import ProductInformation from "../../page/addProduct/ProductInformation";
import QuantityInformation from "../../page/addProduct/QuantityInformation";

import SoldInformation from "./SoldInformation";
import {
  inputCX,
  inputContainerCX,
  legendCx,
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

const ProductUpdateModal = ({ data }) => {
  const { _id, productImage, productStock, productSold, ProductDeleted } = data;
  const { activeProductRefetch, soldProductRefetch, deletedProductRefetch } =
    useContext(COUNTER_CONTEXT);

  let tempStock = productStock;

  const formRef = useRef();
  const [updateProductImage, setProductImage] = useState(
    `${process.env.REACT_APP_API_URL}/products/image/${productImage}`
  );

  const [fileName, setFileName] = useState(productImage);
  const [productImageData, setProductImageData] = useState(null);

  const [productFormData, setProductFormData] = useState({});

  const [restock, setRestock] = useState(ProductDeleted ? "no" : "yes");

  const handleRestock = (e) => {
    setRestock(e.target.value);
  };

  const [soldQuantity, setSoldQuantity] = useState({
    sm: 0,
    m: 0,
    l: 0,
    xl: 0,
    "2xl": 0,
    "3xl": 0,
    sum: 0,
  });
  const quantitySize = ["sm", "m", "l", "xl", "2xl", "3xl"];

  const handleQuantity = (e) => {
    tempStock[e.target.name] = parseInt(e.target.value);
  };

  const handleSold = (e) => {
    setSoldQuantity((prev) => ({
      ...prev,
      [e.target.name]: parseInt(e.target.value) ? parseInt(e.target.value) : 0,
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
    const formData = new FormData();

    let sum = 0;
    for (let key in soldQuantity) {
      if (key !== "sum" && key !== "_id") {
        sum += parseInt(soldQuantity[key]);
      }
    }
    soldQuantity.sum = sum;

    if (soldQuantity.sum > 0) {
      quantitySize.map((key) => {
        tempStock[key] = tempStock[key] - soldQuantity[key];
      });
    }

    sum = 0;
    for (let key in tempStock) {
      if (key !== "sum" && key !== "_id") {
        sum += parseInt(tempStock[key]);
      }
    }

    tempStock.sum = sum;

    formData.append(`productSold`, productSold + soldQuantity.sum);

    for (const key in tempStock) {
      formData.append(`productStock[${key}]`, tempStock[key]);
    }

    Object.entries(productFormData).map(([key, value]) => {
      formData.append(`${key}`, value);
    });
    productImageData?.length > 0 &&
      productImageData.map((file) => formData.append("file", file));

    formData.append("ProductDeleted", restock === "no" ? true : false);
    formData.append("productImage", productImage);

    update({
      endPoint: `products/${_id}`,
      method: "patch",
      data: formData,
      activeRefetch: activeProductRefetch,
      soldRefetch: soldProductRefetch,
      deleteRefetch: deletedProductRefetch,
      modalCloseID: _id,
    });
    formRef.current.reset();
  };
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id={_id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl ">
          <label
            htmlFor={_id}
            onClick={() => {
              formRef.current.reset();
            }}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          {/* body */}
          <div>
            <form ref={formRef} onSubmit={handleSubmit} className={formBodyCX}>
              <h2 className={formTitleCX}>Update Product</h2>

              <div className={profileImageCX}>
                <div className={imageUploadDiv}>
                  <div
                    className={imageUploadBox}
                    style={{
                      backgroundImage: `url(${updateProductImage})`,
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
                        : fileName.slice(0, 8) +
                          "..." +
                          fileName.slice(fileName.indexOf("."))
                      : "No file chosen"}
                  </h2>
                </div>
              </div>

              {ProductDeleted && (
                <div className={categorySectionCX}>
                  <h2 className={categoryTitleCX}>ReStock Product?</h2>

                  <fieldset className={inputContainerCX}>
                    <legend className={legendCx}>
                      <div className="flex  gap-2">
                        <div>Restock</div>
                      </div>
                    </legend>

                    <select
                      className={inputCX + " capitalize cursor-pointer"}
                      onChange={handleRestock}
                    >
                      <option value={"no"}>No</option>
                      <option value={"yes"}>Yes</option>
                    </select>
                  </fieldset>
                </div>
              )}

              <div className={categorySectionCX}>
                <h2 className={categoryTitleCX}>Product Information:</h2>
                <ProductInformation handleChange={handleChange} data={data} />
              </div>
              <div className={categorySectionCX}>
                <h2 className={categoryTitleCX}>Quantity Information:</h2>
                <QuantityInformation
                  handleChange={handleQuantity}
                  data={data}
                />
              </div>

              <div className={categorySectionCX}>
                <h2 className={categoryTitleCX}>Sold Information:</h2>
                <SoldInformation handleChange={handleSold} data={data} />
              </div>

              <div className={submitButtonCX}>
                <button type="submit" className={submitButton}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdateModal;
