import { LeftOutline } from 'antd-mobile-icons';

interface IBackBtnHeaderProps {
  title: string;
}

const BackBtnHeader = ({ title }: IBackBtnHeaderProps) => {
  return (
    <div className="flex flex-row items-center gap-2 py-3">
      <LeftOutline
        fontSize={30}
        className="ml-5"
        onClick={() => history.back()}
      />
      <p className="text-2xl font-bold">{title}</p>
    </div>
  );
};

export default BackBtnHeader;
