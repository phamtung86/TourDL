package org.example.dto;

import java.util.List;

import org.example.modal.Tour;
import org.example.modal.TourType;
import org.example.modal.Transport;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TourDTO {
	private String tourId;

	private String name;

	private double tourPrice;

	private String tourImageLink;

	private String tourDestination;

	private String tourDeparturePoint;

	private String nameTransport;

	private String nameType;


	public TourDTO(Tour tour){
		this.tourId = tour.getId();
		this.name=tour.getName();
		this.tourPrice = tour.getPrice();
		this.tourImageLink = tour.getImageLink();
		this.tourDestination=tour.getDestination();
		this.tourDeparturePoint = tour.getDeparturePoint();
		this.nameTransport = tour.getTransport().getName();
		this.nameType=tour.getTourType().getName();
	}
}
