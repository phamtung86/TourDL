package org.example.service;

import org.example.modal.Tour;

import java.util.List;

public interface ITourService {

    //get all tour
    List<Tour> getAllTours();

    // create tour
    Tour createNewTour(Tour tour);

    // delete Tour By ID
    boolean deleteTourById(String id);


    public List<Tour> getToursByPage(int page, int size);

    // update tour by id
    //Tour updateTour(String id, Tour tourDetails);

    // search tour by name
    List<Tour> getTourByName(String Name);
}
