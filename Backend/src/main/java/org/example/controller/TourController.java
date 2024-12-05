package org.example.controller;

import org.example.dto.TourDTO;
import org.example.form.TourFilterForm;
import org.example.modal.Tour;
import org.example.service.ITourService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
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

}
