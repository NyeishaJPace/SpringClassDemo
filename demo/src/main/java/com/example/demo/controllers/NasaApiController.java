package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.demo.dto.NasaApiResponse;

@RestController
public class NasaApiController {

    @Value("${nasa.api.key}")
    private String apiKey;

    @GetMapping("/nasa/apod")
    public NasaApiResponse getAstronomyPictureOfTheDay(@RequestParam(required = false) String date,
                                                       @RequestParam(required = false) Boolean hd) {
        String apiUrl = "https://api.nasa.gov/planetary/apod";
        String apiKeyParam = "api_key=" + apiKey;
        String dateParam = (date != null) ? "&date=" + date : "";
        String hdParam = (hd != null) ? "&hd=" + hd : "";

        String url = String.format("%s?%s%s%s", apiUrl, apiKeyParam, dateParam, hdParam);

        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, NasaApiResponse.class);
    }
}
