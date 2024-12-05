package org.example.service;

import org.example.modal.TourDetail;

import java.util.List;

public interface ITourDetailService {
	List<TourDetail> getAllTourDetail();

	TourDetail findTourDetailByTourId(String tourId);

	TourDetail createNewTourDetail(TourDetail tourDetail);

	boolean deleteTourDetail(int id);

	int sumTour();
}
