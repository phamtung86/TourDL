package org.example.dto;

import jakarta.persistence.Column;
import org.example.modal.UserTourOrder.UserTourOrderKey;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class UserTourOrderDTO {

	private UserTourOrderKey id;
	private UserDTO user;
	private TourOrderDTO tourOrder;
	private String status;
	private Date tourStartDate;
}
