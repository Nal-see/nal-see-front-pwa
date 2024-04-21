import {
  formatWeatherToImage,
  weatherSelector,
} from '@/features/Feed/utils/dataFormatUtil';
import { getKakaoAddress } from '@/features/Posts/services/getKakaoAddress';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { switchPm10Icon, switchPm25Icon } from '../utils/weatherUtils';

const MotionWeatherCard = () => {
  const { longitude, latitude } = useCurrentLocation();
  const [expand, setExpand] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');

  const { data, error, isLoading } = useQuery({
    queryKey: ['currentWeather', longitude, latitude],
    queryFn: () =>
      api.get(`/api/weather/current`, {
        params: {
          longitude: longitude,
          latitude: latitude,
        },
      }),
  });

  // 행정동 표시를 위한 getKakaoAddress api call
  useEffect(() => {
    if (longitude && latitude) {
      getKakaoAddress(longitude, latitude).then((res) => {
        const addressH = res.documents.filter(
          (doc) => doc.region_type === 'H',
        )[0];

        setAddress(addressH.address_name);
      });
    }
  }, [longitude, latitude]);

  return (
    <>
      <motion.div
        layout
        transition={{ layout: { duration: 1, type: 'spring' } }}
        onClick={() => setExpand(!expand)}
        style={{
          height: expand ? '9rem' : '46px',
          paddingTop: '0.5rem',
          paddingBottom: expand ? '1rem' : '0.5rem',
        }}
        className="absolute inset-x-0 top-5 z-[3] mx-auto inline-flex w-[350px] flex-col items-start justify-center rounded-xl bg-white px-4 shadow"
      >
        {isLoading ? (
          <div className="inline-flex items-center justify-center gap-4">
            <div className="font-light text-primary-foreground">
              🧚 날씨 요정이 현재 날씨를 불러오는 중입니다...
            </div>
          </div>
        ) : error || !data ? (
          <div className="inline-flex items-center justify-center gap-4">
            <div className="font-light text-primary-foreground">
              ⚠️ 죄송합니다. 현재 날씨를 불러올 수 없습니다.
            </div>
          </div>
        ) : !expand ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center justify-center gap-4"
          >
            <div className="size-[30px]">
              <img src={formatWeatherToImage(data.data.results.weather)} />
            </div>
            <div className="flex items-center justify-center">
              <p className="text-center text-xs font-normal leading-[18px] text-black">
                날씨
              </p>
              <p className="w-[52px] text-center text-xs font-semibold leading-[18px] text-black">
                {weatherSelector(data.data.results.weather)}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center text-xs font-normal leading-[18px] text-black">
                온도
              </div>
              <p className="w-[52px] text-center text-xs font-semibold leading-[18px] text-black">
                {data.data.results.temperature}°
              </p>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-center text-xs font-normal leading-[18px] text-black">
                체감온도
              </p>
              <p className="w-[52px] text-center text-xs font-semibold leading-[18px] text-black">
                {data.data.results.feelsLike}°
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scaleY: 0.5, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* 행정동 */}
            <div className="inline-flex items-center justify-center gap-1 py-0.5 pb-2">
              <p className="text-center text-xs font-medium leading-[18px] text-neutral-400">
                {address}
              </p>
            </div>
            <div className="inline-flex items-start justify-start gap-4">
              <div className="flex size-[60px] items-center justify-center pb-[10.50px] pl-[5px] pr-1 pt-[11px]">
                <img src={formatWeatherToImage(data.data.results.weather)} />
              </div>
              <div className="inline-flex flex-col items-center justify-center gap-1">
                <p className="text-center text-sm font-light leading-tight text-black">
                  날씨
                </p>
                <p className="w-[70px] text-center text-xl font-semibold leading-7 text-black">
                  {weatherSelector(data.data.results.weather)}
                </p>
              </div>
              <div className="inline-flex flex-col items-center justify-center gap-1">
                <p className="text-center text-sm font-light leading-tight text-black">
                  온도
                </p>
                <p className="w-[70px] text-center text-xl font-semibold leading-7 text-black">
                  {data.data.results.temperature}°
                </p>
              </div>
              <div className="inline-flex flex-col items-center justify-center gap-1">
                <p className="text-center text-sm font-light leading-tight text-black">
                  체감온도
                </p>
                <p className="w-[70px] text-center text-xl font-semibold leading-7 text-black">
                  {data.data.results.feelsLike}°
                </p>
              </div>
            </div>
            <div className="inline-flex w-full items-start justify-evenly">
              <div className="inline-flex items-center justify-center gap-1 self-stretch">
                <p className="text-center text-xs font-medium leading-[18px] text-black">
                  미세먼지
                </p>
                <img src={switchPm10Icon(data.data.results.pm10)} />
              </div>
              <div className="inline-flex items-center justify-center gap-1 self-stretch">
                <p className="text-center text-xs font-medium leading-[18px] text-black">
                  초미세먼지
                </p>
                <img src={switchPm25Icon(data.data.results.pm25)} />
              </div>
              <div className="inline-flex items-center justify-center gap-1 self-stretch">
                <p className="text-center text-xs font-medium leading-[18px] text-black">
                  습도
                </p>
                <div className="flex items-center justify-center rounded-[22px] bg-sky-500 px-[5px] py-0.5">
                  <p className="w-[46px] text-center text-xs font-medium leading-[18px] text-white">
                    {data.data.results.humidity}%
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default MotionWeatherCard;
