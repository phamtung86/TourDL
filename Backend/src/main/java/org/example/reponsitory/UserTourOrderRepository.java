package org.example.reponsitory;

import org.example.modal.UserTourOrder;
import org.example.modal.UserTourOrder.UserTourOrderKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTourOrderRepository extends JpaRepository<UserTourOrder, UserTourOrderKey> {

}
