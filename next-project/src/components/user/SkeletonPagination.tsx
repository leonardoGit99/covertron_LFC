import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function SkeletonPagination() {
  return (
    <SkeletonTheme
      baseColor="hsl(210, 40%, 90%)" // Light mode background
      highlightColor="hsl(210, 40%, 100%)" // Light mode shimmer
    >
      <div className="flex justify-center w-full mb-6">
        <div className="flex gap-3">
          <Skeleton
            width={120}
            height={30}
          />
          <Skeleton
            width={30}
            height={30}
          />
          <Skeleton
            width={120}
            height={30}
          />
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default SkeletonPagination;
