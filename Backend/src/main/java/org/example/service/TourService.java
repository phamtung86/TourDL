package org.example.service;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import org.example.form.TourFilterForm;
import org.example.modal.Calendar;
import org.example.modal.Tour;
import org.example.reponsitory.TourReponsitory;
import org.example.specification.TourSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class TourService implements ITourService {
	@Autowired
	private TourReponsitory tourReponsitory;

	@Override
	public List<Tour> getAllTours() {
		return tourReponsitory.findAll();
	}

	// add tour
	@Override
	public Tour createNewTour(Tour tour) {
		return tourReponsitory.save(tour);
	}

	// delete Tour By ID
	@Override
	public boolean deleteTourById(String id) {
		if (tourReponsitory.existsById(id)) {
			tourReponsitory.deleteById(id);
			return true;
		}
		return false;
	}

	// phan trang tour
	@Override
	public Page<Tour> getPageTours(Pageable pageable, Date date) {
		Specification<Tour> where = TourSpecification.buildWhere("home_default", date);
		Page<Tour> pageTours = tourReponsitory.findAll(where, pageable);

		for (Tour t : pageTours.getContent()) {
			List<Calendar> calendars = t.getCalendar();
			if (calendars != null) {
				calendars.removeIf(calendar -> calendar.getStartDate().before(date));
			}
			calendars.sort(Comparator.comparing(Calendar::getStartDate));
		}

		return pageTours;
	}

	// update tour by id
//    public Tour updateTour(String id, Tour tourDetails) {
//            Optional<Tour> optionalTour = tourReponsitory.findById(id);
//            if(optionalTour.isPresent()) {
//                Tour existingTour = optionalTour.get();
//                existingTour.setName(tourDetails.getName());
//                existingTour.setPrice(tourDetails.getPrice());
//                existingTour.setImageLink(tourDetails.getImageLink());
//                existingTour.setFileName(tourDetails.getFileName());
//                existingTour.setDestination(tourDetails.getDestination());
//                existingTour.setDeparturePoint(tourDetails.getDeparturePoint());
//                existingTour.setSlot(tourDetails.getSlot());
//                existingTour.setTransportId(tourDetails.getTransportId());
//                existingTour.setTourTypeId(tourDetails.getTourTypeId());
//                return tourReponsitory.save(existingTour);
//            }else {
//                System.out.println("Tour not found with id " + id);
//                return null;
//            }
//    }

	// search tour by name
	@Override
	public List<Tour> getTourByName(String Name) {
		List<Tour> listTourByName = new ArrayList<>();
		for (Tour tour : tourReponsitory.findAll()) {
			if (tour.getName().toLowerCase().contains(Name.toLowerCase())) {
				listTourByName.add(tour);
			}
		}
		return listTourByName;
	}

	@Override
	public Page<Tour> filterTours(Pageable pageable, TourFilterForm tourFilterForm, String departure,
			String destination, Integer tourType, Integer transportId, Date startDate) {
		Specification<Tour> where = TourSpecification.buildWhere("filter_tour", tourFilterForm, departure, destination,
				tourType, transportId, startDate);
		Date date = new Date();
		Page<Tour> pageTours = tourReponsitory.findAll(where, pageable);
		for (Tour t : pageTours.getContent()) {
			List<Calendar> calendars = t.getCalendar();
			if (calendars != null) {
				calendars.removeIf(calendar -> calendar.getStartDate().before(date));
			}
			calendars.sort(Comparator.comparing(Calendar::getStartDate));
		}
		
		return pageTours;
	}

	@Override
	public Long totalTour() {
		return tourReponsitory.count();
	}

	@Override
	public List<Long> getTotalByType() {
		return List.of();
	}

}
