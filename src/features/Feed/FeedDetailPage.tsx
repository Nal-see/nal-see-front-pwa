import BackBtnHeader from '@/components/BackBtnHeader';
import { useParams } from 'react-router-dom';
import { getFeedDetail } from './services/feedApi';
import FeedCard from './components/FeedCard/FeedCard';

const FeedDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const data = getFeedDetail(Number(id));
  const feed = data.results;

  return (
    <div className="h-[100dvh-183px] overflow-y-scroll">
      <BackBtnHeader title="상세페이지" />
      <FeedCard feed={feed} />
    </div>
  );
};

export default FeedDetailPage;
