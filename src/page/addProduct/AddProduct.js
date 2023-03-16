import React, { useRef, useState } from "react";
import InputField from "../../components/inputField/InputField";
import { updateData } from "../../hooks/update";

const AddProduct = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    productName: "",
    productCategory: "",
    productBrand: "",
    productPrice: 0,
    productSold: 0,
    ProductDeleted: false,
    productStock: [],
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageChange = (event) => {
    setFormData({ ...formData, productImage: event.target.files });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("productName", formData.productName);
    data.append("productCategory", formData.productCategory);
    data.append("productBrand", formData.productBrand);
    data.append("productPrice", formData.productPrice);
    data.append("productSold", formData.productSold);
    data.append("ProductDeleted", formData.ProductDeleted);
    data.append("productImage", formData.productImage[0]);

    // let manageStock = [
    //   {
    //     sm: parseInt(event.target.sm.value ? event.target.sm.value : 0),
    //     m: parseInt(event.target.m.value ? event.target.m.value : 0),
    //     l: parseInt(event.target.l.value ? event.target.l.value : 0),
    //     xl: parseInt(event.target.xl.value ? event.target.xl.value : 0),
    //     "2xl": parseInt(
    //       event.target["2xl"].value ? event.target["2xl"]?.value : 0
    //     ),
    //     "3xl": parseInt(
    //       event.target["3xl"].value ? event.target["3xl"]?.value : 0
    //     ),
    //     sum:
    //       parseInt(event.target.sm.value ? event.target.sm.value : 0) +
    //       parseInt(event.target.m.value ? event.target.m.value : 0) +
    //       parseInt(event.target.l.value ? event.target.l.value : 0) +
    //       parseInt(event.target.xl.value ? event.target.xl.value : 0) +
    //       parseInt(event.target["2xl"].value ? event.target["2xl"]?.value : 0) +
    //       parseInt(event.target["3xl"].value ? event.target["3xl"]?.value : 0),
    //   },
    // ];

    // const data = {
    //   productName: event.target.productName?.value,
    //   file: event.target.productImage.files[0],
    //   productCategory: event.target.productCategory?.value,
    //   productBrand: event.target.productBrand?.value,
    //   productPrice: event.target.productPrice?.value,
    //   productStock: manageStock,
    //   productSold: 0,
    //   ProductDeleted: false,
    // };
    updateData({ endPoint: "products", data: formData, method: "POST" });
  };
  return (
    <div className="container  mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-center">Add Product</h1>
      </div>
      <div className="flex justify-center pt-10">
        <form onSubmit={handleSubmit} class="w-full">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-3">
            <InputField
              formData={formData}
              onChange={handleInputChange}
              name="productName"
              inputName="Product Name"
              type="text"
              requited
            />
            <InputField
              formData={formData}
              onChange={handleInputChange}
              name="productCategory"
              inputName="Product Category"
              type="text"
              requited
            />
            <InputField
              formData={formData}
              onChange={handleInputChange}
              name="productBrand"
              inputName="Product Brand"
              type="text"
              requited
            />
            <InputField
              formData={formData}
              onChange={handleInputChange}
              name="productPrice"
              inputName="Product Price"
              type="number"
              requited
            />
          </div>
          <div class="py-5">
            <div className="px-5 pb-4">
              <h2 className=" text-gray-700 text-base font-bold ">
                Add Stocks
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* <div className="flex flex-col">
                <InputField name="sm" inputName="S" small type="number" />
                <InputField name="m" inputName="M" small type="number" />
                <InputField name="l" inputName="L" small type="number" />
                <InputField name="xl" inputName="XL " small type="number" />
                <InputField name="2xl" inputName="2XL" small type="number" />
                <InputField name="3xl" inputName="3XL" small type="number" />
              </div> */}
              <div>
                <div class="flex items-center justify-center w-full">
                  <label
                    for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "
                  >
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        class="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p class="mb-2 text-sm text-gray-500 ">
                        <span class="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p class="text-xs text-gray-500 ">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      name="productImage"
                      type="file"
                      class="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
