import React from 'react';

const FeedSkeletonCard: React.FC = () => {
  return (
    <div className="m-1 mb-4 w-[43vw] animate-pulse">
      <div className="mb-2 h-[30vh] rounded-md bg-gray-300"></div>
      <div>
        <div className="mb-1 flex items-center">
          <div className="mr-2 size-10 rounded-full bg-gray-300"></div>
          <div className="h-4 w-32 rounded bg-gray-300"></div>
        </div>
        <div className="mb-2 h-4 w-full rounded bg-gray-300"></div>
        <div className="mb-2 h-4 w-full rounded bg-gray-300"></div>
        <div className="flex">
          <div className="mr-4 size-6 rounded-full bg-gray-300"></div>
          <div className="size-6 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default FeedSkeletonCard;
