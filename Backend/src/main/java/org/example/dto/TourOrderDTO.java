package org.example.dto;

import org.example.modal.Member;
import org.example.modal.Tour;
import org.example.modal.TourOrder;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class TourOrderDTO {
	private int id;
	private String totalPrice;
	private String note;
	private Timestamp orderDate;
	private int totalMember;
	private TourDTO tour;
	private long quantity;
	private int month;
	private List<MemberDTO> members;
	// Constructor để chuyển từ TourOrder sang TourOrderDTO
	public TourOrderDTO(TourOrder tourOrder) {
		this.id = tourOrder.getId();
		DecimalFormat df = new DecimalFormat("#");
		this.totalPrice = df.format(tourOrder.getTotalPrice());
		this.note = tourOrder.getNote();
		this.orderDate = tourOrder.getOrderDate();
		this.totalMember = tourOrder.getTotalMember();
//		this.tour = tourOrder.getTour();
	}

	public TourOrderDTO(int id, long quantity, double totalPrice, Tour tour) {
		this.id = id;
		this.quantity = quantity;
		DecimalFormat df = new DecimalFormat("#");
		this.totalPrice = df.format(totalPrice);
//		this.tour = tour;
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
}
