import { z } from 'zod';

export interface LoginBody {
  username: string;
  password: string;
}

export interface IUserInfoResponse {
  id: string;
  username: string;
  email: string;
  newUser: boolean;
  picture: string;
}

export interface IOptionalInfoForm {
  username: string;
  height: number | null;
  weight: number | null;
  constitution: string | null;
  style: string[];
  gender: string | null;
}

export const OptionalInfoFormSchema = z.object({
  username: z
    .string()
    .min(1, '닉네임은 필수입니다.')
    .max(10, '닉네임은 10자 이내로 작성해주세요.')
    .regex(
      /^[가-힣a-zA-Z0-9_]+$/,
      '언더스코어(_)를 제외한 특수문자를 사용할 수 없습니다.',
    ),
  height: z.nullable(
    z
      .number()
      .min(100, '키는 100~250cm 범위 내에서 입력할 수 있습니다.')
      .max(250, '키는 100~250cm 범위 내에서 입력할 수 있습니다.'),
  ),
  weight: z.nullable(
    z
      .number()
      .min(10, '몸무게는 10~200kg 범위 내에서 입력할 수 있습니다.')
      .max(200, '몸무게는 10~200kg 범위 내에서 입력할 수 있습니다.'),
  ),
  constitution: z.nullable(z.string()),
  style: z.nullable(z.array(z.string())),
  gender: z.nullable(z.string()),
});
