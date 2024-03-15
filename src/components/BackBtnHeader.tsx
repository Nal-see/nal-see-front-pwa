import { LeftOutline } from 'antd-mobile-icons';
import { useNavigate } from 'react-router-dom';

interface IBackBtnHeaderProps {
  title: string;
  className?: string;
}

const BackBtnHeader = ({ title, className }: IBackBtnHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={`sticky top-auto flex w-full flex-row items-center gap-2 py-3 ${className}`}
    >
      <LeftOutline
        fontSize={24}
        className="ml-5"
        onClick={() => navigate(-1)}
      />
      <p className="text-2xl font-bold">{title}</p>
    </div>
  );
};

export default BackBtnHeader;
