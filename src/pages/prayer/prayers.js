import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config";
import Prayer from "./prayer";
import CatholicLoadingPage from "./CatholicLoadingPage ";
import "./prayer.css";

function Prayers() {
  const [isLoading, setIsLoading] = useState(true);
  const [prayers, setPrayers] = useState([]);

  const URL = "/prayers";

  const fetchHandler = async () => {
    try {
      const res = await axiosInstance.get(URL);
      return res.data;
    } catch (err) {
      console.error("Failed to fetch prayers:", err);
      return { prayers: [] };
    }
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
    fetchHandler().then((data) => setPrayers(data.prayers));
  }, []);

  return (
    <div>
      <div className="album py-5">
        {isLoading ? (
          <div className="w-full h-full d-flex justify-content-center">
            <CatholicLoadingPage />
          </div>
        ) : (
          <div>
            {prayers.map((prayer) => (
              <div key={prayer._id}>
                <Prayer prayer={prayer} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Prayers;
