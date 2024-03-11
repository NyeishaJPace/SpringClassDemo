import React, { useState, useEffect } from "react";
import { getTodaysPictureOfTheDay } from "../exploreMore/exploreMore";
import "./home.css";

const PictureOfTheDay = () => {
  const [pictureData, setPictureData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTodaysPictureOfTheDay();
        setPictureData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="picture-of-the-day-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching data: {error.message}</p>
      ) : pictureData ? (
        <div>
          <h2 className="potd-title">Picture of the Day</h2>
          <img
            src={pictureData.url}
            alt={pictureData.title}
            className="potd-image"
          />
          <p className="potd-title">{pictureData.title}</p>
          <p className="potd-explanation">{pictureData.explanation}</p>
        </div>
      ) : null}
    </div>
  );
};

export default PictureOfTheDay;
