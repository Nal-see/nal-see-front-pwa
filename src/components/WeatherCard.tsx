import {
  formatWeatherToImage,
  weatherSelector,
} from '@/features/Feed/utils/dataFormatUtil';

export const WeatherBar = ({
  weather,
  temperature,
}: {
  weather: string;
  temperature: string | number;
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-3">
        <img
          src={`${formatWeatherToImage(weather)}`}
          className="size-13"
          alt=""
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
