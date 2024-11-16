package org.example.controller;

import org.example.modal.TourDetail;
import org.example.service.TourDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/TourDetail")
public class TourDetailController {
    @Autowired
    private TourDetailService tourDetailService;

    @GetMapping("/TourDetails")
    public ResponseEntity<List<TourDetail>> listTourDetail() {
        List<TourDetail> tourDetails = tourDetailService.getAllTourDetail();
        return new ResponseEntity<>(tourDetails, HttpStatus.OK);
    }

    @GetMapping("/TourDetails/{tourId}")
    public ResponseEntity<TourDetail> tourDetailById(@PathVariable("tourId") String tourId) {
        TourDetail tourDetail = tourDetailService.findTourDetailByTourId(tourId);
        if (tourDetail == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(tourDetail, HttpStatus.OK);
    }

    @PostMapping("/TourDetail")
    public ResponseEntity<TourDetail> addNewTourDetail(@RequestBody TourDetail tourDetail) {
        TourDetail newTourDetail = tourDetailService.createNewTourDetail(tourDetail);
        return new ResponseEntity<>(newTourDetail, HttpStatus.CREATED);
    }
    @GetMapping("/TourDetals/total")
    public int getTotalTour(){
        return tourDetailService.sumTour();
    }
}
