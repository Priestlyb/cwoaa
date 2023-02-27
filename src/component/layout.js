import AddButton from '../pages/events/event_btn'
import Carousel from './carousel/carousel'
import Feature from './feature/feature'
import Slider from './slider/Slider'
import Slideshow from './slideshow/slideshow'

function Layout() {
  return (
    <div>
      <Slider />
      <Feature />
      <Carousel />
      <Slideshow />
    </div>
  )
}

export default Layout