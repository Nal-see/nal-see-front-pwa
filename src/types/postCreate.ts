import { z } from 'zod';

export interface IPostCreateHeader {
  step: number;
  setStep: (step: number) => void;
}

export interface IPostCreateForm {
  requestDto: {
    userId: string;
    content: string;
    latitude: number;
    longitude: number;
    userInfo: {
      height: number;
      weight: number;
      bodyShape: string;
      constitution: string;
      style: string;
      gender: string;
    };
  };
  photos: File[] | null;
}

export const PostCreateFormSchema = z.object({});

export interface ISelectedLocation {
  lng: number;
  lat: number;
  address: string;
}

export interface IKakaoAddressData {
  meta: {
    total_count: number;
  };
  documents: IKakaoAddressDocType[];
}

export interface IKakaoAddressDocType {
  region_type: string;
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_4depth_name: string;
  code: string;
  x: number;
  y: number;
}
