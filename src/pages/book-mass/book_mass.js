import React from 'react'
import "./book_mass.css"
import Lottie from "lottie-react";
import groovyWalkAnimation from "./form.json";


function Bookmass() {

    return (
        <div className='container mb-5 mt-5'>

            <div className='row bm_row'>
                <div className=' row col-lg-6'>

                    <h1 className='fw-bold'>Book Mass</h1>

                    <p>Please make your payment to the below account and upload your Receipt, thank you for compliance.</p>

                    <strong>Bank: <span>Wema Bank</span></strong>
                    <strong>Account: <span>0434908920</span></strong>

                    <div className='col-lg-6 mt-5' data-aos="fade-up" data-aos-duration="900" data-aos-delay="2">
                        <label>Family name</label>
                        <input type="text" name="text" className="input w-100"></input>
                    </div>

<div className='col-lg-6 mt-5' data-aos="fade-up" data-aos-duration="900" data-aos-delay="2">
    <label>Email</label>
    <input type="text" name="text" className="input w-100"></input>
</div>

<div className='col-lg-6 mt-2' data-aos="fade-up" data-aos-duration="900" data-aos-delay="2">
    <label>Date</label>
    <input type="datetime-local" name="check-out" min="2000-01-01T00:00" max="2500-06-14T00:00" className="input w-100"></input>
</div>

<div className='col-lg-6 mt-2' data-aos="fade-up" data-aos-duration="900" data-aos-delay="2">
    <label>Reciept Please</label>
    <input type="file" name="text" className="input w-100"></input>
</div>

<div className='col-12 mt-2' data-aos="fade-up" data-aos-duration="900" data-aos-delay="2">
    <label>Intentions</label>
    <textarea type="text" className="input w-100 h-50"></textarea>
</div>

                    <div className='bm_btn_cover' data-aos="fade-up" data-aos-duration="900">
                        <button className="bm_btn">
                            <span className="bm_btn-text-one">Book now</span>
                            <span className="bm_btn-text-two">Great!</span>
                        </button>
                    </div>

                </div>

                <div className='col-lg-6 bm_col_right' data-aos="zoom-in" data-aos-duration="900">
                    <Lottie animationData={groovyWalkAnimation} loop={true} />
                </div>

            </div>
        </div>
    )
}

export default Bookmass