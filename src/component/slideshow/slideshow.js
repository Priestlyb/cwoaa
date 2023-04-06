import React from 'react'
import "./slideshow.css"

function Slideshow() {
    return (
        <div className="col_box">

            <h1>Lastest News</h1>

            <div className="col_items">

                <div className="item" data-aos="slide-left" data-aos-duration="300" data-delay="1">SCROLL SNAP</div>
                <div className="item" data-aos="slide-left" data-aos-duration="400" data-delay="2">SCROLL SNAP</div>
                <div className="item" data-aos="slide-left" data-aos-duration="500" data-delay="3">SCROLL SNAP</div>
                <div className="item" data-aos="slide-left" data-aos-duration="600" data-delay="4">SCROLL SNAP</div>
                <div className="item" data-aos="slide-left" data-aos-duration="700" data-delay="5">SCROLL SNAP</div>
                <div className="item" data-aos="slide-left" data-aos-duration="800" data-delay="6">SCROLL SNAP</div>

            </div>

        </div>
    )
}

export default Slideshow