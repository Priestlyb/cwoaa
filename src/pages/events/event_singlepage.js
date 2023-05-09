import React, { useEffect, useState } from 'react'
import "./event_singlepage.css"
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../../config';

const EventSinglePage = () => {
    const id = useParams().id;
    const [{ event }, setEvent] = useState({})
    useEffect(() => {
        axiosInstance.get(`/events/${id}`).then(res => {
            setEvent(res.data)
        })
    })

    return (
        <>

        {event && 
        <div className='container mt-3 mb-3'>

            <div className="row featurette">

                <div className="col-md-7  mb-3">
                    <h2 className="featurette-heading fw-normal lh-1">{event.event_title}, <br /> <span className="text-muted"> {event.event_sub_title}.</span></h2> <br />
                    <p className="lead">{event.event_desc}</p>
                    <small className="text-muted">Created at: {new Date(event.createdAt).toDateString()}, Updated at: {new Date(event.updatedAt).toDateString()}</small>
                </div>

                <div className="col-md-5">

                    < img src={event.event_img} alt='' width="100%" className="eventsinglepage_img bd-img-img-lg featurette-image img-fluid mx-a/u" />

                </div>

                <div className='col-12'>
                    <div className="card_esp mt-5">

                        <p className='card_esp_overlay'><span className='card_esp_span'>< img src='https://res.cloudinary.com/priestlythedon/image/upload/v1678545160/cwoaa%20stock%20image/lvuqnea1iuldkp7shhxy.jpg' alt='' width="100%" height="100%" /></span></p>

                        <p className='card_esp_overlay'><span className='card_esp_span'>< img src='https://res.cloudinary.com/priestlythedon/image/upload/v1678545162/cwoaa%20stock%20image/glmilb8welucxqlyv64d.jpg' alt='' width="100%" height="100%" /></span></p>

                        <p className='card_esp_overlay'><span className='card_esp_span'>< img src='https://res.cloudinary.com/priestlythedon/image/upload/v1678545162/cwoaa%20stock%20image/x6dipglh5nackprtiezo.jpg' alt='' width="100%" height="100%" /></span></p>

                        <p className='card_esp_overlay'><span className='card_esp_span'>< img src='https://res.cloudinary.com/priestlythedon/image/upload/v1678545160/cwoaa%20stock%20image/dljjtjmsm4yawulk1mnp.jpg' alt='' width="100%" height="100%" /></span></p>

                        <p className='card_esp_overlay'><span className='card_esp_span'>< img src='https://res.cloudinary.com/priestlythedon/image/upload/v1678545161/cwoaa%20stock%20image/pzowlfnbfr2getkqxyky.jpg' alt='' width="100%" height="100%" /></span></p>

                        <p className='card_esp_overlay'><span className='card_esp_span'>< img src='https://res.cloudinary.com/priestlythedon/image/upload/v1678545162/cwoaa%20stock%20image/s01r89xpsvg7mki58yho.jpg' alt='' width="100%" height="100%" /></span></p>

                        <p className='card_esp_overlay'><span className='card_esp_span'>< img src='https://res.cloudinary.com/priestlythedon/image/upload/v1678545161/cwoaa%20stock%20image/p9puafpjmdmwtxbwk7ob.jpg' alt='' width="100%" height="100%" /></span></p>

                        <p className='card_esp_overlay'><span className='card_esp_span'>< img src='https://res.cloudinary.com/priestlythedon/image/upload/v1678545162/cwoaa%20stock%20image/cc1wux7zygottqhqkksw.jpg' alt='' width="100%" height="100%" /></span></p>

                    </div>
                </div>
            </div>

        </div>
        }

        </>
    )
}

export default EventSinglePage