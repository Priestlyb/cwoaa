import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config";
import CommentsList from "../../component/comments/commentList";

const NewsPage = () => {
  const id = useParams().id;
  const [news, setNews] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/news/${id}`).then((res) => {
      setNews(res.data.news); // Ensure you're accessing the correct response data
    });
  }, [id]);

  return (
    <div>
      {news && (
        <div className="container mt-3 mb-3">
          <div className="row featurette">
            <div className="col-md-7  mb-3">
              <h2 className="featurette-heading fw-normal lh-1">
                {news.news_title}
              </h2>
              <br />
              {news.news_details.map((item, index) => (
                <div key={index} className="mb-4">
                  {item.sub_title && (
                    <h5 className="fw-bold">{item.sub_title}</h5>
                  )}
                  <p className="lead">{item.details}</p>
                </div>
              ))}
              <hr />
              <h3>Writers</h3>
              <div className="d-flex gap-3">
              {news?.news_writer?.map((writer, index) => (
                <div
                  key={index}
                  className="writer-info"
                  style={{ marginBottom: "1rem" }}
                >
                  {writer.img?.url && (
                    <img
                      src={writer.img.url}
                      alt={writer.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        marginRight: "10px",
                      }}
                    />
                  )}
                  
                  <div>
                    <small className="text-muted">
                      <strong>{writer.name}</strong>
                    </small>
                    <br />
                    <small className="text-muted">{writer.position}</small>
                  </div>
                </div>
              ))}
              </div>

              <hr />
              <small className="text-muted">
                Created at: {new Date(news.createdAt).toDateString()}, Updated
                at: {new Date(news.updatedAt).toDateString()}
              </small>

              <hr />
              <CommentsList newsId={id} />
              <hr />

              <h2 className="featurette-heading fw-normal lh-1">Gallery</h2>
              <br />
              <div className="d-flex gap-3">
                {news.news_img.map((img, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-2xl shadow-lg transform hover:scale-105 transition duration-500 ease-in-out"
                  >
                    <img
                      src={img.url || "/no-image.jpg"}
                      alt={img.description || "News content"}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-5">
              {news.news_img && news.news_img[1] ? (
                <img
                  src={news.news_img[1].url || "/no-image.jpg"}
                  alt={news.news_img[1]?.description || "Gallery content"}
                  width="100%"
                  className="eventsinglepage_img bd-img-img-lg featurette-image img-fluid mx-a/u"
                />
              ) : (
                <img
                  src="/no-image.jpg"
                  alt="Fallback content"
                  width="100%"
                  className="eventsinglepage_img bd-img-img-lg featurette-image img-fluid mx-a/u"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
