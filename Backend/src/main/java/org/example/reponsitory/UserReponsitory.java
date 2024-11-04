package org.example.reponsitory;

import org.example.modal.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserReponsitory extends JpaRepository<Users, Integer> {

}
