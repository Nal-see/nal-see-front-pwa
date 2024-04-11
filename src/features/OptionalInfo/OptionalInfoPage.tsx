import InputWrapper from '@/features/OptionalInfo/components/InputWrapper';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Selector } from 'antd-mobile';
import {
  constitutionOptions,
  genderOptions,
  styleOptions,
} from '@/features/Posts/utils/inputOptions';
import { NalseeLogo } from '@/components/Icon';
import SplashSun from '@/assets/splash-sun.png';
import { Button } from '@/components/ui/button';
import { RightOutline } from 'antd-mobile-icons';
import { IOptionalInfoForm, OptionalInfoFormSchema } from '@/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { toast } from 'sonner';
import useAuthStore from '@/store/useAuthStore';
import { postOptionalInfo } from './services/optionalInfoServices';
import { useNavigate } from 'react-router-dom';

const OptionalInfoPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IOptionalInfoForm>({
    defaultValues: {
      username: user?.userName,
      height: null,
      weight: null,
      constitution: null,
      style: [],
      gender: null,
    },
    resolver: zodResolver(OptionalInfoFormSchema),
  });

  const submitForm: SubmitHandler<IOptionalInfoForm> = async (data) => {
    try {
      const response = await postOptionalInfo(data);
      if (response.status === 200) {
        toast.success('🎉 정보가 성공적으로 저장되었습니다!');
      }
    } catch (error) {
      console.error(error);
      toast.error('문제가 발생했습니다', {
        description: '마이페이지에서 다시 시도해주세요.',
      });
    }
    navigate('/home');
  };

  useEffect(() => {
    if (Object.keys(errors).length) {
      Object.values(errors).forEach((error) => {
        toast.warning(error.message);
      });
    }
  }, [errors]);

  return (
    <div className="flex h-[calc(100dvh-80px)] flex-col items-center justify-center gap-6 overflow-y-scroll p-5 scrollbar-hide">
      <div className="flex w-[300px] flex-col items-center justify-center gap-3">
        <NalseeLogo className="h-[60px] w-[120px]" />
        <div className="inline-flex items-center justify-center gap-4">
          <img src={SplashSun} className="w-[65px]" />
          <div>
            <p>
              🎉 <span className="font-semibold text-accent">날씨</span>에
              가입하신 것을 환영합니다! 🎉
            </p>
            <p>아래 선택 정보를 입력하면,</p>
            <p>
              <span className="font-semibold text-accent">
                맞춤 추천 알고리즘
              </span>
              으로
            </p>
            <p>나와 비슷한 체형, 체질, 스타일을</p>
            <p>가진 게시물들을 상위에 보여드려요.</p>
          </div>
        </div>
        <p className="mt-1 text-primary-foreground">
          입력을 원치 않으신다면, '계속' 버튼을 눌러주세요!
        </p>
      </div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="w-[calc(100dvw-40px)]">
          <InputWrapper title="닉네임">
            <input
              className="w-full text-base focus:outline-none"
              {...register('username')}
            />
          </InputWrapper>
          <div className="border-t-primary-foreground/90 flex flex-row items-center gap-2 border-t py-3">
            <div className="w-[32px] text-nowrap pl-3 text-lg font-semibold">
              키
            </div>
            <input
              className="w-1/5 text-right text-lg focus:outline-none"
              {...register('height', { valueAsNumber: true })}
            />
            <p className="text-primary-foreground">cm</p>
            <div className="w-[64px] text-nowrap pl-3 text-lg font-semibold">
              몸무게
            </div>
            <input
              className="w-1/4 text-right text-lg focus:outline-none"
              {...register('weight', { valueAsNumber: true })}
            />
            <p className="text-primary-foreground">kg</p>
          </div>
          <InputWrapper title="체질">
            <Controller
              control={control}
              name="constitution"
              render={({ field: { onChange, value } }) => (
                <Selector
                  value={value ? [value] : []}
                  onChange={
                    (selectedVal) => {
                      if (selectedVal.length) {
                        onChange(selectedVal[0]);
                      } else {
                        onChange(selectedVal);
                      }
                    } // antd-mobile Selector 컴포넌트가 기본적으로 value를 배열로 받기 때문에 이와 같이 작성함
                  }
                  showCheckMark={false}
                  options={constitutionOptions}
                />
              )}
            />
          </InputWrapper>
          <InputWrapper title="스타일">
            <div className="flex flex-col gap-2">
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
              <p className="text-primary-foreground">※ 복수 선택 가능</p>
            </div>
          </InputWrapper>
          <InputWrapper title="성별">
            <Controller
              control={control}
              name="gender"
              render={({ field: { onChange, value } }) => (
                <Selector
                  value={value ? [value] : []}
                  onChange={(selectedVal) => {
                    if (selectedVal.length) {
                      onChange(selectedVal[0]);
                    } else {
                      onChange(selectedVal);
                    }
                  }}
                  showCheckMark={false}
                  options={genderOptions}
                />
              )}
            />
          </InputWrapper>
        </div>

        <div className="inline-flex w-[calc(100dvw-40px)] justify-end">
          <Button
            type="submit"
            variant="accent"
            size="default"
            className="gap-1 pl-6 pr-4"
          >
            <p>계속</p>
            <RightOutline fontSize={16} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OptionalInfoPage;
