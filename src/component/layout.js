import Anthem from './anthem/anthem'
import Feature from './feature/feature'
import OurMissonVision from './our_misson_vision/our_misson_vision'
import Slider from './slider/Slider'
import Slideshow from './slideshow/slideshow'

function Layout() {
  return (
    <div>
      <Slider />
      <OurMissonVision />
      <Slideshow />
      <Anthem />
      <Feature />
    </div>
  )
}

export default Layout