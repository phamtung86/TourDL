package org.example.modal;

import jakarta.persistence.*;

@Entity
@Table(name = "`tour_detail`")
public class TourDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "file_name")
    private String fileName;
    @Column(name = "url")
    private String url;
    @Column(name = "sight_seeing")
    private String sightSeeing;
    @Column(name = "cuisine")
    private String cuisine;
    @Column(name = "suitable_people")
    private String suitablePeople;
    @Column(name = "time_suiable")
    private String timeSuitable;
    @Column(name = "transport")
    private String transport;
    @Column(name = "sale_description")
    private String saleDescription;
    @OneToOne
    @JoinColumn(name = "tour_id", referencedColumnName = "id")
    private Tour tour;

    public TourDetail() {
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getSightSeeing() {
        return sightSeeing;
    }

    public void setSightSeeing(String sightSeeing) {
        this.sightSeeing = sightSeeing;
    }

    public String getCuisine() {
        return cuisine;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public String getSuitablePeople() {
        return suitablePeople;
    }

    public void setSuitablePeople(String suitablePeople) {
        this.suitablePeople = suitablePeople;
    }

    public String getTimeSuitable() {
        return timeSuitable;
    }

    public void setTimeSuitable(String timeSuitable) {
        this.timeSuitable = timeSuitable;
    }

    public String getTransport() {
        return transport;
    }

    public void setTransport(String transport) {
        this.transport = transport;
    }

    public String getSaleDescription() {
        return saleDescription;
    }

    public void setSaleDescription(String saleDescription) {
        this.saleDescription = saleDescription;
    }

    public Tour getTour() {
        return tour;
    }

    public void setTour(Tour tour) {
        this.tour = tour;
    }
}