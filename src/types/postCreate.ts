import { z } from 'zod';

export interface IPostCreateHeader {
  step: number;
  setStep: (step: number) => void;
}

export interface IPostCreateForm {
  content: string;
  address: string;
  latitude: number;
  longitude: number;
  height: number | null;
  weight: number | null;
  constitution: string | null;
  style: string[];
  gender: string | null;
  photos: File[] | null;
}

export const PostCreateFormSchema = z.object({
  content: z.string().min(10, '글을 10자 이상 작성해주세요.'),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  height: z.string().optional(),
  weight: z.string().optional(),
  constitution: z.array(z.string()).optional(),
  style: z.array(z.string()).optional(),
  gender: z.array(z.string()).optional(),
  photos: z.array(z.instanceof(File)),
});

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
