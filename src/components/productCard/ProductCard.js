import React, { useContext } from "react";

import { AiOutlineShoppingCart, AiFillDelete } from "react-icons/ai";
import { BsCartCheckFill } from "react-icons/bs";
import Swal from "sweetalert2";
import { COUNTER_CONTEXT } from "../../App";
import { update } from "../../hooks/update";

const ProductCard = ({ data, sold, deleted }) => {
  const {
    _id,
    productName,
    productImage,
    productCategory,
    productBrand,
    productStock,
    productPrice,
    productSold,
    ProductDeleted,
  } = data;
  const {
    user,
    activeProductRefetch,
    soldProductRefetch,
    deletedProductRefetch,
  } = useContext(COUNTER_CONTEXT);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append(`ProductDeleted`, true);
        update({
          endPoint: `products/${_id}`,
          method: "patch",
          data: formData,
          activeRefetch: activeProductRefetch,
          soldRefetch: soldProductRefetch,
          deleted: true,
        });
        deletedProductRefetch();

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <label htmlFor={_id} className="cursor-pointer">
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow relative ">
        {!ProductDeleted && user?.role !== "viewer" && (
          <button
            onClick={handleDelete}
            className="absolute right-2 top-2 text-red-500 p-3 bg-base-300 rounded-full hover:scale-[1.2] duration-300"
          >
            {React.createElement(AiFillDelete, { size: "20" })}
          </button>
        )}

        {productImage ? (
          <img
            className="rounded-t-lg h-[10rem] w-[20rem] object-cover"
            src={`${process.env.REACT_APP_API_URL}/products/image/${productImage}`}
            alt="product"
          />
        ) : (
          <div className="uppercase rounded-t-lg bg-slate-300 h-[10rem] flex justify-center items-center text-[6rem] font-bold text-gray-600 ">
            {productName.slice(0, 2)}
          </div>
        )}
        <div className="py-2 px-2 text-base">
          <div className=" flex flex-col gap-y-2">
            <div className="flex justify-between gap-3 text-[.9rem]">
              <div className="px-1 bg-red-200 rounded-md capitalize">
                {productCategory.length > 8
                  ? productCategory.slice(0, 6) + ".."
                  : productCategory}
              </div>
              <div className="px-1 bg-blue-300 rounded-md capitalize">
                {productBrand.length > 8
                  ? productBrand.slice(0, 6) + ".."
                  : productBrand}
              </div>
            </div>
            <h5 className="text-[1.1rem] font-semibold tracking-tight text-gray-900 capitalize  text-center">
              {productName.length > 15
                ? productName.slice(0, 12) + "..."
                : productName}
            </h5>

            <div className="flex items-center justify-between">
              {!deleted && (
                <div className="flex items-center gap-1">
                  {React.createElement(
                    sold ? BsCartCheckFill : AiOutlineShoppingCart,
                    { size: "20" }
                  )}
                  {sold ? productSold : productStock?.sum}
                </div>
              )}

              {!sold && (
                <span className="text-base font-bold text-gray-900">
                  ৳{productPrice}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </label>
  );
};

export default ProductCard;
