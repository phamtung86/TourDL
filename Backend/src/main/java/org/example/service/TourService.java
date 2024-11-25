package org.example.service;

import org.example.modal.Tour;
import org.example.reponsitory.TourReponsitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public Page getPageTours(Pageable pageable){
        return tourReponsitory.findAll(pageable);
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
    public Page<Tour> filterTours(Pageable pageable, BigDecimal minBudget,BigDecimal maxBudget, String departure, String destination, Integer tourType, Integer transportId) {
        return tourReponsitory.filterTours(
                pageable,
                minBudget,
                maxBudget,
                departure,
                destination,
                tourType,
                transportId
        );
    }


}
