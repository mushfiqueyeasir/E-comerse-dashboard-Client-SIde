import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsCartCheckFill } from "react-icons/bs";

const ProductCard = ({ data, sold, deleted }) => {
  const {
    productName,
    productImage,
    productCategory,
    productBrand,
    productStock,
    productPrice,
  } = data;

  return (
    <div>
      <div class="w-full bg-white border border-gray-200 rounded-lg shadow ">
        <img
          class="rounded-t-lg h-[10rem] w-[20rem] object-cover"
          src={`${process.env.REACT_APP_IMG_API_URL}/image/${productImage}`}
          alt="product"
        />
        <div className="py-2 px-2 text-base">
          <div class=" pb-5 flex flex-col gap-y-2">
            <div className="flex gap-3">
              <div className="px-1 bg-red-200 rounded-md">
                {productCategory}
              </div>
              <div className="px-1 bg-blue-300 rounded-md">{productBrand}</div>
            </div>
            <h5 class="text-[1rem] font-semibold tracking-tight text-gray-900  text-center">
              {productName}
            </h5>

            <div class="flex items-center justify-between">
              {!deleted && (
                <div className="flex items-center gap-1">
                  {React.createElement(
                    sold ? BsCartCheckFill : AiOutlineShoppingCart,
                    { size: "20" }
                  )}
                  {productStock[0].sum}
                </div>
              )}

              {!sold && (
                <span class="text-base font-bold text-gray-900">
                  ৳{productPrice}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
