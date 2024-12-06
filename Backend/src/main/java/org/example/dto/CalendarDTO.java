package org.example.dto;

import org.example.modal.Calendar;
import org.example.modal.Tour;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
public class CalendarDTO {
	// private
//  private int calendarId;
//    private Timestamp calendarStartDate ;
//    private int calendarSlot
//
//
//
	private int calendarId;
	private Timestamp calendarStartDate;
	private int calendarSlot;
	private String tourId;
	private int voucherID;

	public CalendarDTO(Calendar calendar) {
		this.tourId = calendar.getTour().getId();
		this.calendarStartDate = calendar.getStartDate();
		if (calendar.getVoucherId() == null) {
			this.voucherID = 0;
		} else {
			this.voucherID = calendar.getVoucherId();
		}
	}

}