import Banner from "../components/Banner";
import BestSeller from "../components/BestSeller";
import Category from "../components/Category";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <div className="max-w-[1600px] mx-auto px-2 lg:px-3">
        <Banner />
        <div className="space-y-4 mt-4">
          <BestSeller />
          <Category />
          <NewsLetter />
        </div>
      </div>
    </div>
  );
};
export default Home;
