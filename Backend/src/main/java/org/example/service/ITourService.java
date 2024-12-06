package org.example.service;

import org.example.dto.TourDTO;
import org.example.form.TourFilterForm;
import org.example.modal.Tour;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ITourService {

	// get all tour
	List<Tour> getAllTours();

	// create tour
	Tour createNewTour(Tour tour);

	// delete Tour By ID
	boolean deleteTourById(String id);

	// phan trang tour
	Page<Tour> getPageTours(Pageable pageable, Date date);

	// update tour by id
	// Tour updateTour(String id, Tour tourDetails);

	// search tour by name
	List<Tour> getTourByName(String Name);

	// bo loc tim kiem
	Page<Tour> filterTours(Pageable pageable, TourFilterForm tourFilterForm, String departure, String destination,
						   Integer tourType, Integer transportId, Date startDate);

	Long totalTour();

	List<Long> getTotalByType();

	Page<TourDTO> getTours(int page, int size);

	Optional<TourDTO> getTourById(String tourId);
	Tour updateTour(String tourId, Tour updatedTour);
}

