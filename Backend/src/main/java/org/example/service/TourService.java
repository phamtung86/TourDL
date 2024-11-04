package org.example.service;

import org.example.modal.Tour;
import org.example.reponsitory.TourReponsitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TourService {
    @Autowired
    private TourReponsitory tourReponsitory;
    public List<Tour> getAllTours() {
        return tourReponsitory.findAll();
    }

    // add tour
    public Tour createNewTour(Tour tour) {
        return tourReponsitory.save(tour);
    }

    // delete Tour By ID
    public boolean deleteTourById(String id) {
        if (tourReponsitory.existsById(id)) {
            tourReponsitory.deleteById(id);
            return true;
        }
        return false;
    }

    // update tour by id
    public Tour updateTour(String id, Tour tourDetails) {
            Optional<Tour> optionalTour = tourReponsitory.findById(id);
            if(optionalTour.isPresent()) {
                Tour existingTour = optionalTour.get();
                existingTour.setName(tourDetails.getName());
                existingTour.setPrice(tourDetails.getPrice());
                existingTour.setImageLink(tourDetails.getImageLink());
                existingTour.setFileName(tourDetails.getFileName());
                existingTour.setDestination(tourDetails.getDestination());
                existingTour.setDeparturePoint(tourDetails.getDeparturePoint());
                existingTour.setSlot(tourDetails.getSlot());
                existingTour.setTransportId(tourDetails.getTransportId());
                existingTour.setTourTypeId(tourDetails.getTourTypeId());
                return tourReponsitory.save(existingTour);
            }else {
                System.out.println("Tour not found with id " + id);
                return null;
            }
    }

    // search tour by name
    public List<Tour> getTourByName(String Name) {
        List<Tour> listTourByName = new ArrayList<>();
        for (Tour tour : tourReponsitory.findAll()) {
            if (tour.getName().toLowerCase().contains(Name.toLowerCase())) {
                listTourByName.add(tour);
            }
        }
        return listTourByName;
    }


}
