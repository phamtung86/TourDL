package org.example.controller;

import org.example.dto.TourOrderDTO;
import org.example.modal.TourOrder;
import org.example.service.TourOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class TourOrderController {
    @Autowired
    private TourOrderService tourOrderService;

    @GetMapping("/TourOrders")
    public List<TourOrderDTO> getTourOrders() {
        return tourOrderService.getAllTourOrder();
    }

    @GetMapping("/Revenue/{type}")
    public Double getRevenue(@PathVariable String type) {
        return tourOrderService.getRevenue(type);
    }
    @GetMapping("/TopTour")
    public List<TourOrderDTO> getTopTour() {
        return tourOrderService.listTopTours();
    }

    @GetMapping("/TourOrderByMonth")
    public int getTourOrderByMonth() {
        return tourOrderService.countTourOrderByMonth();
    }

    @PostMapping("/TourOrders/{tourID}")
    public void addTourOrder(@RequestBody TourOrder tourOrder, @PathVariable String tourID) {
        tourOrderService.createNewTourOrder(tourOrder,tourID);
    }
}
