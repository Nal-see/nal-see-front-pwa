import FeedList from './FeedList';
import Navbar from '../../components/NalSeeNavbar';

const FeedListPage = () => {
  return (
    <div className="flex flex-1 flex-col items-center">
      <Navbar />
      <FeedList />
    </div>
  );
};

export default FeedListPage;
