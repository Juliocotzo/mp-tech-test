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
@CrossOrigin(origins = "*", allowedHeaders = "*")
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

    @GetMapping("/locations/{id}")
    public ResponseEntity<Location> getLocationById(@PathVariable("id") long id) {
        Optional<Location> location = locationRepository.findById(id);

        if (location.isPresent()) {
            return new ResponseEntity<>(location.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/locations")
    public ResponseEntity<Location> createLocation(@RequestBody Location location) {
        try {
            Location _location = locationRepository
                    .save(new Location(location.getLocationName(), location.getLocationDescription(), location.getLocationPhone(), location.getLocationAddress()));
            return new ResponseEntity<>(_location, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/locations/{id}")
    public ResponseEntity<Location> updateLocation(@PathVariable("id") long id, @RequestBody Location location) {
        Optional<Location> locationData = locationRepository.findById(id);

        if (locationData.isPresent()) {
            Location _location = locationData.get();
            _location.setLocationName(location.getLocationName());
            _location.setLocationDescription(location.getLocationDescription());
            _location.setLocationPhone(location.getLocationPhone());
            _location.setLocationAddress(location.getLocationAddress());
            return new ResponseEntity<>(locationRepository.save(_location), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/locations/{id}")
    public ResponseEntity<HttpStatus> deleteLocation(@PathVariable("id") long id) {
        try {
            locationRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
