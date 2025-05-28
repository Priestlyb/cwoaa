import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config";
import Anthem from "./anthem/anthem";
import Feature from "./feature/feature";
import OurMissonVision from "./our_misson_vision/our_misson_vision";
import Slider from "./slider/Slider";
import Slideshow from "./slideshow/slideshow";

function Layout() {
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState([]);

  // Fetch News from the server
  const fetchNewsHandler = async () => {
    try {
      const res = await axiosInstance.get("/news");
      setNews(res.data.news);
    } catch (error) {
      console.error("Failed to fetch News:", error);
    }
  };

  useEffect(() => {
    fetchNewsHandler().finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="app_loading">
          <div className="holder">
            <div className="candle">
              <div className="blinking-glow"></div>
              <div className="thread"></div>
              <div className="glow"></div>
              <div className="flame"></div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Slider />
          <OurMissonVision />

          {news.length === 0 ? (
            <div className="col-12">
              <p>No news found for your search</p>
            </div>
          ) : (
            <div className="col-12">
              <Slideshow newsList={news} />
            </div>
          )}

          <Anthem />
          <Feature />
        </div>
      )}
    </div>
  );
}

export default Layout;
