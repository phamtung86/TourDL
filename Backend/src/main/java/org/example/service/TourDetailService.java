package org.example.service;

import org.example.modal.TourDetail;
import org.example.reponsitory.TourDetailReponsitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TourDetailService implements ITourDetailService {
    @Autowired
    private TourDetailReponsitory tourDetailRepository;

    @Override
    public List<TourDetail> getAllTourDetail() {
        return tourDetailRepository.findAll();
    }

    // Xem theo id_tour
    @Override
    public TourDetail findTourDetailByTourId(String tourId) {
        TourDetail tourDetail = tourDetailRepository.findTourDetailByTourId(tourId);

        if (tourDetail == null) {
            // Xử lý khi không tìm thấy tourDetail
            throw new RuntimeException("TourDetail not found for ID: " + tourId);
        }
        return tourDetail;
    }

    // Add tour_detail
    @Override
    public TourDetail createNewTourDetail(TourDetail tourDetail) {
        return tourDetailRepository.save(tourDetail);
    }

    // Delete TourDetail by ID
    @Override
    public boolean deleteTourDetail(int id) {
        if (tourDetailRepository.existsById(id)) {
            tourDetailRepository.deleteById(id);
            return true;
        }
        return false; // Có thể thêm thông điệp ở đây nếu cần
    }
    @Override
    public int sumTour(){
        return tourDetailRepository.findAll().size();
    }
}
