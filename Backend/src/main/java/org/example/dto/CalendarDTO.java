package org.example.dto;

import org.example.modal.Calendar;
import org.example.modal.Tour;

import java.sql.Timestamp;
import java.util.Optional;

public class CalendarDTO {
    private Tour tour;
    private Timestamp startDate;
    private int voucherID;
    public CalendarDTO(Calendar calendar){
        this.tour = calendar.getTour();
        this.startDate = calendar.getStartDate();
        if (calendar.getVoucherId() == null){
            this.voucherID = 0;
        }else {
            this.voucherID = calendar.getVoucherId();
        }
    }

    public CalendarDTO() {
    }

    public Tour getTour() {
        return tour;
    }

    public void setTour(Tour tour) {
        this.tour = tour;
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
