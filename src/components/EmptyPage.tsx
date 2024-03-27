import React from 'react';
import { Card, Typography, Button } from 'antd';

const { Text } = Typography;

const EmptyPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card style={{ width: 400 }}>
        <div className="flex flex-col items-center justify-center space-y-4">
          <Text type="secondary" className="text-center">
            현재 표시할 데이터가 없습니다. <br />
            새로운 데이터를 추가해보세요!
          </Text>
          <Button type="default" size="large" className="mt-4">
            새로운 데이터 추가하기
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EmptyPage;
