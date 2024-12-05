package org.example.reponsitory;

import org.example.modal.Tour;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Repository
public interface TourReponsitory extends JpaRepository<Tour, String>, JpaSpecificationExecutor<Tour> {

	// Bo loc tour
//	@Query("SELECT t FROM Tour t WHERE " + "(:minBudget IS NULL OR t.price >= :minBudget) AND "
//			+ "(:maxBudget IS NULL OR t.price <= :maxBudget) AND "
//			+ "(:departureLocation IS NULL OR t.departurePoint = :departureLocation) AND "
//			+ "(:destination IS NULL OR t.destination = :destination) AND "
//			+ "(:tourType IS NULL OR t.tourType.id = :tourType) AND "
//			+ "(:transportation IS NULL OR t.transport.id = :transportation)")
//	Page<Tour> filterTours(Pageable pageable, @Param("minBudget") BigDecimal minBudget,
//			@Param("maxBudget") BigDecimal maxBudget, @Param("departureLocation") String departureLocation,
//			@Param("destination") String destination, @Param("tourType") Integer tourType,
//			@Param("transportation") Integer transportation);

}
