package org.example.dto;

import org.example.modal.Calendar;

import java.sql.Timestamp;
import java.util.Optional;

public class CalendarDTO {
    private String tourID;
    private Timestamp startDate;
    private int voucherID;
    public CalendarDTO(Calendar calendar){
        this.tourID = calendar.getTourId();
        this.startDate = calendar.getStartDate();
        if (calendar.getVoucherId() == null){
            this.voucherID = 0;
        }else {
            this.voucherID = calendar.getVoucherId();
        }
    }

    public CalendarDTO() {
    }

    public String getTourID() {
        return tourID;
    }

    public void setTourID(String tourID) {
        this.tourID = tourID;
    }

    public Timestamp getStartDate() {
        return startDate;
    }

    public void setStartDate(Timestamp startDate) {
        this.startDate = startDate;
    }

    public int getVoucherID() {
        return voucherID;
    }

    public void setVoucherID(int voucherID) {
        this.voucherID = voucherID;
    }
}
