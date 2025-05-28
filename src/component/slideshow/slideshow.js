import React from "react";
import "./slideshow.css";

function Slideshow({ newsList = [] }) {
  if (!Array.isArray(newsList) || newsList.length === 0) return null;

  const truncateText = (text, length = 100) => {
    if (!text || typeof text !== "string") return "";
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  return (
    <section className="news-section">
      <h2 className="section-title">Latest News</h2>
      <div className="news-slider">
        <div className="news-track">
          {newsList.map((news, index) => {
            const { _id, news_img = [], news_title = "", news_details = [] } = news;
            const image = news_img[0]?.url || "/no-image.jpg";

            return (
              <div className="news-card" key={index}>
                <img src={image} alt="News" className="news-image" />
                <div className="news-content">
                  <h3 className="news-title">{news_title}</h3>
                  <p className="news-snippet">
                    {truncateText(news_details?.[0]?.details)}
                  </p>
                  <a className="readmo" href={`/news/${_id}`}>Read more...</a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Slideshow;
