package org.example.reponsitory;

import org.example.dto.TourOrderDTO;
import org.example.modal.TourOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface TourOrderReponsitory extends JpaRepository<TourOrder, Integer> {

    // So tour duoc dat trong thang
    @Query("SELECT COUNT(to.id) FROM TourOrder to WHERE to.orderDate BETWEEN :startOfMonth AND :endOfMonth")
    public int countTourOrderByMonth(@Param("startOfMonth") Timestamp  startOfMonth, @Param("endOfMonth") Timestamp  endOfMonth);

    // Doanh thu theo ngày
    @Query("SELECT SUM(to.totalPrice) FROM TourOrder to WHERE to.orderDate BETWEEN :startOfDay AND :endOfDay")
    Double totalRevenueByDay(@Param("startOfDay") Timestamp startOfDay, @Param("endOfDay") Timestamp  endOfDay);

    // Doanh thu theo tháng
    @Query("SELECT SUM(to.totalPrice) FROM TourOrder to WHERE to.orderDate BETWEEN :startOfMonth AND :endOfMonth")
    Double totalRevenueByMonth(@Param("startOfMonth") Timestamp  startOfMonth, @Param("endOfMonth") Timestamp  endOfMonth);

    // Doanh thu theo năm
    @Query("SELECT SUM(to.totalPrice) FROM TourOrder to WHERE to.orderDate BETWEEN :startOfYear AND :endOfYear")
    Double totalRevenueByYear(@Param("startOfYear") Timestamp  startOfYear, @Param("endOfYear") Timestamp  endOfYear);

    // Top tour được đặt nhiều nhất
    @Query("SELECT new org.example.dto.TourOrderDTO(MAX(to.id), SUM(to.totalPrice), to.tour) FROM TourOrder to GROUP BY to.tour ORDER BY SUM(to.totalPrice) DESC")
    List<TourOrderDTO> getTopTourOrders(Pageable pageable);
}
