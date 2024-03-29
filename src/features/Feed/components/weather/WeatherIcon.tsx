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
    <div className="flex items-center justify-between py-3 pr-4">
      <div className="flex items-center justify-between gap-3">
        <Player
          src={src}
          background="transparent"
          speed={1}
          style={{ width: '65px', height: '65px' }}
          loop
          autoplay
        />
        <div className="text-base font-normal">날씨 </div>
        <div className="text-base font-bold">{weatherSelector(weather)}</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-base font-bold">온도</div>
        <div className="text-base font-bold">{temperature}°C</div>
      </div>
    </div>
  );
};

export default WeatherAnimation;
