package com.example.mpbackend.model;

import jakarta.persistence.*;

import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Table(name = "Location")
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long locationId;

    @Column(name = "locationName", nullable = false)
    private String locationName;

    @Column(name = "locationDescription", nullable = true)
    private String locationDescription;

    @Column(name = "locationPhone", nullable = false)
    private String locationPhone;

    @Column(name = "locationAddress", nullable = false)
    private String locationAddress;

    public Location() {

    }

    public Location(String locationName, String locationDescription, String locationPhone, String locationAddress) {
        this.locationName = locationName;
        this.locationDescription = locationDescription;
        this.locationPhone = locationPhone;
        this.locationAddress = locationAddress;
    }

    public long getLocationId() {
        return locationId;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public String getLocationDescription() {
        return locationDescription;
    }

    public void setLocationDescription(String locationDescription) {
        this.locationDescription = locationDescription;
    }

    public String getLocationPhone() {
        return locationPhone;
    }

    public void setLocationPhone(String locationPhone) {
        this.locationPhone = locationPhone;
    }

    public String getLocationAddress() {
        return locationAddress;
    }

    public void setLocationAddress(String locationAddress) {
        this.locationAddress = locationAddress;
    }

}
