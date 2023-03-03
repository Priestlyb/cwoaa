import React from 'react'

const Event = (props) => {

    const { event_img, event_desc, createdAt } = props.event;

    return (
        <div>

                    <div className="col mt-5 animate__animated animate__slideInRight">
                        <div className="card shadow-sm">
                            <img src={event_img} alt='' width="100%" height="225" className="card-img-top event_img" />
                            <div className="card-body">
                                <p className="card-text">{event_desc.slice(0,100)}. . .</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
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