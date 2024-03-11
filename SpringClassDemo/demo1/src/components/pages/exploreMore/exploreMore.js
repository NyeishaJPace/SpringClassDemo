import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker/dist/react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./exploreMore.css"; 

const BASE_URL = `http://localhost:8080/api/nasa`;
let maxDay = new Date(Date.now());

function NasaPage() {
  const [date, setDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [count, setCount] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPictureOfTheDay = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/apod?date=${date}`);
      setData([response.data]);
    } catch (error) {
      setError("Error fetching NASA data");
    } finally {
      setLoading(false);
    }
    resetDate();
  };

  const getImagesByDateRange = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/apods?start_date=${fromDate}&end_date=${toDate}`
      );
      setData(response.data);
    } catch (error) {
      setError("Error fetching NASA data");
    } finally {
      setLoading(false);
    }
    resetDate();
  };

  const resetDate = () => {
    setDate("");
    setFromDate("");
    setToDate("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); 
    if (date) {
      getPictureOfTheDay();
    } else if (fromDate && toDate) {
      getImagesByDateRange();
    }
  };

  return (
    <div className="nasa-page-container">
      <h2>NASA API Data</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="input-group">
          <DatePicker
            selected={date ? new Date(date) : null}
            onChange={(date) => setDate(date.toISOString().split("T")[0])}
            dateFormat="yyyy-MM-dd"
            placeholderText="Date"
            maxDate={maxDay}
            className="date-input"
          />
        </div>
        <div className="input-group">
          <DatePicker
            selected={fromDate ? new Date(fromDate) : null}
            onChange={(date) => setFromDate(date.toISOString().split("T")[0])}
            dateFormat="yyyy-MM-dd"
            placeholderText="From Date"
            maxDate={maxDay}
            className="date-input"
          />
          <DatePicker
            selected={toDate ? new Date(toDate) : null}
            onChange={(date) => setToDate(date.toISOString().split("T")[0])}
            dateFormat="yyyy-MM-dd"
            placeholderText="To Date"
            maxDate={maxDay}
            minDate={fromDate ? new Date(fromDate) : null}
            className="date-input"
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Count"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="count-input"
          />
          <button type="submit" className="fetch-button">
            Fetch Data
          </button>
        </div>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        data && (
          <div>
            <p>Count of images: {count ? count : data.length}</p>
            {data
              .slice(0, count && count <= data.length ? count : data.length)
              .map((item, index) => (
                <div key={index} className="image-card">
                  <p>Date: {item.date}</p>
                  <p>Explanation: {item.explanation}</p>
                  <img src={item.url} alt={item.title} className="image" />
                </div>
              ))}
          </div>
        )
      )}
    </div>
  );
}

export const getTodaysPictureOfTheDay = async () => {
  const response = await axios.get(`${BASE_URL}/apod`);
  const result = response.data;
  maxDay = result.date;
  return result;
};

export default NasaPage;
