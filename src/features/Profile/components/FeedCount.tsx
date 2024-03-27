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
