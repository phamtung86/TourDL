package org.example.controller;

import org.example.dto.TourDTO;
import org.example.form.TourFilterForm;
import org.example.modal.Tour;
import org.example.service.ITourService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/tours")
public class TourController {

	@Autowired
	private ITourService tourService;
	@Autowired
	private ModelMapper modelMapper;

	// get all tour
	@GetMapping
	public List<Tour> listAllTours() {
		return tourService.getAllTours();
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

	// Phan trang tour
	@GetMapping("/page")
	public Page<TourDTO> getToursByPage(Pageable pageable) {
		Date date = new Date();

		Page<Tour> pageTours = tourService.getPageTours(pageable, date);

		// Ánh xạ từ List<Tour> sang List<TourDTO>
		List<TourDTO> toursDTO = pageTours.getContent().stream().map(tour -> modelMapper.map(tour, TourDTO.class))
				.collect(Collectors.toList());

		// Tạo Page<TourDTO> từ List<TourDTO>
		Page<TourDTO> dtoTours = new PageImpl<>(toursDTO, pageable, pageTours.getTotalElements());

		return dtoTours;
	}


	@GetMapping("/filter-tour")
	public Page<TourDTO> filterTours(Pageable pageable, @RequestParam(required = false) TourFilterForm tourFilterForm,
			@RequestParam(required = false) String departure, @RequestParam(required = false) String destination,
			@RequestParam(required = false) Integer tourType, @RequestParam(required = false) Integer transportId,
			@RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate) {
		Page<Tour> pageTours = tourService.filterTours(pageable, tourFilterForm, departure, destination, tourType, transportId, startDate);

		// Ánh xạ từ List<Tour> sang List<TourDTO>
		List<TourDTO> toursDTO = pageTours.getContent().stream().map(tour -> modelMapper.map(tour, TourDTO.class))
				.collect(Collectors.toList());

		// Tạo Page<TourDTO> từ List<TourDTO>
		Page<TourDTO> dtoTours = new PageImpl<>(toursDTO, pageable, pageTours.getTotalElements());
		
		
		return dtoTours;
	}

	@GetMapping("/total")
	public long getTotal() {
		return tourService.totalTour();
	}
	@GetMapping("/totalType")
	public List<Long> getTotalType(){
		return tourService.getTotalByType();
	}
	@GetMapping("/admin/page")
	public ResponseEntity<Page<TourDTO>> getTours(
			@RequestParam(name = "page",defaultValue = "0") int page,
			@RequestParam(name = "size",defaultValue = "5") int size
	) {
		Page<TourDTO> tours = tourService.getTours(page, size);
		return ResponseEntity.ok(tours);
	}
	@GetMapping("tour/{tourId}")
	public ResponseEntity<TourDTO> getTourById(@PathVariable("tourId") String tourId){
		Optional<TourDTO> tour =tourService.getTourById(tourId);
        return tour.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
	@PutMapping("tour/{tourId}")
	public ResponseEntity<Tour> updateTour(@PathVariable("tourId") String tourId, @RequestBody Tour updatedTour) {
		Tour tour = tourService.updateTour(tourId, updatedTour);
		if (tour != null) {
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}


}
