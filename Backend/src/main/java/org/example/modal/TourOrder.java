package org.example.modal;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.text.DecimalFormat;

@Entity
@Table(name = "tour_order")
public class TourOrder {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "total_price")
    private double totalPrice;

    @Column(name = "note")
    private String note;

    @Column(name = "order_date")
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp orderDate;

    @Column(name = "total_member")
    private int totalMember;

    @OneToOne
    @JoinColumn(name = "tour_id", referencedColumnName = "id")
    private Tour tour;

    public TourOrder() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Timestamp getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Timestamp orderDate) {
        this.orderDate = orderDate;
    }

    public int getTotalMember() {
        return totalMember;
    }

    public void setTotalMember(int totalMember) {
        this.totalMember = totalMember;
    }

    public Tour getTour() {
        return tour;
    }

    public void setTour(Tour tour) {
        this.tour = tour;
    }

    @Override
    public String toString() {
        return "TourOrder{" +
                "id=" + id +
                ", totalPrice=" + getTotalPrice() +
                ", note='" + note + '\'' +
                ", orderDate=" + orderDate +
                ", totalMember=" + totalMember +
                ", tour=" + tour +
                '}';
    }
}
