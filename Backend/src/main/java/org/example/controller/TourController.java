package org.example.controller;

import org.example.modal.Tour;
import org.example.service.ITourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/tours")
public class TourController {

    @Autowired
    private ITourService tourService;

    // get all tour
    @GetMapping
    public List<Tour> listAllTours() {
        return tourService.getAllTours();
    }

    // get tour by name
    @GetMapping("/search")
    public List<Tour> getTourByName(@RequestParam("tourName") String tourName) {
        return tourService.getTourByName(tourName);
    }

    // add tour
    @PostMapping
    public Tour addNewTour(@RequestBody Tour tour) {
        Tour newTour = tourService.createNewTour(tour);
        return new ResponseEntity<>(newTour, HttpStatus.CREATED).getBody();
    }

    // delete tour by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTour(@PathVariable("id") String id) {
        boolean isDeleted = tourService.deleteTourById(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build(); // 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }
    // update tour by id
    @PutMapping("/{id}")
    public ResponseEntity<Tour> updateTour(@PathVariable("id") String id, @RequestBody Tour tourUpdate) {
//        Tour updatedTour = tourService.updateTour(id, tourUpdate);
//        return ResponseEntity.ok(updatedTour);
        return null;
    }
    //Phan trang tour
    @GetMapping("/page")
    public Page<Tour> getToursByPage(Pageable pageable){
        return tourService.getPageTours(pageable);
    }

    @GetMapping("/filter-tour")
    public Page<Tour> filterTours(Pageable pageable,
                                  @RequestParam(required = false) BigDecimal minBudget,
                                  @RequestParam(required = false) BigDecimal maxBudget,
                                  @RequestParam(required = false) String departure,
                                  @RequestParam(required = false) String destination,
                                  @RequestParam(required = false) Integer tourType,
                                  @RequestParam(required = false) Integer transportId) {
        return tourService.filterTours(pageable, minBudget, maxBudget, departure, destination, tourType, transportId);
    }
    @GetMapping("/total")
    public long getTotal(){
        return tourService.totalTour();
    }

}

