import React from 'react'
import "./slideshow.css"

function Slideshow() {
    return (
        <div className="col_box">

            <h1>Lastest News</h1>

            <div className="col_items" data-aos="slide-left" data-aos-duration="800">

                <div className="item">SCROLL SNAP</div>
                <div className="item">SCROLL SNAP</div>
                <div className="item">SCROLL SNAP</div>
                <div className="item">SCROLL SNAP</div>
                <div className="item">SCROLL SNAP</div>
                <div className="item">SCROLL SNAP</div>

            </div>

        </div>
    )
}

export default Slideshow