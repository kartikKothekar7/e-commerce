import React from "react";
import ProductSkeleton from "./ProductSkeleton";

const BestSellerSkeleton = ({ count = 5 }) => {
  return (
    <div className="grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
      {[...Array(count)].map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
};

export default BestSellerSkeleton;
