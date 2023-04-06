import React, { useEffect, useState } from "react";
import Anthem from './anthem/anthem'
import Feature from './feature/feature'
import OurMissonVision from './our_misson_vision/our_misson_vision'
import Slider from './slider/Slider'
import Slideshow from './slideshow/slideshow'

function Layout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  return (
    <div>

      {isLoading ? (
        <div className="app_loading">
          <div className="holder">
            <div className="candle">
              <div className="blinking-glow"></div>
              <div className="thread"></div>
              <div className="glow"></div>
              <div className="flame"></div>
            </div>
          </div>

        </div>
      ) : (
        <div>

          <Slider />
          <OurMissonVision />
          <Slideshow />
          <Anthem />
          <Feature />

        </div>

      )}

    </div>
  )
}

export default Layout