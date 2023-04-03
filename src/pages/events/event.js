import React from 'react'

const Event = (props) => {

    const { _id, event_img, event_title, createdAt } = props.event;

    return (
        <div>

                    <div className="col mt-3" data-aos="fade-in" data-aos-duration="900">
                        <div className="card shadow-lg">
                            <img src={event_img} alt='' width="100%" height="225" className="card-img-top event_img" />
                            <div className="card-body">
                                <h4 className="card-text">{event_title}</h4>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <a href={`/eventsinglepage/${_id}`}><button type="button" className="btn btn-sm btn-outline-secondary">View</button></a>
                                    </div>
                                    <small className="text-muted">{new Date(createdAt).toDateString()}</small>
                                </div>
                            </div>

                        </div>
                    </div>
                    </div>
    )
}

export default Event