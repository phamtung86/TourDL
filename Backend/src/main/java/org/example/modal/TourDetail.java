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
    private String file_name;
    @Column(name = "url")
    private String url;
    @Column(name = "sightseeing")
    private String sightseeing;
    @Column(name = "cuisine")
    private String cuisine;
    @Column(name = "suitable_people")
    private String suitable_people;
    @Column(name = "time_suiable")
    private String time_suitable;
    @Column(name = "transport")
    private String transport;
    @Column(name = "sale_description")
    private String sale_description;
    @Column(name = "tour_id")
    private String tour_id;

    public TourDetail() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFile_name() {
        return file_name;
    }

    public void setFile_name(String file_name) {
        this.file_name = file_name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getSightseeing() {
        return sightseeing;
    }

    public void setSightseeing(String sightseeing) {
        this.sightseeing = sightseeing;
    }

    public String getCuisine() {
        return cuisine;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public String getSuitable_people() {
        return suitable_people;
    }

    public void setSuitable_people(String suitable_people) {
        this.suitable_people = suitable_people;
    }

    public String getTime_suitable() {
        return time_suitable;
    }

    public void setTime_suitable(String time_suitable) {
        this.time_suitable = time_suitable;
    }

    public String getTransport() {
        return transport;
    }

    public void setTransport(String transport) {
        this.transport = transport;
    }

    public String getSale_description() {
        return sale_description;
    }

    public void setSale_description(String sale_description) {
        this.sale_description = sale_description;
    }

    public String getTour_id() {
        return tour_id;
    }

    public void setTour_id(String tour_id) {
        this.tour_id = tour_id;
    }

    @Override
    public String toString() {
        return "TourDetail{" +
                "id=" + id +
                ", file_name='" + file_name + '\'' +
                ", url='" + url + '\'' +
                ", sightseeing='" + sightseeing + '\'' +
                ", cuisine='" + cuisine + '\'' +
                ", suitable_people='" + suitable_people + '\'' +
                ", time_suitable='" + time_suitable + '\'' +
                ", transport='" + transport + '\'' +
                ", sale_description='" + sale_description + '\'' +
                ", tour_id=" + tour_id +
                '}';
    }
}