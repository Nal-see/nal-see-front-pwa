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
    <div className="flex">
      <Player
        src={src}
        background="transparent"
        speed={1}
        style={{ width: '100px', height: '100px' }}
        loop
        autoplay
      />
      <div className="ml-2 flex flex-col justify-center">
        <span className="text-sm font-medium">{weatherSelector(weather)}</span>
        <span className="text-sm font-medium">{temperature}°C</span>
      </div>
    </div>
  );
};

export default WeatherAnimation;
