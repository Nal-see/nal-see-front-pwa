import {
  IoThunderstormOutline,
  IoRainyOutline,
  IoSnowOutline,
  IoPartlySunnyOutline,
  IoSunnyOutline,
  IoCloudyOutline,
} from 'react-icons/io5';

const weatherIconSelector = (weather: string) => {
  // ['Thunderstorm', 'Rain', 'Snow', 'Fog', 'Clear', 'Clouds']
  if (weather === 'Thunderstorm') {
    return IoThunderstormOutline;
  }
  if (weather === 'Rain') {
    return IoRainyOutline;
  }
  if (weather === 'Snow') {
    return IoSnowOutline;
  }
  if (weather === 'Fog') {
    return IoCloudyOutline;
  }
  if (weather === 'Clear') {
    return IoSunnyOutline;
  }
  if (weather === 'Clouds') {
    return IoPartlySunnyOutline;
  }
  return IoSunnyOutline;
};

const weatherSelector = (weather: string) => {
  // ['Thunderstorm', 'Rain', 'Snow', 'Fog', 'Clear', 'Clouds']
  if (weather === 'Thunderstorm') {
    return '천둥번개';
  }
  if (weather === 'Rain') {
    return '비';
  }
  if (weather === 'Snow') {
    return '눈';
  }
  if (weather === 'Fog') {
    return '안개';
  }
  if (weather === 'Clear') {
    return '맑음';
  }
  if (weather === 'Clouds') {
    return '흐림';
  }
};

export { weatherIconSelector, weatherSelector };
