package org.example.dto;

import org.example.modal.Calendar;
import org.example.modal.Tour;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Optional;

@Data
@NoArgsConstructor
public class CalendarDTO {
//    private Tour tour;
//    private Timestamp startDate;
//    private int voucherID;
//    public CalendarDTO(Calendar calendar){
//        this.tour = calendar.getTour();
//        this.startDate = calendar.getStartDate();
//        if (calendar.getVoucherId() == null){
//            this.voucherID = 0;
//        }else {
//            this.voucherID = calendar.getVoucherId();
//        }
//    }
	private int calendarId;
	private Timestamp calendarStartDate;
	private int calendarSlot;

}
