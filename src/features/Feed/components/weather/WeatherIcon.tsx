import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import {
  formatWeatherToIcon,
  weatherSelector,
} from '../../utils/dataFormatUtil';

interface WeatherAnimationProps {
  weather: string;
  temperature: string;
}

const WeatherAnimation: React.FC<WeatherAnimationProps> = ({
  weather,
  temperature,
}) => {
  const src = formatWeatherToIcon(weather);

  return (
    <div className="flex justify-between">
      <div className="flex">
        <Player
          src={src}
          background="transparent"
          speed={1}
          style={{ width: '90px', height: '90px' }}
          loop
          autoplay
        />
        <div className="flex items-center gap-3">
          <div className="text-xl font-normal">날씨 </div>
          <div className="text-xl font-bold">{weatherSelector(weather)}</div>
        </div>
      </div>
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="text-xl font-bold">온도 </div>
          <div className="text-xl font-bold">{temperature}°C</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherAnimation;
