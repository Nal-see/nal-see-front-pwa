import React from 'react';
import { Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const EmptyPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/posts/create');
  };

  return (
    <div className="mt-5 flex items-center justify-center border-t-2">
      <div className="mt-6 flex flex-col items-center justify-center space-y-4">
        <Text type="secondary" className="text-center">
          현재 표시할 데이터가 없습니다. <br />
          새로운 데이터를 추가해보세요!
        </Text>
        <Button
          type="default"
          size="large"
          className="mt-4"
          onClick={handleClick}
        >
          새로운 데이터 추가하기
        </Button>
      </div>
    </div>
  );
};

export default EmptyPage;
