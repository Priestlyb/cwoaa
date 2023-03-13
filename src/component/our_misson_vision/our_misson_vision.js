import React from 'react'
import "./our_misson_vision.css"

function Our_misson_vision() {

    return (
        <div className='container py-2'>
            <div className='row'>

                <div className="card col-12 my-5 animate__animated animate__slideInUp">
                    <div className="card-header">
                    Who We Are
                    </div>
                    <div className="card-body">
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                </div>

                <div className="card col-lg-6 animate__animated animate__slideInLeft">
                    <div className="card-header">
                        Our Mission
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                </div>

                <div className="card col-lg-6 animate__animated animate__slideInRight">
                    <div className="card-header">
                        Our Vision
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