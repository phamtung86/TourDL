package org.example.modal;

import jakarta.persistence.*;

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

    @OneToOne
    @JoinColumn(name = "transport_id", referencedColumnName = "id")
    private Transport transport;

    @OneToOne
    @JoinColumn(name = "tour_type_id", referencedColumnName = "id")
    private TourType tourType;
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

    public Transport getTransport() {
        return transport;
    }

    public void setTransport(Transport transport) {
        this.transport = transport;
    }

    public TourType getTourType() {
        return tourType;
    }

    public void setTourType(TourType tourType) {
        this.tourType = tourType;
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
                ", transport=" + transport +
                ", tourType=" + tourType +
                '}';
    }
}
