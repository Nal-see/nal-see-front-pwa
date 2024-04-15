import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

type FeedCountProp = {
  count: string | number;
  counterName: string;
};

const FeedCount: React.FC<FeedCountProp> = ({ count, counterName }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-base font-bold">{count}</p>
      <h3 className="text-base">{counterName}</h3>
    </div>
  );
};

export default FeedCount;

export const FeedCountSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Skeleton className="h-8 w-5" />
      <Skeleton className="h-8 w-20" />
    </div>
  );
};
