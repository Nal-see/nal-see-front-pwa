import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FeedDetailSkeletonCard: React.FC = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="mb-4 animate-pulse">
      <div className="flex items-center p-3 px-4">
        <div className="mr-3 size-10 rounded-full bg-gray-300"></div>
        <div className="flex flex-col">
          <div className="mb-2 h-4 w-32 rounded bg-gray-300"></div>
          <div className="h-3 w-24 rounded bg-gray-300"></div>
        </div>
        <div className="ml-auto h-3 w-20 rounded bg-gray-300"></div>
      </div>
      <Slider {...sliderSettings}>
        {[1, 2, 3].map((index) => (
          <div key={index} className="h-64 bg-gray-300"></div>
        ))}
      </Slider>
      <div className="p-3">
        <div className="mb-2 flex">
          <div className="mr-2 size-5 rounded-full bg-gray-300"></div>
          <div className="size-5 rounded-full bg-gray-300"></div>
        </div>
        <div className="mb-2 h-4 w-20 rounded bg-gray-300"></div>
        <div className="mb-2 h-4 w-full rounded bg-gray-300"></div>
        <div className="h-4 w-48 rounded bg-gray-300"></div>
      </div>
    </div>
  );
};

export default FeedDetailSkeletonCard;
