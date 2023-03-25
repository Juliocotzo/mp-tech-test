package com.example.mpbackend.controller;

import com.example.mpbackend.model.Location;
import com.example.mpbackend.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class LocationController {

    @Autowired
    LocationRepository locationRepository;

    @GetMapping("/locations")
    public ResponseEntity<List<Location>> getAllLocations() {
        try {
            List<Location> locations = new ArrayList<Location>();

            locationRepository.findAll().forEach(locations::add);

            if (locations.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(locations, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
