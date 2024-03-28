import { updateFeed } from '@/features/Feed/services/feedApi';
import InputWrapper from '@/features/Posts/components/InputWrapper';
import {
  constitutionOptions,
  genderOptions,
  styleOptions,
} from '@/features/Posts/utils/inputOptions';
import useAuthStore from '@/store/useAuthStore';
import { EditFeedProps } from '@/types/feed';
import { IPostEditForm } from '@/types/postCreate';
import { Button, Selector } from 'antd-mobile';
import { useState } from 'react';

export const PostEditSheet: React.FC<EditFeedProps> = ({
  userInfo,
  content,
  postId,
}) => {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState<IPostEditForm>({
    content: content,
    height: userInfo.height,
    weight: userInfo.weight,
    constitution: userInfo.constitution,
    style: userInfo.style,
    gender: userInfo.gender,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectorChange = (name: keyof IPostEditForm, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    console.log('data:', formData);
    try {
      await updateFeed(postId, formData);
      // onClose(); // 제출 후 바텀 시트 닫기
    } catch (error) {
      console.error('Failed to update feed:', error);
    }
  };

  return (
    <div className="h-[calc(100dvh-156px)] p-4">
      <div>
        <textarea
          className="w-full text-lg focus:outline-none"
          placeholder="내용을 입력하세요..."
          name="content"
          value={formData.content}
          onChange={handleInputChange}
        />
        <InputWrapper title="키">
          <input
            type="number"
            className="text-lg focus:outline-none"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
          />
        </InputWrapper>
        <InputWrapper title="몸무게">
          <input
            type="number"
            className="text-lg focus:outline-none"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
          />
        </InputWrapper>
        <InputWrapper title="체질">
          <Selector
            value={[formData.constitution]}
            onChange={(selectedVal) =>
              handleSelectorChange('constitution', selectedVal[0])
            }
            showCheckMark={false}
            options={constitutionOptions}
          />
        </InputWrapper>
        <InputWrapper title="스타일">
          <Selector
            value={formData.style}
            onChange={(selectedVal) =>
              handleSelectorChange('style', selectedVal)
            }
            multiple
            showCheckMark={false}
            options={styleOptions}
          />
        </InputWrapper>
        <InputWrapper title="성별">
          <Selector
            value={[formData.gender]}
            onChange={(selectedVal) =>
              handleSelectorChange('gender', selectedVal[0])
            }
            showCheckMark={false}
            options={genderOptions}
          />
        </InputWrapper>
        <div className="mt-4 flex justify-end">
          <Button onClick={onSubmit}>저장</Button>
        </div>
      </div>
    </div>
  );
};
