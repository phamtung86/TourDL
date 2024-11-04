package org.example.reponsitory;


import org.example.modal.Transport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransportReponsitory extends JpaRepository<Transport, Integer> {

}
