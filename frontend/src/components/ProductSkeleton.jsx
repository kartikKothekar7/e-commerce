import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden rounded-xl bg-gray-200 animate-pulse h-64"></div>
      <div className="pt-3 pb-1">
        <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
      </div>
      <div className="text-sm font-medium pt-2">
        <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
