package org.example.controller;

import org.example.modal.Tour;
import org.example.service.ITourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class TourController {

    @Autowired
    private ITourService tourService;

    // get all tour
    @GetMapping("/tours")
    public List<Tour> listAllTours() {
        return tourService.getAllTours();
    }

    // get tour by name
    @GetMapping("/tours/{tourName}")
    public List<Tour> getTourByName(@PathVariable("tourName") String tourName) {
        return tourService.getTourByName(tourName);
    }

    // add tour
    @PostMapping("/tours")
    public Tour addNewTour(@RequestBody Tour tour) {
        Tour newTour = tourService.createNewTour(tour);
        return new ResponseEntity<>(newTour, HttpStatus.CREATED).getBody();
    }

    // delete tour by id
    @DeleteMapping("/tours/{id}")
    public ResponseEntity<Void> deleteTour(@PathVariable("id") String id) {
        boolean isDeleted = tourService.deleteTourById(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build(); // 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }
    // update tour by id
    @PutMapping("/tours/{id}")
    public ResponseEntity<Tour> updateTour(@PathVariable("id") String id, @RequestBody Tour tourUpdate) {
//        Tour updatedTour = tourService.updateTour(id, tourUpdate);
//        return ResponseEntity.ok(updatedTour);
        return null;
    }
    //Phan trang tour
    @GetMapping("/tours/page")
    public List<Tour> getToursByPage(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int size
    ){
        return tourService.getToursByPage(page,size);
    }

}

