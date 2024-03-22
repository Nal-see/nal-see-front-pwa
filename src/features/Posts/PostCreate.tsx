import { ChangeEvent, useState } from 'react';
import PostCreateHeader from './components/PostCreateHeader';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IPostCreateForm, PostCreateFormSchema } from '@/types/postCreate';
import PostImagePreview from './components/PostImagePreview';
import { AddOutline } from 'antd-mobile-icons';
import { Toaster, toast } from 'sonner';

const PostCreatePage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [imgFiles, setImgFiles] = useState<globalThis.File[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IPostCreateForm>({ resolver: zodResolver(PostCreateFormSchema) });

  const onSubmit: SubmitHandler<IPostCreateForm> = (data) => {
    const formData = new FormData();
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

      setImgFiles((prev) => [...prev, ...fileListToArray]);
      // React hook form : 'photos'필드 에 파일 데이터 저장
      setValue('photos', fileListToArray);
    }
  };

  // Image file 선택 취소 (제거)
  const removeSelectedImg = (fileName: string) => {
    setImgFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  return (
    <div className="flex-1">
      <Toaster position="top-center" />
      <PostCreateHeader step={currentStep} setStep={setCurrentStep} />
      <div className="h-[calc(100dvh-156px)] overflow-y-scroll scrollbar-hide">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          {currentStep === 0 && (
            <div className="flex h-[calc(100dvh-156px)] flex-col items-center justify-center gap-5 p-4">
              {/* Preview Uploaded Images */}
              {imgFiles.map((file) => (
                <PostImagePreview
                  key={file.name}
                  file={file}
                  onRemove={removeSelectedImg}
                />
              ))}

              {/* Image File Input */}
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
                    {...register('photos')}
                    className="hidden"
                    onChange={handleInputImgChange}
                  />
                </>
              )}
            </div>
          )}

          {currentStep === 1 && <div>위치</div>}

          {currentStep === 2 && <div>그 외 정보들</div>}
        </form>
      </div>
    </div>
  );
};

export default PostCreatePage;
