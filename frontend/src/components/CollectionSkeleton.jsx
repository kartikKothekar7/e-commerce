import React from "react";
import ProductSkeleton from "./ProductSkeleton";

const CollectionSkeleton = ({ count = 12 }) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 gap-y-6">
      {[...Array(count)].map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
};

export default CollectionSkeleton;
