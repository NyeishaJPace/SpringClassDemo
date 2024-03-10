package com.example.demo.services;

import com.example.demo.dto.NasaApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ApodService {

    @Value("${nasa.api.key}")
    private String apiKey;

    public NasaApiResponse getAstronomyPictureOfTheDay(String date, String fromDate, String toDate, String count) {
        // Construct the URL based on the input parameters
        String apiUrl = "https://api.nasa.gov/planetary/apod";
        String url = apiUrl + "?api_key=" + apiKey;

        if (date != null) {
            url += "&date=" + date;
        } else if (fromDate != null && toDate != null) {
            url += "&from=" + fromDate + "&to=" + toDate;
        } else if (count != null) {
            url += "&count=" + count;
        }

        // Make a request to the NASA APOD endpoint
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, NasaApiResponse.class);
    }
}

