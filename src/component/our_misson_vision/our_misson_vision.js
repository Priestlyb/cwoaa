import React from 'react'
import "./our_misson_vision.css"

function Our_misson_vision() {

    return (
        <div className='container py-1'>
            <div className='row'>
                
                <div className="card col-12 my-5" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
                    <div className="card-header card_header">
                    <strong>Who We Are</strong>
                    </div>
                    <div className="card-body">
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                </div>

                <div className="card col-lg-6" data-aos="fade-right">
                    <div className="card-header card_header">
                        <strong>Our Mission</strong>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                </div>

                <div className="card col-lg-6" data-aos="fade-left">
                    <div className="card-header card_header">
                        <strong>Our Vision</strong>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Our_misson_vision