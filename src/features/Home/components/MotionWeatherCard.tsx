import {
  formatWeatherToImage,
  weatherSelector,
} from '@/features/Feed/utils/dataFormatUtil';
import { motion } from 'framer-motion';
import { useState } from 'react';

const MotionWeatherCard = () => {
  const [expand, setExpand] = useState<boolean>(false);
  const temporaryData = [
    'Thunderstorm',
    'Rain',
    'Snow',
    'Fog',
    'Clear',
    'Clouds',
  ];

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
        {!expand && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center justify-center gap-4"
          >
            <div className="size-[30px]">
              <img src={formatWeatherToImage(temporaryData[0])} />
            </div>
            <div className="flex items-center justify-center">
              <p className="text-center text-xs font-normal leading-[18px] text-black">
                날씨
              </p>
              <p className="w-[52px] text-center text-xs font-semibold leading-[18px] text-black">
                {weatherSelector(temporaryData[0])}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center text-xs font-normal leading-[18px] text-black">
                온도
              </div>
              <p className="w-[52px] text-center text-xs font-semibold leading-[18px] text-black">
                -1.6°
              </p>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-center text-xs font-normal leading-[18px] text-black">
                체감온도
              </p>
              <p className="w-[52px] text-center text-xs font-semibold leading-[18px] text-black">
                -6.7°
              </p>
            </div>
          </motion.div>
        )}
        {expand && (
          <motion.div
            initial={{ scaleY: 0.5, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center gap-1 py-0.5">
              <p className="w-[70px] text-center text-xs font-medium leading-[18px] text-neutral-400">
                서울시 송파구
              </p>
            </div>
            <div className="inline-flex items-start justify-start gap-4">
              <div className="flex size-[60px] items-center justify-center pb-[10.50px] pl-[5px] pr-1 pt-[11px]">
                <img src={formatWeatherToImage(temporaryData[0])} />
              </div>
              <div className="inline-flex flex-col items-center justify-center gap-1">
                <p className="text-center text-sm font-medium leading-tight text-black">
                  날씨
                </p>
                <p className="w-[70px] text-center text-xl font-semibold leading-7 text-black">
                  구름조금
                </p>
              </div>
              <div className="inline-flex flex-col items-center justify-center gap-1">
                <p className="text-center text-sm font-medium leading-tight text-black">
                  온도
                </p>
                <p className="w-[70px] text-center text-xl font-semibold leading-7 text-black">
                  -1.6°
                </p>
              </div>
              <div className="inline-flex flex-col items-center justify-center gap-1">
                <p className="text-center text-sm font-medium leading-tight text-black">
                  체감온도
                </p>
                <p className="w-[70px] text-center text-xl font-semibold leading-7 text-black">
                  -6.7°
                </p>
              </div>
            </div>
            <div className="inline-flex items-start justify-center gap-6">
              <div className="inline-flex items-center justify-center gap-1 self-stretch">
                <p className="text-center text-xs font-medium leading-[18px] text-black">
                  미세먼지
                </p>
                <div className="flex items-center justify-center gap-2 rounded-[22px] bg-yellow-400 px-2 py-0.5">
                  <p className="w-[22px] text-center text-xs font-medium leading-[18px] text-white">
                    보통
                  </p>
                </div>
              </div>
              <div className="inline-flex items-center justify-center gap-1 self-stretch">
                <p className="text-center text-xs font-medium leading-[18px] text-black">
                  초미세먼지
                </p>
                <div className="flex items-center justify-center gap-2 rounded-[22px] bg-sky-400 px-2 py-0.5">
                  <p className="w-[22px] text-center text-xs font-medium leading-[18px] text-white">
                    좋음
                  </p>
                </div>
              </div>
              <div className="inline-flex items-center justify-center gap-1 self-stretch">
                <p className="text-center text-xs font-medium leading-[18px] text-black">
                  자외선
                </p>
                <div className="flex items-center justify-center rounded-[22px] bg-sky-500 px-[5px] py-0.5">
                  <p className="w-[46px] text-center text-xs font-medium leading-[18px] text-white">
                    아주 좋음
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
