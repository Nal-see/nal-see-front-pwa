import { CloseOutline } from 'antd-mobile-icons';
import { useCallback, useState } from 'react';

interface IPostImagePreviewProps {
  file: File;
  onRemove: (fileName: string) => void;
}

const PostImagePreview = ({ file, onRemove }: IPostImagePreviewProps) => {
  const [imgPath, setImgPath] = useState<string>(); // 업로드한 이미지를 URL로 변환

  // Preview 렌터링을 위해 FileReader를 통한 이미지 file Path 변환
  const reader = new FileReader();
  reader.onload = () => {
    setImgPath(reader.result as string);
  };
  reader.readAsDataURL(file);

  // 업로드한 이미지 선택 취소
  const removeImg = useCallback(() => {
    console.log('removeImg', file.name);
    onRemove(file.name);
  }, []);

  return (
    <div className="relative inline-flex h-[calc(100dvw/9*4)] w-[calc(100dvw/3)] border-2 border-black sm:h-[calc(400px/9*4)] sm:w-[calc(400px/3)]">
      <img src={imgPath} className="object-cover" />
      <button
        onClick={removeImg}
        className="absolute right-0 top-0 size-[20px] bg-black text-white opacity-80"
      >
        <CloseOutline fontSize={20} />
      </button>
    </div>
  );
};

export default PostImagePreview;
