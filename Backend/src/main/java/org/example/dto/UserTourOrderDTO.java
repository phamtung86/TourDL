package org.example.dto;

import org.example.modal.UserTourOrder.UserTourOrderKey;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserTourOrderDTO {

	private UserTourOrderKey id;
	private UserDTO user;
	private TourOrderDTO tourOrder;
	private String status;
}
