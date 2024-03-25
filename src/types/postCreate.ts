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
