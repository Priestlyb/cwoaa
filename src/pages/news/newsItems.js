import React from "react";

const NewsItems = (props) => {
  const { _id, news_img, news_title, news_details } = props.news;
  return (
    <div className="row">
      <div className="col-lg-5 mt-5">
        <h2>
          {news_title?.slice(0, 50) || "No title available"}
        </h2>
        <p>
          {news_details?.[0]?.details?.slice(0, 200) || "No details available"} <br />
          ...... <a href={`/news/${_id}`}>Read more</a>
        </p>
      </div>
      <div className="col-lg-7">
        <img
          src={news_img?.[0]?.url || "/no-image.jpg"}
          alt=""
          width="100%"
        />
      </div>
    </div>
  );
};

export default NewsItems;
