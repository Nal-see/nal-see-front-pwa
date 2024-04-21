import InputWrapper from '@/features/Posts/components/InputWrapper';
import {
  constitutionOptions,
  genderOptions,
  styleOptions,
} from '@/features/Posts/utils/inputOptions';
import { IProfileEditForm } from '@/types/feed';
import { IPostEditForm } from '@/types/postCreate';
import { Button, Selector } from 'antd-mobile';
import { useState } from 'react';
import { updateProfile } from '../services/profileApi';
import { useMutation } from '@tanstack/react-query';

export interface EditFeedProps extends IProfileEditForm {
  onClose: () => void;
  onUpdateSuccess: () => void;
}

export const ProfileEditSheet: React.FC<EditFeedProps> = ({
  userInfo,
  onClose,
  onUpdateSuccess,
}) => {
  const [ProfileEditInfo, setProfileEditInfo] = useState({
    username: userInfo.username,
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
    setProfileEditInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectorChange = (
    name: keyof IPostEditForm,
    value: string | number | null | string[],
  ) => {
    setProfileEditInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { mutate: updateProfileMutation } = useMutation({
    mutationFn: () => updateProfile(ProfileEditInfo),
    onSuccess: () => {
      onUpdateSuccess();
      onClose();
    },
    onError: (error) => {
      console.error('Failed to update profile:', error);
    },
  });

  const onSubmit = async () => {
    updateProfileMutation();
  };

  return (
    <div className="h-[calc(100dvh-156px)] p-4">
      <div>
        <InputWrapper title="이름">
          <input
            type="text"
            className="text-lg focus:outline-none"
            name="username"
            value={ProfileEditInfo.username ? ProfileEditInfo.username : ''}
            onChange={handleInputChange}
            pattern="[ㄱ-ㅎㅏ-ㅣ가-힣]*"
          />
        </InputWrapper>
        <InputWrapper title="키">
          <input
            type="number"
            className="text-lg focus:outline-none"
            name="height"
            value={ProfileEditInfo.height ? ProfileEditInfo.height : ''}
            onChange={handleInputChange}
          />
        </InputWrapper>
        <InputWrapper title="몸무게">
          <input
            type="number"
            className="text-lg focus:outline-none"
            name="weight"
            value={ProfileEditInfo.weight ? ProfileEditInfo.weight : ''}
            onChange={handleInputChange}
          />
        </InputWrapper>
        <InputWrapper title="체질">
          <Selector
            value={
              ProfileEditInfo.constitution ? [ProfileEditInfo.constitution] : []
            }
            onChange={(selectedVal) =>
              handleSelectorChange('constitution', selectedVal[0])
            }
            showCheckMark={false}
            options={constitutionOptions}
          />
        </InputWrapper>
        <InputWrapper title="스타일">
          <Selector
            value={ProfileEditInfo.style}
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
            value={ProfileEditInfo.gender ? [ProfileEditInfo.gender] : []}
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
