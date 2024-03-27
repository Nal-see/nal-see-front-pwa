import InputWrapper from '@/features/Posts/components/InputWrapper';
import { getUserDetails } from '@/features/Posts/services/getUserDetails';
import {
  constitutionOptions,
  genderOptions,
  styleOptions,
} from '@/features/Posts/utils/inputOptions';
import useAuthStore from '@/store/useAuthStore';
import { IPostCreateForm, PostCreateFormSchema } from '@/types/postCreate';
import { zodResolver } from '@hookform/resolvers/zod';
import { Selector } from 'antd-mobile';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

export const PostEditSheet = () => {
  const { user } = useAuthStore();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<IPostCreateForm>({
    resolver: zodResolver(PostCreateFormSchema),
  });

  const onSubmit = (data) => {
    console.log('data: ', data);
  };

  useEffect(() => {
    getUserDetails()
      .then((res) => {
        const userDetails = res.results;
        setValue('height', Number(userDetails.height));
        setValue('weight', Number(userDetails.weight));
        setValue('constitution', userDetails.constitution);
        setValue('style', userDetails.style);
        setValue('gender', userDetails.gender);
      })
      .catch((err) => {
        console.error('status code:', err);
      });
  }, []);

  return (
    <div className="h-[calc(100dvh-156px)] p-4">
      <textarea
        className="w-full text-lg focus:outline-none"
        placeholder="내용을 입력하세요..."
        {...register('content')}
      />
      <InputWrapper title="키">
        <input
          type="number"
          className="text-lg focus:outline-none"
          {...register('height')}
        />
      </InputWrapper>
      <InputWrapper title="몸무게">
        <input
          type="number"
          className="text-lg focus:outline-none"
          {...register('weight')}
        />
      </InputWrapper>
      <InputWrapper title="체질">
        <Controller
          control={control}
          name="constitution"
          render={({ field: { onChange, value } }) => (
            <Selector
              value={[value]}
              onChange={(selectedVal) => onChange(selectedVal[0])} // antd-mobile Selector 컴포넌트가 기본적으로 value를 배열로 받기 때문에 이와 같이 작성함
              showCheckMark={false}
              options={constitutionOptions}
            />
          )}
        />
      </InputWrapper>
      <InputWrapper title="스타일">
        <Controller
          control={control}
          name="style"
          render={({ field: { onChange, value } }) => (
            <Selector
              value={value}
              onChange={(selectedVal) => onChange(selectedVal)}
              multiple
              showCheckMark={false}
              options={styleOptions}
            />
          )}
        />
      </InputWrapper>
      <InputWrapper title="성별">
        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, value } }) => (
            <Selector
              value={[value]}
              onChange={(selectedVal) => onChange(selectedVal[0])}
              showCheckMark={false}
              options={genderOptions}
            />
          )}
        />
      </InputWrapper>
    </div>
  );
};
