import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonProductCard() {
  return (
    <SkeletonTheme
      baseColor="hsl(210, 40%, 90%)" // Light mode background
      highlightColor="hsl(210, 40%, 100%)" // Light mode shimmer
    >
      <Card className="w-[90vw] sm:w-[350px] overflow-hidden shadow-md shadow-slate-400  flex flex-col  bg-gradient-to-br from-white via-slate-50 to-sky-100  border-gray-200 dark:from-slate-900 dark:via-slate-950 dark:to-sky-950 dark:border dark:border-white/10 dark:shadow-md dark:shadow-white/20 h-full">
        <CardContent>
          <div className="relative w-full aspect-[3/2] overflow-hidden">
            <Skeleton
              style={{ height: '100%', width: '100%', display: 'block' }}
            />
            <div className="absolute top-3 right-3 rounded-lg px-2 py-1 bg-white  text-xs shadow-md dark:bg-sky-950">
              <Skeleton width={50} />
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-3 gap-3  flex-grow">
          <p>
            <Skeleton className="w-full h-10" />
          </p>
          {/* Price with discount */}
          <div className="flex items-center gap-3">
            <div className="text-md">
              <div className="flex gap-2">
                <Skeleton
                  width={20}
                  className="h-5"
                />
                <Skeleton
                  width={45}
                  className="h-5"
                />
              </div>
            </div>

            <span className="text-md">
              <div className="flex gap-2">
                <Skeleton
                  width={20}
                  className="h-5"
                />
                <Skeleton
                  width={45}
                  className="h-5"
                />
              </div>
            </span>
          </div>
        </CardFooter>
      </Card>
    </SkeletonTheme>
  );
}

export default SkeletonProductCard;
