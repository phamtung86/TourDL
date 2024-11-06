package org.example.modal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tour")
public class Tour {
    private static final long serialVersionUID = 1L;
    @Column(name = "id")
    @Id
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    double price;

    @Column(name = "image")
    private String imageLink;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "destination")
    private String destination;

    @Column(name = "departure_point")
    private String departurePoint;

    @Column(name = "slot")
    private int slot;

    @Column(name = "transport_id")
    private String transportId;

    @Column(name = "tour_type_id")
    private String tourTypeId;
    public Tour() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImageLink() {
        return imageLink;
    }

    public void setImageLink(String imageLink) {
        this.imageLink = imageLink;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getDeparturePoint() {
        return departurePoint;
    }

    public void setDeparturePoint(String departurePoint) {
        this.departurePoint = departurePoint;
    }

    public int getSlot() {
        return slot;
    }

    public void setSlot(int slot) {
        this.slot = slot;
    }

    public String getTransportId() {
        return transportId;
    }

    public void setTransportId(String transportId) {
        this.transportId = transportId;
    }

    public String getTourTypeId() {
        return tourTypeId;
    }

    public void setTourTypeId(String tourTypeId) {
        this.tourTypeId = tourTypeId;
    }

    @Override
    public String toString() {
        return "Tour{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", imageLink='" + imageLink + '\'' +
                ", fileName='" + fileName + '\'' +
                ", destination='" + destination + '\'' +
                ", departurePoint='" + departurePoint + '\'' +
                ", slot=" + slot +
                ", transportId='" + transportId + '\'' +
                ", tourTypeId='" + tourTypeId + '\'' +
                '}';
    }
}
