package com.example.demo.dto;

import lombok.Data;
import java.util.List;

@Data
public class NasaApiResponse {
    private String date;
    private String explanation;
    private String title;
    private String url;
}