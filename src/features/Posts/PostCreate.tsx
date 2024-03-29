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

const PostCreatePage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [imgFiles, setImgFiles] = useState<globalThis.File[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<ISelectedLocation | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
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

  useEffect(() => {
    if (errors) {
      console.log('form error', errors);
      console.log('photo', getValues('photos'));
    }
  }, [errors]);

  const onSubmit: SubmitHandler<IPostCreateForm> = (data) => {
    if (user) {
      createPostApi(user.userId, data)
        .then((res) => {
          if (res.success === true) {
            reset();
            navigate(-1);
            toast.success('게시물이 등록되었습니다.');
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error('문제가 발생했습니다. 다시 시도해주세요.');
        });
    }
  };

  const handleInputImgChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      let fileListToArray = Array.from(files);

      // 선택 사진 갯수 제한
      if (imgFiles.length + fileListToArray.length > 3) {
        toast.error('사진은 최대 3장 업로드할 수 있습니다.');
        return;
      }

      // 중복되는 사진을 추가할 경우 파일 목록에서 제거
      imgFiles.forEach((file) => {
        if (fileListToArray.find((newFile) => newFile.name === file.name)) {
          fileListToArray = fileListToArray.filter(
            (newFile) => newFile.name !== file.name,
          );

          toast.error(
            '중복되는 사진을 선택했습니다. 목록에서 자동으로 제외됩니다.',
          );
        }
      });

      // 상태값으로 이미지 파일 저장 : 프리뷰 이미지에 사용
      setImgFiles((prev) => [...prev, ...fileListToArray]);
      // React hook form : 'photos'필드 에 파일 데이터 저장
      setValue('photos', fileListToArray, { shouldValidate: true });
    }
  };

  // Image file 선택 취소 (제거)
  const removeSelectedImg = (fileName: string) => {
    const newImgFiles = imgFiles.filter((file) => file.name !== fileName);
    setImgFiles(newImgFiles);
    setValue('photos', newImgFiles, { shouldValidate: true });
  };

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

  return (
    <div className="flex-1">
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <PostCreateHeader
          step={currentStep}
          setStep={setCurrentStep}
          formTrigger={trigger}
        />
        <div className="h-[calc(100dvh-156px)] overflow-y-scroll scrollbar-hide">
          {/* STEP 1 : 사진 선택 */}
          {currentStep === 0 && (
            <div className="flex h-[calc(100dvh-156px)] flex-col items-center justify-center gap-5 p-4">
              {/* 업로드한 이미지 프리뷰 */}
              {imgFiles.map((file) => (
                <PostImagePreview
                  key={file.name}
                  file={file}
                  onRemove={removeSelectedImg}
                />
              ))}

              {/* 사진 업로드를 위한 File Input */}
              {imgFiles.length < 3 && (
                <>
                  <label htmlFor="photos">
                    <div className="flex size-[154px] flex-col items-center justify-center gap-2 border-2 border-accent bg-accent-foreground p-3 font-black text-accent">
                      <AddOutline fontSize={30} />
                      <p>사진 선택하기</p>
                    </div>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="photos"
                    multiple
                    className="hidden"
                    onChange={handleInputImgChange}
                  />
                </>
              )}
            </div>
          )}

          {/* STEP 2 : 위치 선택 */}
          {currentStep === 1 && (
            <div className="h-[calc(100dvh-156px)]">
              <LocationSelector
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
              />
            </div>
          )}

          {/* STEP 3 : 기타 게시물 정보 입력 */}
          {currentStep === 2 && (
            <div className="relative h-[calc(100dvh-156px)] p-4">
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
  );
};

export default PostCreatePage;
