import { useState } from 'react';
import PostCreateHeader from './components/PostCreateHeader';

const steps = [
  {
    id: 'Step 1',
    name: '사진 추가',
    fields: ['photo'],
  },
  {
    id: 'Step 2',
    name: '위치•지역',
    fields: ['address', 'latitude', 'longitude'],
  },
  {
    id: 'Step 3',
    name: '상세 내용',
    fields: [
      'content',
      'height',
      'weight',
      'bodyShape',
      'constitution',
      'style',
      'gender',
    ],
  },
];

const PostCreatePage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="flex-1">
      <PostCreateHeader step={currentStep} setStep={setCurrentStep} />
      <div className="h-[calc(100dvh-156px)] overflow-y-scroll scrollbar-hide">
        {/* Form */}
        <form encType="multipart/form-data">
          {currentStep === 0 && <div>사진</div>}

          {currentStep === 1 && <div>위치</div>}

          {currentStep === 2 && <div>그 외 정보들</div>}
        </form>
      </div>
    </div>
  );
};

export default PostCreatePage;
