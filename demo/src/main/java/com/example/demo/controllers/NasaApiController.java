package com.example.demo.controllers;

import com.example.demo.services.ApodService;
import com.example.demo.dto.NasaApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/nasa")
public class NasaApiController {

    @Autowired
    private ApodService apodService;

    @GetMapping("/apod")
    public NasaApiResponse getAstronomyPictureOfTheDay(@RequestParam(required = false) String date,
                                                      @RequestParam(required = false) String fromDate,
                                                      @RequestParam(required = false) String toDate,
                                                      @RequestParam(required = false) String count) {
        return apodService.getAstronomyPictureOfTheDay(date, fromDate, toDate, count);
    }
}

