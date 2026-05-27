import React from "react";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => (
  <div className={`shimmer rounded-2xl ${className}`} />
);

export const ProductCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
    <Skeleton className="aspect-[3/4]" />
    <div className="p-5 space-y-3">
      <Skeleton className="h-3 w-1/3" />
      <Skeleton className="h-5 w-3/4" />
      <div className="flex justify-between items-center pt-1">
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-3 w-1/5" />
      </div>
    </div>
  </div>
);

export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);
