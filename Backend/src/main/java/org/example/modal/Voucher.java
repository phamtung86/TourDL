package org.example.modal;

import jakarta.persistence.*;

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

    @Override
    public String toString() {
        return "Voucher{" +
                "id=" + id +
                ", voucherName='" + voucherName + '\'' +
                ", value=" + value +
                ", type=" + type +
                '}';
    }
}
