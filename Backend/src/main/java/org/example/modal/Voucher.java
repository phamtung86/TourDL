package org.example.modal;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "voucher")
public class Voucher {

    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "voucher_name")
    private String voucherName;

    @Column(name = "value")
    private int value;

    @Column(name = "type")
    private int type; // 0: phan tram - 1: Gia tri tien

    @Column(name = "status")
    private int status; // 0: Het han  1:Active -1: Khoa

    @Column(name = "start_date")
    private Timestamp startDate;

    @Column(name = "expiry_date")
    private Timestamp expiryDate;
    public Voucher() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getVoucherName() {
        return voucherName;
    }

    public void setVoucherName(String voucherName) {
        this.voucherName = voucherName;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Timestamp getStartDate() {
        return startDate;
    }

    public void setStartDate(Timestamp startDate) {
        this.startDate = startDate;
    }

    public Timestamp getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Timestamp expiryDate) {
        this.expiryDate = expiryDate;
    }

    @Override
    public String toString() {
        return "Voucher{" +
                "id=" + id +
                ", voucherName='" + voucherName + '\'' +
                ", value=" + value +
                ", type=" + type +
                ", status=" + status +
                ", startDate=" + startDate +
                ", expiryDate=" + expiryDate +
                '}';
    }
}
