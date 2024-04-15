import { updateFeed } from '@/features/Feed/services/feedApi';
import InputWrapper from '@/features/Posts/components/InputWrapper';
import {
  constitutionOptions,
  genderOptions,
  styleOptions,
} from '@/features/Posts/utils/inputOptions';
import { IPostEditFormData } from '@/types/feed';
import { IPostEditForm } from '@/types/postCreate';
import { Button, Selector } from 'antd-mobile';
import { useState } from 'react';

export interface EditFeedProps extends IPostEditFormData {
  postId: number;
  onClose: () => void;
  onUpdateSuccess: () => void;
}

export const PostEditSheet: React.FC<EditFeedProps> = ({
  userDetailDto,
  content,
  postId,
  onClose,
  onUpdateSuccess,
}) => {
  const [FeedEditData, setFeedEditData] = useState<IPostEditForm>({
    content: content,
    height: userDetailDto.height,
    weight: userDetailDto.weight,
    constitution: userDetailDto.constitution,
    style: userDetailDto.style,
    gender: userDetailDto.gender,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFeedEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectorChange = (
    name: keyof IPostEditForm,
    value: string | number | null | string[],
  ) => {
    setFeedEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    const submitData = {
      content: FeedEditData.content,
      userDetailDto: {
        height: FeedEditData.height,
        weight: FeedEditData.weight,
        constitution: FeedEditData.constitution,
        style: FeedEditData.style,
        gender: FeedEditData.gender,
      },
    };

    try {
      await updateFeed(postId, submitData);
      onUpdateSuccess();
      onClose();
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
          value={FeedEditData.content}
          onChange={handleInputChange}
        />
        <InputWrapper title="키">
          <input
            type="number"
            className="text-lg focus:outline-none"
            name="height"
            value={FeedEditData.height ? FeedEditData.height : ''}
            onChange={handleInputChange}
          />
        </InputWrapper>
        <InputWrapper title="몸무게">
          <input
            type="number"
            className="text-lg focus:outline-none"
            name="weight"
            value={FeedEditData.weight ? FeedEditData.weight : ''}
            onChange={handleInputChange}
          />
        </InputWrapper>
        <InputWrapper title="체질">
          <Selector
            value={FeedEditData.constitution ? [FeedEditData.constitution] : []}
            onChange={(selectedVal) =>
              handleSelectorChange('constitution', selectedVal[0])
            }
            showCheckMark={false}
            options={constitutionOptions}
          />
        </InputWrapper>
        <InputWrapper title="스타일">
          <Selector
            value={FeedEditData.style}
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
            value={FeedEditData.gender ? [FeedEditData.gender] : []}
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
