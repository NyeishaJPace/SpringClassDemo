package com.example.demo.dto;

import lombok.Data;
import java.util.List;

@Data
public class NasaApiResponse {
    private String date;
    private String explanation;
    private String title;
    private String url;

    // Getters and Setters

    public String getDate() {
        return date;
    }

    public void setDate (String date) {
        this.date = date;
    }
}