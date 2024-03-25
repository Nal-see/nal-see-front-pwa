import { Image } from 'antd-mobile';
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
    onRemove(file.name);
  }, []);

  return (
    <div className="relative size-[154px] border-2 border-black">
      <Image src={imgPath} width={150} height={150} fit="cover" />
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
