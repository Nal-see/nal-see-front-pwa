import { ChangeEvent, useEffect, useState } from 'react';
import PostCreateHeader from './components/PostCreateHeader';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  IPostCreateForm,
  ISelectedLocation,
  PostCreateFormSchema,
} from '@/types/postCreate';
import PostImagePreview from './components/PostImagePreview';
import { AddOutline } from 'antd-mobile-icons';
import { toast } from 'sonner';
import LocationSelector from './components/LocationSelector';
import { getUserDetails } from './services/getUserDetails';
import InputWrapper from './components/InputWrapper';
import { Selector } from 'antd-mobile';
import {
  constitutionOptions,
  genderOptions,
  styleOptions,
} from './utils/inputOptions';
import useAuthStore from '@/store/useAuthStore';
import { createPostApi } from './services/createPostApi';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { BeatLoader } from 'react-spinners';
import ImageCropper from './components/ImageCropper';
import { MdAddPhotoAlternate } from 'react-icons/md';

const PostCreatePage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedImg, setSelectedImg] = useState<string>('');
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [openCropper, setOpenCropper] = useState(false);
  const [croppedImgFiles, setCroppedImgFiles] = useState<globalThis.File[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<ISelectedLocation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate } = useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: IPostCreateForm }) =>
      createPostApi(userId, data),
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: () => {
      reset();
      setIsSubmitting(false);
      navigate(-1);
      toast.success('게시물이 등록되었습니다.');
    },
    onError: (err) => {
      console.error(err);
      toast.error('문제가 발생했습니다. 다시 시도해주세요.');
      setIsSubmitting(false);
    },
  });

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    control,
    trigger,
    clearErrors,
    formState: { errors },
  } = useForm<IPostCreateForm>({
    defaultValues: {
      photos: [],
    },
    resolver: zodResolver(PostCreateFormSchema),
  });

  const constitutionFormValue = watch('constitution');
  const genderFormValue = watch('gender');

  const onSubmit: SubmitHandler<IPostCreateForm> = (data) => {
    if (user) {
      mutate({ userId: user.userId, data });
    }
  };

  const handleInputImgChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      if (!files.length) return;

      if (croppedImgFiles.length + files.length > 3) {
        toast.error('사진은 최대 3장 업로드할 수 있습니다.');
        return;
      }

      if (croppedImgFiles.find((file) => file.name === files[0].name)) {
        toast.error(
          '중복되는 사진을 선택했습니다. 목록에서 자동으로 제외됩니다.',
        );
        return;
      }

      // cropper에 전달할 이미지 상태 저장
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImg(reader.result as string);
        setSelectedFileName(files[0].name);
      };
      reader.readAsDataURL(files[0]);

      // 이미지 크롭을 위해 모달 Open
      setOpenCropper(true);
    }
  };

  // Image file 선택 취소 (제거)
  const removeSelectedImg = (fileName: string) => {
    setCroppedImgFiles((prev) => {
      return prev.filter((file) => file.name !== fileName);
    });
  };

  // 이미지 크롭 완료 후 formData값으로 저장
  useEffect(() => {
    setValue('photos', croppedImgFiles, { shouldValidate: true });
  }, [croppedImgFiles, setValue]);

  // 선택된 Location 좌표값을 React hook form field value로 Set
  useEffect(() => {
    if (selectedLocation) {
      setValue('address', selectedLocation.address);
      setValue('longitude', selectedLocation.lng);
      setValue('latitude', selectedLocation.lat);
    }
  }, [selectedLocation, setValue]);

  // 최초 렌더링 시 : 유저 상세 정보 fetch 후 form 기본값으로 지정
  useEffect(() => {
    getUserDetails()
      .then((res) => {
        const userDetails = res.results;
        setValue('height', userDetails.height);
        setValue('weight', userDetails.weight);
        setValue('constitution', userDetails.constitution);
        setValue('style', userDetails.style);
        setValue('gender', userDetails.gender);
      })
      .catch((err) => {
        console.error('유저 선택 정보 fetch 실패, status code:', err);
      });
  }, []);

  // 체질, 성별 : 선택 취소한 경우 Null값 부여
  useEffect(() => {
    if (!constitutionFormValue?.length) setValue('constitution', null);
    if (!genderFormValue?.length) setValue('gender', null);
  }, [constitutionFormValue, genderFormValue, setValue]);

  return (
    <>
      <div className="h-[calc(100dvh-80px)]">
        {isSubmitting && (
          <BeatLoader
            color="var(--primary-foreground)"
            className="absolute left-1/2 top-1/2 z-[3] -translate-x-7 -translate-y-5"
          />
        )}
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <PostCreateHeader
            step={currentStep}
            setStep={setCurrentStep}
            formTrigger={trigger}
            isSubmitting={isSubmitting}
          />
          <div className="h-[calc(100dvh-158px)] overflow-auto scrollbar-hide">
            {/* STEP 1 : 사진 선택 */}
            {currentStep === 0 && (
              <div className="flex h-[calc(100dvh-158px)] flex-col items-center gap-3 p-4 min-h-790:justify-center max-h-789:justify-start">
                {/* 사진 업로드를 위한 File Input */}
                <div>
                  <label htmlFor="photos">
                    <div className="inline-flex h-10 w-[calc(100dvw/3)] items-center justify-center gap-1 whitespace-nowrap rounded-md bg-accent px-4 py-2 text-sm font-medium text-white shadow-sm sm:w-[calc(400px/3)]">
                      <AddOutline fontSize={14} />
                      <p>사진 선택하기</p>
                    </div>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="photos"
                    className="hidden"
                    onChange={handleInputImgChange}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  {/* 업로드한 이미지 프리뷰 */}
                  {croppedImgFiles.map((file) => (
                    <PostImagePreview
                      key={file.name}
                      file={file}
                      onRemove={removeSelectedImg}
                    />
                  ))}
                  {!croppedImgFiles.length && (
                    <div className="flex h-[calc(100dvw/9*4)] w-[calc(100dvw/3)] flex-col items-center justify-center gap-1 border border-primary-foreground bg-[#E2E6E9] text-primary-foreground sm:h-[calc(400px/9*4)] sm:w-[calc(400px/3)]">
                      <MdAddPhotoAlternate size={30} />
                      <p className="px-2 text-center text-primary-foreground">
                        사진은 총 3장
                        <br />
                        선택할 수 있어요.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 2 : 위치 선택 */}
            {currentStep === 1 && (
              <div className="h-[calc(100dvh-158px)]">
                <LocationSelector
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                />
              </div>
            )}

            {/* STEP 3 : 기타 게시물 정보 입력 */}
            {currentStep === 2 && (
              <div className="relative h-[calc(100dvh-158px)] overflow-auto p-4 scrollbar-hide">
                <Controller
                  control={control}
                  name="content"
                  render={({ field: { onChange, value } }) => (
                    <textarea
                      value={value}
                      className="w-full text-lg focus:outline-none"
                      placeholder="내용을 입력하세요..."
                      onChange={async (value) => {
                        onChange(value);
                        if (await trigger('content')) clearErrors('content');
                      }}
                    />
                  )}
                />

                {errors['content'] && (
                  <div className="absolute right-6 top-[170px] text-red-400">
                    게시물 내용을 최소 10자 이상 입력해주세요.
                  </div>
                )}
                <InputWrapper title="키">
                  <input
                    className="text-lg focus:outline-none"
                    {...register('height')}
                  />
                </InputWrapper>
                <InputWrapper title="몸무게">
                  <input
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
                        value={value ? [value] : []}
                        onChange={(selectedVal) => {
                          if (selectedVal.length) {
                            onChange(selectedVal[0]);
                          } else {
                            onChange(selectedVal);
                          }
                        }} // antd-mobile Selector 컴포넌트가 기본적으로 value를 배열로 받기 때문에 이와 같이 작성함
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
            )}
          </div>
        </form>
      </div>
      <ImageCropper
        openCropper={openCropper}
        setOpenCropper={setOpenCropper}
        selectedImgURL={selectedImg}
        selectedFileName={selectedFileName}
        setCroppedImgFiles={setCroppedImgFiles}
      />
    </>
  );
};

export default PostCreatePage;
