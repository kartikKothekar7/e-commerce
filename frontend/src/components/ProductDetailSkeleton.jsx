import React from "react";

const ProductDetailSkeleton = () => {
  return (
    <div className="pt-10 transition-opacity duration-500 ease-in border-t-2">
      {/* Product Data */}
      <div className="flex flex-col gap-12 sm:gap-12 sm:flex-row">
        {/* Product Images Skeleton */}
        <div className="flex flex-col-reverse flex-1 gap-3 sm:flex-row">
          <div className="flex justify-between overflow-x-auto sm:flex-col sm:overflow-y-scroll sm:justify-normal sm:w-[18.7%] w-full">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 bg-gray-200 animate-pulse h-16 sm:h-20 rounded"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%] bg-gray-200 animate-pulse h-96 rounded"></div>
        </div>

        {/* Product Info Skeleton */}
        <div className="flex-1">
          <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4"></div>
          <div className="flex items-center gap-2 mt-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="w-4 h-4 bg-gray-200 animate-pulse rounded"
              ></div>
            ))}
          </div>
          <div className="h-8 bg-gray-200 animate-pulse rounded w-1/4 mt-4"></div>
          <div className="h-20 bg-gray-200 animate-pulse rounded mt-6"></div>

          {/* Size Selection Skeleton */}
          <div className="mt-8">
            <div className="h-6 bg-gray-200 animate-pulse rounded w-1/4 mb-4"></div>
            <div className="flex gap-2">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="h-10 w-12 bg-gray-200 animate-pulse rounded"
                ></div>
              ))}
            </div>
          </div>

          {/* Add to Cart Button Skeleton */}
          <div className="h-12 bg-gray-200 animate-pulse rounded mt-6 w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
