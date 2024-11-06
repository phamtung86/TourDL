package org.example.dto;
import org.example.modal.Tour;
import org.example.modal.TourOrder;

import java.sql.Timestamp;
import java.text.DecimalFormat;

public class TourOrderDTO {
    private int id;
    private String totalPrice;
    private String note;
    private Timestamp orderDate;
    private int totalMember;
    private Tour tour;

    // Constructor để chuyển từ TourOrder sang TourOrderDTO
    public TourOrderDTO(TourOrder tourOrder) {
        this.id = tourOrder.getId();
        DecimalFormat df = new DecimalFormat("#");
        this.totalPrice = df.format(tourOrder.getTotalPrice());
        this.note = tourOrder.getNote();
        this.orderDate = tourOrder.getOrderDate();
        this.totalMember = tourOrder.getTotalMember();
        this.tour = tourOrder.getTour();
    }

    public TourOrderDTO(int id, double totalPrice, Tour tour) {
        this.id = id;
        DecimalFormat df = new DecimalFormat("#");
        this.totalPrice = df.format(totalPrice);
        this.tour = tour;
    }

    public int getId() {
        return id;
    }

    public String getTotalPrice() {
        return totalPrice;
    }

    public String getNote() {
        return note;
    }

    public Timestamp getOrderDate() {
        return orderDate;
    }

    public int getTotalMember() {
        return totalMember;
    }

    public Tour getTour() {
        return tour;
    }
}
