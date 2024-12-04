package org.example.dto;

import java.util.List;

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

	private String tourFileName;

	private String tourDestination;

	private String tourDeparturePoint;

	private Transport transport;

	private TourTypeDTO tourType;

	private List<CalendarDTO> calendar;
}
