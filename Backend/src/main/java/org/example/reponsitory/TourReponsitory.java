package org.example.reponsitory;

import org.example.modal.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TourReponsitory extends JpaRepository<Tour, String> {

}
