import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg, { TcroppedAreaPixels } from '../utils/cropImage';
import { dataURLtoFile } from '../utils/dataUrlToFile';
import { toast } from 'sonner';

interface IImageCropperProps {
  openCropper: boolean;
  setOpenCropper: (value: boolean) => void;
  selectedImgURL: string;
  selectedFileName: string;
  setCroppedImgFiles: Dispatch<SetStateAction<File[]>>;
}

const ImageCropper = ({
  openCropper,
  setOpenCropper,
  selectedImgURL,
  selectedFileName,
  setCroppedImgFiles,
}: IImageCropperProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<TcroppedAreaPixels | null>(null);

  const closeModal = () => {
    setOpenCropper(false);
  };

  const onCropComplete = useCallback(
    (_, croppedAreaPixels: TcroppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleCroppedImage = async () => {
    try {
      if (croppedAreaPixels) {
        const croppedImg = await getCroppedImg(
          selectedImgURL,
          croppedAreaPixels,
        );
        if (!croppedImg) throw new Error('croppedImageURL is not available');

        const croppedFile = dataURLtoFile(croppedImg, selectedFileName);
        console.log(croppedFile, typeof croppedFile);
        setCroppedImgFiles((prev) => [...prev, croppedFile]);
        closeModal();
        setZoom(1);
        setCrop({ x: 0, y: 0 });
      }
    } catch (error) {
      console.error(error);
      toast.error('이미지 조정에 실패했습니다.');
      closeModal();
    }
  };

  return (
    <Dialog open={openCropper}>
      <DialogContent
        className="h-[calc(100dvh/2*1.1)] w-[95%] rounded-md"
        showCloseBtn={false}
      >
        <DialogHeader>
          <DialogTitle className="text-center">이미지 조정</DialogTitle>
        </DialogHeader>
        <div className="relative h-[calc(100dvh/3)]">
          <Cropper
            image={selectedImgURL}
            crop={crop}
            zoom={zoom}
            aspect={3 / 4}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid
          />
        </div>
        <DialogFooter>
          <Button onClick={handleCroppedImage} variant="secondary">
            적용
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropper;
