import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import Slider from '../components/Slider'
import Banner from '../components/Banner'
import Video from '../components/Video'

const Home = () => {
  return (
    <div>
      <Banner/>
      <LatestCollection/>
       <Slider/>
      <BestSeller/>
      <Video/>
      <OurPolicy/>
      <NewsLetterBox/>
    </div>
  )
}

export default Home