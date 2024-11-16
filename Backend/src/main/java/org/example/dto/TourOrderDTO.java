package org.example.dto;
import org.example.modal.Tour;
import org.example.modal.TourOrder;

import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.util.Date;

public class TourOrderDTO {
    private int id;
    private String totalPrice;
    private String note;
    private Timestamp orderDate;
    private int totalMember;
    private Tour tour;
    private long quantity;
    private int month;
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

    public TourOrderDTO(int id,long quantity, double totalPrice, Tour tour) {
        this.id = id;
        this.quantity = quantity;
        DecimalFormat df = new DecimalFormat("#");
        this.totalPrice = df.format(totalPrice);
        this.tour = tour;
    }

    public TourOrderDTO(double totalPrice, Date orderDateDate) {
        DecimalFormat df = new DecimalFormat("#");
        this.totalPrice = df.format(totalPrice);
         this.orderDate = new Timestamp(orderDateDate.getTime());
    }

    public TourOrderDTO(double totalPrice, int month) {
        DecimalFormat df = new DecimalFormat("#");
        this.totalPrice = df.format(totalPrice);
        this.month = month;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public void setOrderDate(Timestamp orderDate) {
        this.orderDate = orderDate;
    }

    public void setTotalMember(int totalMember) {
        this.totalMember = totalMember;
    }

    public void setTour(Tour tour) {
        this.tour = tour;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public void setTotalPrice(String totalPrice) {
        this.totalPrice = totalPrice;
    }

    public long getQuantity() {
        return quantity;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
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
