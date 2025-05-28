import React, { useState, useEffect } from "react";
import "./news.css";
import NewItems from "../news/newsItems";
import Lottie from "lottie-react";
import Search from "./search.json";
import { axiosInstance } from "../../config";

function News() {
  //Axios Request
  const URL = "/news";
  const fetchHandler = async () => {
    return await axiosInstance.get(URL).then((res) => res.data);
  };

  const [news, setNews] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setNews(data.news));
  }, []);

  return (
    <div className="container">
      <h1>Lastest News</h1>
      <div className="row mt-3">
        <div className="col-lg-3 mt-4">
          <div
            className="card text-white"
            Style="width: 100%; background-color: #07176C;"
          >
            <img
              src={news?.[0]?.news_img?.[0]?.url || "/fallback.jpg"}
              className="card-img-top"
              alt="..."
            />

            <div className="card-body">
              <h5 className="card-title">
                {news?.[0]?.news_title?.slice(0, 50) || "No title available"}.........
              </h5>
              <p className="card-text">
                {news?.[0]?.news_details?.[0]?.details?.slice(0, 200) ||
                  "No details available"}.........
              </p>
            </div>
            <div className="card-body">
              <p className="update_date card-text">
                <small className="text-light">
                  Last updated{" "}
                  {new Date(news?.[2]?.updatedAt).toLocaleString() ||
                    "some time ago"}
                </small>
              </p>
            </div>
          </div>
        </div>

        <div className="container col-lg-5 mt-4">
          <div className="card" Style="width: 100%;">
            <div className="card-body">
              <img
                src={news?.[1]?.news_img?.[0]?.url || "/fallback.jpg"}
                alt="..."
                className="w-100"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">
                {news?.[1]?.news_title?.slice(0, 50) || "No title available"}.........
              </h5>
              <p className="card-text">
                {news?.[1]?.news_details?.[0]?.details?.slice(0, 200) ||
                  "No details available"}.........
              </p>
            </div>
            <div className="card-body">
              <p className="card-text">
                <small className="text-muted">
                  Last updated{" "}
                  {new Date(news?.[2]?.updatedAt).toLocaleString() ||
                    "some time ago"}
                </small>
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 mt-4">
          <div
            className="card text-white"
            style={{ width: "100%", backgroundColor: "#07176C" }}
          >
            <img
              src={news?.[2]?.news_img?.[0]?.url || "/fallback.jpg"}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">
                {news?.[2]?.news_title?.slice(0, 60) || "No title available"}.........
              </h5>
              <p className="card-text">
                {news?.[2]?.news_details?.[0]?.details?.slice(0, 120) ||
                  "No details available"}.........
              </p>
            </div>
            <div className="card-body">
              <p className="card-text">
                <small className="text-light">
                  Last updated{" "}
                  {new Date(news?.[2]?.updatedAt).toLocaleString() ||
                    "some time ago"}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="news_row row g-5">
        <div className="col-md-8">
          <h3 className="pb-4 mb-4 fst-italic border-bottom">More news</h3>

          <div className="row">
            <div className="col-2">
              <h6>Full Story</h6>
            </div>
            <div className="col-8">
              <hr />
            </div>
            <div className="col-2">See All</div>
          </div>

          {/* Display New Here.... */}
          <div className="">
            {news &&
              news.map((news, id) => (
                <div key={id}>
                  <NewItems news={news} />
                </div>
              ))}
          </div>
        </div>

        <div class="col-md-4">
          <div class="position-sticky news_search">
            <form class="form d-flex mt-4 mb-4">
              <Lottie animationData={Search} loop={true} className="mr-2" />
              <input
                required=""
                autocomplete="off"
                placeholder="Search"
                id="search"
                type="text"
                className="event_search"
              />
            </form>

            <div class="p-4 mb-3 bg-light rounded">
              <h4 class="fst-italic">About</h4>
              <p class="mb-0">
                Customize this section to tell your visitors a little bit about
                your publication, writers, content, or something else entirely.
                Totally up to you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
