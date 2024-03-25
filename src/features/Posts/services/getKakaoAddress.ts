import { IKakaoAddressData } from '@/types/postCreate';
import axios, { AxiosError } from 'axios';

export const getKakaoAddress: (
  lng: number,
  lat: number,
) => Promise<IKakaoAddressData> = async (lng: number, lat: number) => {
  try {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lng}&y=${lat}`,
      {
        headers: {
          Authorization:
            'KakaoAK ' + `${import.meta.env.VITE_KAKAO_RESTAPI_KEY}`,
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    const err = error as AxiosError;
    if (err) {
      console.error(err);
    }
  }
};
