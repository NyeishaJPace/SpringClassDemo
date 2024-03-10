//import { Outlet, Link } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';
import ApodService from './services/ApodService';

const NasaApodPage = () => {
    const [date, setDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [count, setCount] = useState('');
    const [apodDate, setApodDate] = useState([]);

    const handleFetchData = async () => {
        const apodService = new ApodService();
        const response = await apodService.getAstronomyPictureOfTheDay(apodDate, setStartDate, setEndDate)
        setApodData(response);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (startDate && endDate) {
                response = await axios.get('/api/apod/range', { 
                    params: { startDate, endDate, count },
            });
            } else {
                response = await axios.get('/api/apod', { params: { date } });
            }
            setApodDate(Array.isArray(response.data) ? response.data : [response.data]);
        } catch (error) {
            console.error('Error fetching APOD data:', error);
        }
    };


    return (
        <div>
            <h1> Astronomy Picture of the Day </h1>
            <form onSumbit={handleSubmit}>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="startDate">Start Date:</label>
                    <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="endDate">End Date:</label>
                    <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="count">Count:</label>
                    <input type="number" id="count" value={count} onChange={(e) => setCount(e.target.value)}/>
                </div>
                <button type="submit">Fetch Apod</button>
            </form>
            {apodData && (
                <div>
                    {Array.isArray(apodData) ? (
                        apodData.map((data, index) => (
                            <div key={index}>
                                <h2>{data.title}</h2>
                                <p>{data.explanation}</p>
                                {data.media_type === 'image' ? (
                                    <img src={data.hdurl || data.url} alt={data.title}/>
                                ) : (
                                    <video src={data.url} controls />
                                )}
                            </div>
                        )) 
                    ) : (
                        <div>
                            <h2>{apodData.title}</h2>
                            <p>{apodData.explanation}</p>
                            {apodData.media_type === 'image' ? (
                                <img src={apodData.hdurl || apodData.url} alt={apodData.title} />
                            ) : (
                                <video src={apodData.url} controls />
                            )}
                        </div>
                    )}
                </div>
            )}
        </div> 
    );
};

export default NasaApodPage;